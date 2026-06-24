import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";
import { canUseSupabase } from "./onboardingService";

type Course = Database["public"]["Tables"]["courses"]["Row"];
type CourseInsert = Database["public"]["Tables"]["courses"]["Insert"];

export type FirstCourseData = {
  name: string;
  subject: string | null;
  term: string | null;
};

const mockCoursesKey = "learner-ai.mock.courses";

function readMockCourses(): Course[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(mockCoursesKey);
  return stored ? JSON.parse(stored) : [];
}

function writeMockCourse(course: Course) {
  window.localStorage.setItem(
    mockCoursesKey,
    JSON.stringify([...readMockCourses(), course])
  );
}

function createMockCourse(payload: CourseInsert): Course {
  return {
    id: crypto.randomUUID(),
    user_id: payload.user_id,
    name: payload.name,
    subject: payload.subject ?? null,
    instructor: payload.instructor ?? null,
    term: payload.term ?? null,
    description: payload.description ?? null,
    image_url: payload.image_url ?? null,
    start_date: payload.start_date ?? null,
    end_date: payload.end_date ?? null,
    has_grading: payload.has_grading ?? false,
    target_grade: payload.target_grade ?? null,
    status: payload.status ?? "active",
    created_at: new Date().toISOString(),
  };
}

export async function createFirstCourse(userId: string, data: FirstCourseData) {
  const payload: CourseInsert = {
    user_id: userId,
    name: data.name,
    subject: data.subject,
    term: data.term,
    instructor: null,
    description: null,
    image_url: null,
    start_date: null,
    end_date: null,
    has_grading: false,
    target_grade: null,
    status: "active",
  };

  if (!canUseSupabase()) {
    const course = createMockCourse(payload);
    writeMockCourse(course);
    return course;
  }

  const supabase = createClient();
  const { data: course, error } = await supabase
    .from("courses")
    .insert(payload)
    .select("*")
    .maybeSingle();

  if (error || !course) {
    const fallbackCourse = createMockCourse(payload);
    writeMockCourse(fallbackCourse);
    return fallbackCourse;
  }

  return course;
}
