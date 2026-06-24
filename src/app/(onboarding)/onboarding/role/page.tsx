"use client";

import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { RoleStep } from "@/components/onboarding/RoleStep";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function OnboardingRolePage() {
  const onboarding = useOnboarding("role");

  return (
    <OnboardingLayout
      currentStep="role"
      error={onboarding.error}
      loading={onboarding.loading}
      userEmail={onboarding.user.email}
    >
      {onboarding.loading ? (
        <div className="space-y-5" aria-live="polite">
          <div className="h-4 w-24 rounded-md bg-[#e7ebe4]" />
          <div className="h-10 w-3/4 rounded-md bg-[#e7ebe4]" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-48 rounded-lg bg-[#eef1ed]" />
            <div className="h-48 rounded-lg bg-[#eef1ed]" />
            <div className="h-48 rounded-lg bg-[#eef1ed]" />
            <div className="h-48 rounded-lg bg-[#eef1ed]" />
          </div>
        </div>
      ) : (
        <RoleStep
          selectedRole={onboarding.selectedRole}
          saving={onboarding.saving}
          onChoose={onboarding.chooseRole}
        />
      )}
    </OnboardingLayout>
  );
}
