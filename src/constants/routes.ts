export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  authCallback: "/auth/callback",
  onboarding: "/onboarding",
  dashboard: "/dashboard",

  newCourse: "/courses/new",
  course: (courseId: string) => `/courses/${courseId}`,
};
