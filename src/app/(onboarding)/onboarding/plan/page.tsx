"use client";

import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { PlanStep } from "@/components/onboarding/PlanStep";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function OnboardingPlanPage() {
  const onboarding = useOnboarding("plan");

  return (
    <OnboardingLayout
      currentStep="plan"
      error={onboarding.error}
      loading={onboarding.loading}
      userEmail={onboarding.user.email}
    >
      {onboarding.loading ? (
        <div className="space-y-5" aria-live="polite">
          <div className="h-4 w-24 rounded-md bg-[#e7ebe4]" />
          <div className="h-10 w-3/4 rounded-md bg-[#e7ebe4]" />
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="h-96 rounded-lg bg-[#eef1ed]" />
            <div className="h-96 rounded-lg bg-[#eef1ed]" />
            <div className="h-96 rounded-lg bg-[#eef1ed]" />
          </div>
        </div>
      ) : (
        <PlanStep
          selectedPlan={onboarding.selectedPlan}
          saving={onboarding.saving}
          onChoose={onboarding.choosePlan}
        />
      )}
    </OnboardingLayout>
  );
}
