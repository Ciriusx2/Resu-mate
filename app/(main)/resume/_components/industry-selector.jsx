// app/resume/_components/industry-selector.jsx
"use client";

import { useState, useEffect } from "react";
import { Sparkles, Check, Loader2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateUserIndustry } from "@/actions/resume";
import { toast } from "sonner";

// Industry options using the combined format (matches your database schema)
const INDUSTRY_OPTIONS = [
  // Technology
  { value: "tech-software-development", label: "Software Development", group: "Technology" },
  { value: "tech-data-science", label: "Data Science & Analytics", group: "Technology" },
  { value: "tech-cybersecurity", label: "Cybersecurity", group: "Technology" },
  { value: "tech-cloud-infrastructure", label: "Cloud & Infrastructure", group: "Technology" },
  { value: "tech-ai-ml", label: "AI & Machine Learning", group: "Technology" },
  { value: "tech-product-management", label: "Product Management", group: "Technology" },
  
  // Healthcare
  { value: "health-clinical", label: "Clinical Practice", group: "Healthcare" },
  { value: "health-research", label: "Medical Research", group: "Healthcare" },
  { value: "health-administration", label: "Healthcare Administration", group: "Healthcare" },
  
  // Finance
  { value: "fin-banking", label: "Banking", group: "Finance" },
  { value: "fin-investment", label: "Investment & Wealth Management", group: "Finance" },
  { value: "fin-accounting", label: "Accounting & Auditing", group: "Finance" },
  { value: "fin-insurance", label: "Insurance", group: "Finance" },
  
  // Legal
  { value: "legal-corporate", label: "Corporate Law", group: "Legal" },
  { value: "legal-litigation", label: "Litigation", group: "Legal" },
  { value: "legal-ip", label: "Intellectual Property", group: "Legal" },
  
  // Marketing
  { value: "market-digital", label: "Digital Marketing", group: "Marketing" },
  { value: "market-branding", label: "Brand Management", group: "Marketing" },
  { value: "market-content", label: "Content Creation", group: "Marketing" },
  
  // Education
  { value: "edu-teaching", label: "Teaching", group: "Education" },
  { value: "edu-administration", label: "Educational Administration", group: "Education" },
  
  // Others
  { value: "consult-management", label: "Management Consulting", group: "Consulting" },
  { value: "nonprofit-management", label: "Nonprofit Management", group: "Nonprofit" },
  { value: "gov-administration", label: "Government Administration", group: "Government" },
  { value: "eng-mechanical", label: "Mechanical Engineering", group: "Engineering" },
  { value: "eng-civil", label: "Civil Engineering", group: "Engineering" },
  { value: "retail-management", label: "Retail Management", group: "Retail" },
  { value: "professional", label: "Other/General", group: "Other" },
];

// Group the options by category
const GROUPED_OPTIONS = INDUSTRY_OPTIONS.reduce((acc, option) => {
  if (!acc[option.group]) {
    acc[option.group] = [];
  }
  acc[option.group].push(option);
  return acc;
}, {});

export function IndustrySelector({ currentIndustry, onSuccess }) {
  const [selectedIndustry, setSelectedIndustry] = useState(currentIndustry || "professional");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Get readable industry label
  const getIndustryLabel = (value) => {
    const option = INDUSTRY_OPTIONS.find(option => option.value === value);
    return option ? `${option.group}: ${option.label}` : "Other";
  };

  // Handle industry update
  const handleUpdate = async () => {
    if (selectedIndustry === currentIndustry) {
      toast.info("Industry already set to " + getIndustryLabel(selectedIndustry));
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    
    try {
      // Try to update industry
      const result = await updateUserIndustry(selectedIndustry);
      
      if (result?.success) {
        toast.success(`Industry updated to ${getIndustryLabel(selectedIndustry)}`);
        // Call onSuccess if provided
        if (onSuccess) onSuccess(selectedIndustry);
      } else {
        throw new Error("Failed to update industry");
      }
    } catch (error) {
      console.error("Industry update error:", error);
      setError(error.message || "Failed to update industry");
      toast.error(error.message || "Failed to update industry");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Optimize for industry:</span>
        </div>
        
        <div className="flex flex-1 gap-2">
          <Select
            value={selectedIndustry}
            onValueChange={setSelectedIndustry}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(GROUPED_OPTIONS).map(([group, options]) => (
                <SelectGroup key={group}>
                  <SelectLabel>{group}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleUpdate}
            disabled={isUpdating || selectedIndustry === currentIndustry}
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Apply
              </>
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 mt-1 px-2 py-1 bg-red-50 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}