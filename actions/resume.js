"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithGroq } from "@/lib/groq-client";
import { revalidatePath } from "next/cache";

// Function to update user's industry
export async function updateUserIndustry(industry) {
  try {
    // Get current user ID
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized - Please sign in");
    }

    // Find user in our database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found in the database");
    }

    // Verify industry exists in IndustryInsight
    const industryExists = await db.industryInsight.findUnique({
      where: { industry },
    });

    if (!industryExists) {
      console.log(`Industry ${industry} not found in IndustryInsight table`);
      // Instead of throwing an error, we'll create a default entry
      try {
        await db.industryInsight.create({
          data: {
            industry,
            salaryRanges: [],
            growthRate: 0,
            demandLevel: "Medium",
            topSkills: [],
            marketOutlook: "Neutral",
            keyTrends: [],
            recommendedSkills: [],
            nextUpdate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          }
        });
        console.log(`Created default IndustryInsight for ${industry}`);
      } catch (createError) {
        console.error("Error creating industry insight:", createError);
        // Continue anyway - we'll just update the user
      }
    }
    
    // Update user's industry
    await db.user.update({
      where: { id: user.id },
      data: { industry },
    });
    
    // Revalidate the resume page to reflect changes
    revalidatePath("/resume");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating user industry:", error);
    throw new Error(`Failed to update industry: ${error.message}`);
  }
}

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type, context = null }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Fetch user with a direct query to ensure we have fresh data
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }
    
    // Get the user's industry or use a default
    const userIndustry = user.industry || "professional";
    
    // Get primary industry from combined format (e.g., "tech-software-development" -> "technology")
    const getPrimaryIndustry = (industryString) => {
      if (!industryString) return "professional";
      
      const mapping = {
        "tech": "technology",
        "fin": "finance",
        "health": "healthcare",
        "edu": "education",
        "legal": "legal",
        "eng": "engineering",
        "market": "marketing",
        "retail": "retail",
        "hosp": "hospitality",
        "manu": "manufacturing",
        "gov": "government",
        "bio": "biotechnology",
        "media": "media",
        "consult": "consulting",
        "nonprofit": "nonprofit",
        "construct": "construction",
        "transport": "transportation",
        "tele": "telecommunications",
        "energy": "energy"
      };
      
      const parts = industryString.split('-');
      const prefix = parts[0].toLowerCase();
      
      // Return mapped primary industry or first part if no mapping exists
      return mapping[prefix] || prefix;
    };
    
    const primaryIndustry = getPrimaryIndustry(userIndustry);
    console.log(`Using primary industry: ${primaryIndustry} (from ${userIndustry})`);
    
    // Parse context if provided
    let contextData = {};
    try {
      if (context) {
        contextData = JSON.parse(context);
      }
    } catch (e) {
      console.error('Error parsing context', e);
    }

    // Use explicit industry from context if provided, otherwise fallback to user's industry
    const specifiedIndustry = contextData.industry || primaryIndustry;
    
    // Detect the original professional domain more precisely
    const detectOriginalDomain = (text) => {
      // Common professional domains with their indicator terms
      const domainIndicators = {
        "legal": ["lawyer", "attorney", "legal", "law firm", "litigation", "court proceedings"],
        "technology": ["developer", "engineer", "software", "programming", "code", "technical"],
        "finance": ["financial", "finance", "banking", "investment", "accounting", "budget"],
        "marketing": ["marketing", "brand", "advertising", "campaign", "social media", "content"],
        "healthcare": ["doctor", "physician", "medical", "healthcare", "patient", "clinical"],
        "education": ["teacher", "professor", "education", "academic", "student", "teaching"],
        "sales": ["sales", "customer", "revenue", "business development", "account manager"],
        "construction": ["construction", "building", "architect", "project manager", "site"],
        "hospitality": ["hospitality", "hotel", "restaurant", "guest", "tourism"],
        "manufacturing": ["manufacturing", "production", "factory", "assembly", "operations"],
        "design": ["designer", "creative", "UX", "UI", "graphic", "artist"],
        "research": ["researcher", "scientist", "laboratory", "study", "experiment"],
        "human resources": ["HR", "human resources", "recruiting", "talent", "personnel"],
        "consulting": ["consultant", "consulting", "advisor", "strategy"]
      };
      
      // Check if any domain terms are present in the text
      const textLower = text.toLowerCase();
      for (const [domain, terms] of Object.entries(domainIndicators)) {
        for (const term of terms) {
          if (textLower.includes(term)) {
            return domain;
          }
        }
      }
      
      return null; // Unknown domain
    };
    
    // Detect specific professional specialties or sub-domains
    const detectSpecialty = (text, domain) => {
      if (!domain) return null;
      
      const textLower = text.toLowerCase();
      
      // Domain-specific specialties
      const specialtyMap = {
        "legal": [
          "corporate law", "criminal defense", "family law", "intellectual property", 
          "tax law", "estate planning", "immigration law", "civil litigation"
        ],
        "technology": [
          "web development", "mobile development", "data science", "machine learning",
          "cloud computing", "cybersecurity", "devops", "blockchain", "AI"
        ],
        "healthcare": [
          "cardiology", "pediatrics", "oncology", "neurology", "surgery",
          "family medicine", "psychiatry", "radiology"
        ],
        "finance": [
          "investment banking", "financial analysis", "wealth management", 
          "corporate finance", "accounting", "auditing", "tax"
        ]
      };
      
      // Check for specialties in the domain
      const specialties = specialtyMap[domain] || [];
      for (const specialty of specialties) {
        if (textLower.includes(specialty)) {
          return specialty;
        }
      }
      
      // Check for placeholder text indicating specialty
      if (textLower.includes("[specific") || textLower.includes("[area")) {
        // Generic specialty based on domain
        return `${domain} specialist`;
      }
      
      return `${domain} professional`;
    };
    
    // Replace common placeholders in text
    const replacePlaceholders = (text) => {
      // Years of experience placeholders
      let yearValue = "7";
      
      // If user has experience stored, use that
      if (user.experience) {
        yearValue = user.experience.toString();
      } else {
        const yearOptions = ["5", "7", "10", "15"];
        yearValue = yearOptions[Math.floor(Math.random() * yearOptions.length)];
      }
      
      let processed = text;
      
      // Replace "[X] years" or similar patterns
      processed = processed.replace(/\[(\d+|\s*[Xx]\s*)\]\s*years?/g, `${yearValue} years`);
      processed = processed.replace(/with\s+\[(\d+|\s*[Xx]\s*)\]\s+years?/g, `with ${yearValue} years`);
      
      return processed;
    };
    
    // Identify profession or domain from the current text
    const extractProfession = (text) => {
      // If we have an explicit override, use it
      if (contextData.profession) {
        return contextData.profession;
      }
      
      // Check for profession in text
      const originalDomain = detectOriginalDomain(text);
      if (originalDomain) {
        return originalDomain;
      }
      
      // Default to user's industry
      return specifiedIndustry;
    };
    
    const profession = extractProfession(current);
    console.log(`Detected profession: ${profession}`);
    
    // Detect original domain and specialty from current text
    const originalDomain = detectOriginalDomain(current) || specifiedIndustry;
    const specialtyInDomain = detectSpecialty(current, originalDomain);
    console.log(`Domain: ${originalDomain}, Specialty: ${specialtyInDomain || 'general'}`);
    
    // Process text to replace placeholders
    const processedText = replacePlaceholders(current);
    
    // Create strong domain preservation instructions
    let domainPreservation = "";
    if (originalDomain) {
      domainPreservation = `
        CRITICAL DOMAIN PRESERVATION:
        1. This content is for a ${originalDomain.toUpperCase()} professional${specialtyInDomain ? ` specializing in ${specialtyInDomain}` : ''}.
        2. MAINTAIN THIS DOMAIN - do not switch to another industry or domain.
        3. Use terminology specific to ${originalDomain}${specialtyInDomain ? ` and ${specialtyInDomain}` : ''}.
        4. DO NOT introduce terminology from unrelated industries.
        5. The user's selected industry is "${specifiedIndustry}" - if this conflicts with the detected ${originalDomain} domain, prioritize the detected domain from the text.
      `;
    } else {
      domainPreservation = `
        CRITICAL DOMAIN PRESERVATION:
        1. This content is for a professional in the "${specifiedIndustry}" industry.
        2. MAINTAIN THIS INDUSTRY CONTEXT - do not switch to another industry.
        3. Use terminology specific to the "${specifiedIndustry}" industry.
        4. DO NOT introduce terminology from unrelated industries.
      `;
    }
    
    // Process text to identify years of experience
    const extractYearsOfExperience = (text) => {
      // If user has experience stored, use that
      if (user.experience) {
        return user.experience.toString();
      }
      
      const yearsMatch = text.match(/\[?(\d+)\]?\s+years?/i) || 
                        text.match(/with\s+\[?[Xx]\]?\s+years/i);
      
      if (yearsMatch) {
        if (yearsMatch[0].includes('[X]') || yearsMatch[0].includes('[x]')) {
          return "extensive";
        } else if (yearsMatch[1]) {
          return yearsMatch[1];
        }
      }
      return "significant";
    };
    
    const yearsOfExperience = extractYearsOfExperience(current);
    
    // Incorporate user skills if available
    let skillsContext = "";
    if (user.skills && user.skills.length > 0) {
      skillsContext = `
        User Skills: The user has expertise in the following skills that should be emphasized when relevant:
        ${user.skills.join(", ")}
      `;
    }
    
    // Build type-specific prompt instructions
    let typeSpecificInstructions = '';
    
    switch(type.toLowerCase()) {
      case 'summary':
        typeSpecificInstructions = `
          Requirements for Professional Summary:
          1. Keep the same profession/domain: "${profession}"
          2. Maintain the career level and ${yearsOfExperience} years of experience mentioned
          3. Don't invent specific credentials or experience not mentioned in the original
          4. Focus on skills and achievements mentioned in the original
          5. Make it concise (2-4 sentences) and impactful
          6. Remove any placeholders like [X] or [specific area]
          7. Use industry-relevant terminology
          ${skillsContext}
        `;
        break;
        
      case 'experience':
        typeSpecificInstructions = `
          Requirements for Work Experience:
          1. Maintain the original role, company, and responsibilities
          2. Start each point with powerful action verbs
          3. Focus on achievements and impact rather than just responsibilities
          4. Include specific metrics where possible
          5. Remove any placeholders like [X] or [specific area]
          6. Focus on ${profession} skills and accomplishments
          ${skillsContext}
        `;
        break;
        
      case 'education':
        typeSpecificInstructions = `
          Requirements for Education:
          1. Maintain the original institution, degree, and field of study
          2. Highlight relevant coursework and academic achievements
          3. Remove any placeholders like [X] or [specific area]
          4. Focus on education aspects relevant to ${profession}
          5. Keep format consistent
        `;
        break;
        
      case 'project':
        typeSpecificInstructions = `
          Requirements for Projects:
          1. Maintain the original project name and purpose
          2. Clearly describe technologies used and your role
          3. Emphasize challenges overcome and solutions implemented
          4. Quantify impact and results
          5. Remove any placeholders like [X] or [specific area]
          6. Focus on ${profession}-related skills demonstrated
          ${skillsContext}
        `;
        break;
        
      default:
        typeSpecificInstructions = `
          Requirements:
          1. Maintain the original context and profession: "${profession}"
          2. Use action verbs and professional terminology
          3. Include metrics and results where possible
          4. Remove any placeholders like [X] or [specific area]
          5. Focus on achievements over responsibilities
          ${skillsContext}
        `;
    }
    
    // Build the main prompt
    const prompt = `
      Improve the following ${type} for a professional in the "${originalDomain || specifiedIndustry}" industry:

      Original content: "${processedText}"
      
      ${typeSpecificInstructions}
      
      ${domainPreservation}
      
      CRITICAL INSTRUCTIONS:
      1. Return ONLY the improved text with NO prefixes (like "Here is the improved summary:") 
      2. NO explanations, introductions, or conclusions
      3. Replace any remaining placeholders like "[specific area]" with specific, appropriate details
      4. STRICTLY MAINTAIN THE PROFESSIONAL DOMAIN - this is ${originalDomain || specifiedIndustry}, not another industry
      5. Enhance the content but preserve the ORIGINAL PROFESSIONAL IDENTITY
      6. Do not contradict any specific details already mentioned in the original text
    `;

    console.log("Sending AI request to Groq");
    let improvedContent = await generateWithGroq(prompt);
    
    // Post-processing to remove common prefixes that sometimes appear
    const prefixesToRemove = [
      "Here is the improved summary:", 
      "Here's the improved summary:", 
      "Improved summary:", 
      "Here is the improved content:",
      "Here's the improved content:",
      "Improved content:",
      "Here is the improved description:",
      "Here's the improved description:",
      "Improved description:"
    ];
    
    for (const prefix of prefixesToRemove) {
      if (improvedContent.startsWith(prefix)) {
        improvedContent = improvedContent.substring(prefix.length).trim();
      }
    }
    
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error(`Failed to improve content: ${error.message}`);
  }
}