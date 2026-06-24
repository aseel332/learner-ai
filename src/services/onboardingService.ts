import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type OnboardingRole =
  | "student"
  | "self_learner"
  | "educator"
  | "professional";
export type SubscriptionPlan = "free" | "pro" | "campus";

const mockProfilesKey = "learner-ai.mock.profiles";

export const dummyUser = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "demo@learner-ai.local",
};

export function canUseSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

function readMockProfiles(): Record<string, Profile> {
  if (typeof window === "undefined") {
    return {};
  }

  const stored = window.localStorage.getItem(mockProfilesKey);
  return stored ? JSON.parse(stored) : {};
}

function writeMockProfile(profile: Profile) {
  const profiles = readMockProfiles();
  profiles[profile.id] = profile;
  window.localStorage.setItem(mockProfilesKey, JSON.stringify(profiles));
}

function createMockProfile(userId: string): Profile {
  const now = new Date().toISOString();

  return {
    id: userId,
    full_name: "Demo Learner",
    avatar_url: null,
    purpose: null,
    plan: "free",
    onboarded: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    study_hours_per_week: null,
    preferred_study_time: null,
    learning_style: null,
    created_at: now,
    updated_at: now,
  };
}

function mergeMockProfile(userId: string, data: Partial<Profile>) {
  const profile = {
    ...(readMockProfiles()[userId] ?? createMockProfile(userId)),
    ...data,
    updated_at: new Date().toISOString(),
  };
  writeMockProfile(profile);
  return profile;
}

export async function getProfile(userId: string) {
  if (!canUseSupabase()) {
    return mergeMockProfile(userId, {});
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    const fallbackProfile = createMockProfile(userId);
    const { data: insertedProfile } = await supabase
      .from("profiles")
      .insert(fallbackProfile)
      .select("*")
      .maybeSingle();

    return insertedProfile ?? mergeMockProfile(userId, fallbackProfile);
  }

  return data;
}

export async function saveRole(userId: string, role: OnboardingRole) {
  const payload = {
    purpose: role,
    updated_at: new Date().toISOString(),
  };

  if (!canUseSupabase()) {
    return mergeMockProfile(userId, payload);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  return data ?? (error ? mergeMockProfile(userId, payload) : mergeMockProfile(userId, payload));
}

export async function savePlan(userId: string, plan: SubscriptionPlan) {
  const payload = {
    plan,
    updated_at: new Date().toISOString(),
  };

  if (!canUseSupabase()) {
    return mergeMockProfile(userId, payload);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  return data ?? (error ? mergeMockProfile(userId, payload) : mergeMockProfile(userId, payload));
}

export async function completeOnboarding(userId: string) {
  const payload = {
    onboarded: true,
    updated_at: new Date().toISOString(),
  };

  if (!canUseSupabase()) {
    return mergeMockProfile(userId, payload);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  return data ?? (error ? mergeMockProfile(userId, payload) : mergeMockProfile(userId, payload));
}
