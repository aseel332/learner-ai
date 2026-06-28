import { createClient as createBrowserClient } from "@/lib/supabase/client";

export const userService = {
  async getCurrentUser() {
    const supabase = createBrowserClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getProfile(userId: string) {
    const supabase = createBrowserClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data;
  },

  async getRedirectPathByProfile(userId: string) {
    try {
      const profile = await this.getProfile(userId);
      return profile?.onboarded ? "/dashboard" : "/onboarding";
    } catch (error) {
      console.error("Error fetching profile for redirect:", error);
      return "/onboarding";
    }
  },
};
