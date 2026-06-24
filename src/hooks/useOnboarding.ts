"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  completeOnboarding as completeOnboardingService,
  dummyUser,
  getProfile,
  savePlan,
  saveRole,
  type OnboardingRole,
  type Profile,
  type SubscriptionPlan,
} from "@/services/onboardingService";
import {
  createFirstCourse as createFirstCourseService,
  type FirstCourseData,
} from "@/services/courseService";

export type OnboardingStep = "role" | "plan" | "course";

const selectedRoleKey = "learner-ai.onboarding.role";
const selectedPlanKey = "learner-ai.onboarding.plan";
const homePath = "/";

const stepPaths: Record<OnboardingStep, string> = {
  role: "/onboarding/role",
  plan: "/onboarding/plan",
  course: "/onboarding/course",
};

function normalizeRole(role: string | null): OnboardingRole | null {
  if (
    role === "student" ||
    role === "self_learner" ||
    role === "educator" ||
    role === "professional"
  ) {
    return role;
  }

  if (role === "school") {
    return "student";
  }

  if (role === "personal" || role === "research") {
    return "self_learner";
  }

  if (role === "work") {
    return "professional";
  }

  return null;
}

function normalizePlan(plan: string | null): SubscriptionPlan {
  if (plan === "pro" || plan === "campus") {
    return plan;
  }

  return "free";
}

export function useOnboarding(activeStep: OnboardingStep) {
  const router = useRouter();
  const user = useMemo(() => dummyUser, []);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<OnboardingRole>("student");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("free");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const storedRole = window.localStorage.getItem(
          selectedRoleKey
        ) as OnboardingRole | null;
        const storedPlan = window.localStorage.getItem(
          selectedPlanKey
        ) as SubscriptionPlan | null;

        if (storedRole) {
          setSelectedRole(storedRole);
        }

        if (storedPlan) {
          setSelectedPlan(storedPlan);
        }

        const fetchedProfile = await getProfile(user.id);

        if (cancelled) {
          return;
        }

        setProfile(fetchedProfile);

        const normalizedRole = normalizeRole(fetchedProfile.purpose);

        if (normalizedRole) {
          setSelectedRole(normalizedRole);
        }

        if (fetchedProfile.plan) {
          setSelectedPlan(normalizePlan(fetchedProfile.plan));
        }

        if (
          (activeStep === "plan" || activeStep === "course") &&
          !normalizedRole &&
          !storedRole
        ) {
          router.replace(stepPaths.role);
        }
      } catch (caughtError) {
        if (!cancelled) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load onboarding."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeStep, router, user.id]);

  async function runAction(action: () => Promise<void>) {
    try {
      setSaving(true);
      setError(null);
      await action();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  const chooseRole = useCallback(
    async (role: OnboardingRole) => {
      setSelectedRole(role);
      window.localStorage.setItem(selectedRoleKey, role);

      await runAction(async () => {
        const updatedProfile = await saveRole(user.id, role);
        setProfile(updatedProfile);
        router.push(stepPaths.plan);
      });
    },
    [router, user.id]
  );

  const choosePlan = useCallback(
    async (plan: SubscriptionPlan) => {
      setSelectedPlan(plan);
      window.localStorage.setItem(selectedPlanKey, plan);

      await runAction(async () => {
        const updatedProfile = await savePlan(user.id, plan);
        setProfile(updatedProfile);
        router.push(stepPaths.course);
      });
    },
    [router, user.id]
  );

  const createFirstCourse = useCallback(
    async (data: FirstCourseData) => {
      await runAction(async () => {
        await createFirstCourseService(user.id, data);
        await completeOnboardingService(user.id);
        window.localStorage.removeItem(selectedRoleKey);
        window.localStorage.removeItem(selectedPlanKey);
        router.replace(homePath);
      });
    },
    [router, user.id]
  );

  const skipCourseCreation = useCallback(async () => {
    await runAction(async () => {
      await completeOnboardingService(user.id);
      window.localStorage.removeItem(selectedRoleKey);
      window.localStorage.removeItem(selectedPlanKey);
      router.replace(homePath);
    });
  }, [router, user.id]);

  return {
    user,
    profile,
    activeStep,
    selectedRole,
    selectedPlan,
    loading,
    saving,
    error,
    chooseRole,
    choosePlan,
    createFirstCourse,
    skipCourseCreation,
  };
}
