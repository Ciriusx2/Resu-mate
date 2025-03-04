"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center min-h-screen">

      <Card className="w-full max-w-lg sm:max-w-md lg:max-w-lg mt-10 mx-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl text-indigo-600 font-bold">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            <p className="text-indigo-600">Select your industry to get personalized career insights and recommendations.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry Select */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-indigo-600 font-semibold">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(industries.find((ind) => ind.id === value));
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries ? (
                    <SelectGroup>
                      <SelectLabel className="bg-white">Industries</SelectLabel>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id} className="bg-white">
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  )}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {/* SubIndustry Select */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry" className="text-indigo-600 font-semibold">Specialization</Label>
                {selectedIndustry ? (
                  <Select
                    onValueChange={(value) => setValue("subIndustry", value)}
                  >
                    <SelectTrigger id="subIndustry">
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="bg-white">Specializations</SelectLabel>
                        {selectedIndustry?.subIndustries.map((sub) => (
                          <SelectItem key={sub} value={sub} className="bg-white">
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading Specializations...</p>
                )}
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                )}
              </div>
            )}

            {/* Years of Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-indigo-600 font-semibold">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
                disabled={updateLoading}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-indigo-600 font-semibold">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
                disabled={updateLoading}
              />
              <p className="text-sm text-muted-foreground text-indigo-600">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Professional Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-indigo-600 font-semibold">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
                disabled={updateLoading}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-md transition-all duration-300 w-full"
              disabled={updateLoading}
              aria-disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
