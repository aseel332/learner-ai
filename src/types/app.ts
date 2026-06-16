export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  purpose: "school" | "research" | "work" | "personal" | null;
  onboarding_completed: boolean;
  onboarding_step: string;
  subscription_plan: "none" | "free_trial" | "basic" | "pro";
  subscription_status: "inactive" | "trialing" | "active";
  subscription_started_at: string | null;
  trial_ends_at: string | null;
  timezone: string | null;
  weekly_study_hours: number | null;
  target_grade: string | null;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  user_id: string;
  name: string;
  subject: string | null;
  instructor_name: string | null;
  term: string | null;
  description: string | null;
  schedule: {
    days?: string[];
    startTime?: string | null;
    endTime?: string | null;
  };
  target_grade: string | null;
  current_week: number;
  progress_pct: number;
  pending_tasks_count: number;
  materials_count: number;
  upcoming_deadline_title: string | null;
  upcoming_deadline_at: string | null;
  status: "active" | "archived";
  created_at: string;
  updated_at: string;
};

export type GradingCategory = {
  id: string;
  course_id: string;
  name: string;
  weight_pct: number;
  created_at: string;
  updated_at: string;
};

export type CalendarEvent = {
  id: string;
  course_id: string;
  user_id: string;
  title: string;
  type: "assignment" | "quiz" | "midterm" | "final" | "project" | "lab" | "study_task" | "other";
  event_at: string;
  grading_category_id: string | null;
  grade_weight_pct: number | null;
  status: string;
  created_from: string;
  created_at: string;
  updated_at: string;
};

export type Upload = {
  id: string;
  course_id: string;
  uploaded_by: string;
  file_path: string;
  file_url: string | null;
  title: string;
  description: string | null;
  file_type: "syllabus" | "notes" | "slides" | "assignment" | "recording" | "rubric" | "exam_review" | "practice" | "image" | "other";
  mime_type: string | null;
  size_bytes: number | null;
  week: number | null;
  status: "pending" | "processing" | "processed" | "failed";
  created_at: string;
  updated_at: string;
};
