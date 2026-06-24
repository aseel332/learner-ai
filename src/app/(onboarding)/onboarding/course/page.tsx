"use client";

import { CourseSetupStep } from "@/components/onboarding/CourseSetupStep";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function OnboardingCoursePage() {
  const onboarding = useOnboarding("course");

  return (
    <OnboardingLayout
      currentStep="course"
      error={onboarding.error}
      loading={onboarding.loading}
      userEmail={onboarding.user.email}
    >
      {onboarding.loading ? (
        <div className="space-y-5" aria-live="polite">
          <div className="h-4 w-24 rounded-md bg-[#e7ebe4]" />
          <div className="h-10 w-3/4 rounded-md bg-[#e7ebe4]" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-72 rounded-lg bg-[#eef1ed]" />
            <div className="h-72 rounded-lg bg-[#eef1ed]" />
          </div>
        </div>
      ) : (
        <CourseSetupStep
          saving={onboarding.saving}
          onCreateCourse={onboarding.createFirstCourse}
          onSkip={onboarding.skipCourseCreation}
        />
      )}
    </OnboardingLayout>
  );
}
