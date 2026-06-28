import { createClient as createBrowserClient } from "@/lib/supabase/client";

export const authService = {
  async signupWithEmail(displayName: string, email: string, password: string) {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async loginWithEmail(email: string, password: string) {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async loginWithGoogle() {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
