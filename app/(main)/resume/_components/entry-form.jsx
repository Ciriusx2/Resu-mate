// Modified entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

// Sample templates for different entry types to provide context for AI
const getContextForType = (type, data) => {
  const contextMap = {
    experience: {
      prompt: `Improve this work experience description for a resume. Make it more impactful by focusing on achievements and using strong action verbs. Include metrics where possible. This is for a ${data.title} position at ${data.organization}:`,
      example: "Led cross-functional team to deliver product features on time and under budget"
    },
    education: {
      prompt: `Enhance this education description for a resume. Focus on relevant coursework, achievements, and skills gained. This is for ${data.title} at ${data.organization}:`,
      example: "Graduated with honors, focusing on machine learning and data structures"
    },
    project: {
      prompt: `Improve this project description for a resume. Highlight technologies used, your role, and measurable outcomes. This is for the project titled ${data.title}:`,
      example: "Developed a mobile application that increased user engagement by 45%"
    }
  };

  return contextMap[type.toLowerCase()] || { 
    prompt: `Improve this ${type.toLowerCase()} description for a resume:`,
    example: "Make it concise, achievement-oriented, and use active voice"
  };
};

export function EntryForm({ type, entries, onChange, currentIndustry = "professional" }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "Present" : formatDisplayDate(data.endDate),
    };

    if (editIndex !== null) {
      const newEntries = [...entries];
      newEntries[editIndex] = formattedEntry;
      onChange(newEntries);
      setEditIndex(null);
    } else {
      onChange([...entries, formattedEntry]);
    }

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setEditIndex(index);
    setIsAdding(true);

    // Convert display dates back to form format (yyyy-MM)
    const startDate = entry.startDate !== "Present" 
      ? format(parse(entry.startDate, "MMM yyyy", new Date()), "yyyy-MM")
      : "";
    
    const endDate = entry.endDate !== "Present" 
      ? format(parse(entry.endDate, "MMM yyyy", new Date()), "yyyy-MM")
      : "";

    reset({
      title: entry.title,
      organization: entry.organization,
      startDate,
      endDate,
      description: entry.description,
      current: entry.endDate === "Present",
    });
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Enhance handleImproveDescription with better prompting
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    const formData = getValues();
    const context = getContextForType(type, formData);

    try {
      await improveWithAIFn({
        current: description,
        type: type.toLowerCase(),
        context: JSON.stringify({
          title: formData.title,
          organization: formData.organization,
          prompt: context.prompt,
          example: context.example,
          industry: currentIndustry
        })
      });
    } catch (error) {
      toast.error(error.message || "Failed to improve description");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleEdit(index)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.current || item.endDate === "Present"
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editIndex !== null ? `Edit ${type}` : `Add ${type}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title/Position"
                  {...register("title")}
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Organization/Company"
                  {...register("organization")}
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("startDate")}
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label htmlFor="current">Current {type}</label>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                className="h-32"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
                setEditIndex(null);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              {editIndex !== null ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Entry
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full text-black"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}