"use client";

import { onboardingSchema } from "@/lib/schema";
import React from "react";
import {useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm: React.FC = ({
  industries,
}: {
  industries: string | number[];
}) => {
  const [selectedIndustry, setSelectedIndustry] = React.useState(null);

  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult

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

  const watchIndustry = watch("industry");

  const submitForm = async (values) => {
    console.log("Form submitted", values);
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`
      await updateUserFn({
        ...values,
        industry: formattedIndustry
      })
    } catch (err) {
      console.error("Error onboarding user:", err);
      return;
    }
  };
  useEffect(() => {
    if (updateResult && !updateLoading) {
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  console.log("Update result:", updateResult);
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Onboarding
          </CardTitle>
          <CardDescription>
            Fill in the details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            {/* industry */}
            <div className="space-y-4">
              <Label htmlFor="industry" className="block mb-2">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {

                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value),
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>
            {/* sub industry */}
            {watchIndustry && (
              <div className="space-y-4 mt-4">
                <Label htmlFor="subIndustry" className="block mb-2">
                  Sub Industry
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select Sub Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-red-500 text-sm">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}
            {/* years of experience */}

            <div className="space-y-4 mt-4">
              <Label htmlFor="experience" className="block mb-2">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min={0}
                max={50}
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* skills */}
            <div className="space-y-4 mt-4">
              <Label htmlFor="skills" className="block mb-2">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g, React, Node.js, Python, etc."
                {...register("skills")}
              />
              <p className="text-gray-500 text-sm">
                Separate skills with commas.
              </p>
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            {/* professional Bio */}
            <div className="space-y-4 mt-4">
              <Label htmlFor="bio" className="block mb-2">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background ..."
                {...register("bio")}
                className="resize-none min-h-[80px] max-h-[200px]"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={updateLoading}>
              {updateLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </> : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
