export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assignment_analysis: {
        Row: {
          analyzed_at: string | null
          assignment_id: string
          common_mistakes: Json | null
          course_id: string
          id: string
          prep_plan: Json | null
          prerequisite_topics: Json | null
          recommended_quiz_ids: Json | null
          related_materials: Json | null
          required_topics: Json | null
          skills_needed: Json | null
          task_breakdown: Json | null
        }
        Insert: {
          analyzed_at?: string | null
          assignment_id: string
          common_mistakes?: Json | null
          course_id: string
          id?: string
          prep_plan?: Json | null
          prerequisite_topics?: Json | null
          recommended_quiz_ids?: Json | null
          related_materials?: Json | null
          required_topics?: Json | null
          skills_needed?: Json | null
          task_breakdown?: Json | null
        }
        Update: {
          analyzed_at?: string | null
          assignment_id?: string
          common_mistakes?: Json | null
          course_id?: string
          id?: string
          prep_plan?: Json | null
          prerequisite_topics?: Json | null
          recommended_quiz_ids?: Json | null
          related_materials?: Json | null
          required_topics?: Json | null
          skills_needed?: Json | null
          task_breakdown?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_analysis_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: true
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_analysis_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_feedback: {
        Row: {
          correctness_summary: string | null
          course_id: string
          created_at: string
          feedback: Json | null
          id: string
          score_estimate: number | null
          submission_id: string
        }
        Insert: {
          correctness_summary?: string | null
          course_id: string
          created_at?: string
          feedback?: Json | null
          id?: string
          score_estimate?: number | null
          submission_id: string
        }
        Update: {
          correctness_summary?: string | null
          course_id?: string
          created_at?: string
          feedback?: Json | null
          id?: string
          score_estimate?: number | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_feedback_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_feedback_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "assignment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          course_id: string
          file_url: string | null
          id: string
          submission_text: string | null
          submitted_at: string
          version: number
        }
        Insert: {
          assignment_id: string
          course_id: string
          file_url?: string | null
          id?: string
          submission_text?: string | null
          submitted_at?: string
          version?: number
        }
        Update: {
          assignment_id?: string
          course_id?: string
          file_url?: string | null
          id?: string
          submission_text?: string | null
          submitted_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          due_date: string | null
          due_time: string | null
          estimated_difficulty: string | null
          grading_category_id: string | null
          id: string
          source_upload_id: string | null
          status: string
          title: string
          type: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          estimated_difficulty?: string | null
          grading_category_id?: string | null
          id?: string
          source_upload_id?: string | null
          status?: string
          title: string
          type?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          estimated_difficulty?: string | null
          grading_category_id?: string | null
          id?: string
          source_upload_id?: string | null
          status?: string
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_grading_category_id_fkey"
            columns: ["grading_category_id"]
            isOneToOne: false
            referencedRelation: "grading_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_source_upload_id_fkey"
            columns: ["source_upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          all_day: boolean
          course_id: string
          created_at: string
          end_at: string | null
          id: string
          kind: string | null
          related_id: string | null
          related_type: string | null
          source: string | null
          start_at: string | null
          status: string
          title: string | null
        }
        Insert: {
          all_day?: boolean
          course_id: string
          created_at?: string
          end_at?: string | null
          id?: string
          kind?: string | null
          related_id?: string | null
          related_type?: string | null
          source?: string | null
          start_at?: string | null
          status?: string
          title?: string | null
        }
        Update: {
          all_day?: boolean
          course_id?: string
          created_at?: string
          end_at?: string | null
          id?: string
          kind?: string | null
          related_id?: string | null
          related_type?: string | null
          source?: string | null
          start_at?: string | null
          status?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      content_chunks: {
        Row: {
          chunk_index: number | null
          course_id: string
          created_at: string
          embedding: string | null
          id: string
          source_location: Json | null
          text: string
          token_count: number | null
          upload_id: string
        }
        Insert: {
          chunk_index?: number | null
          course_id: string
          created_at?: string
          embedding?: string | null
          id?: string
          source_location?: Json | null
          text: string
          token_count?: number | null
          upload_id: string
        }
        Update: {
          chunk_index?: number | null
          course_id?: string
          created_at?: string
          embedding?: string | null
          id?: string
          source_location?: Json | null
          text?: string
          token_count?: number | null
          upload_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_chunks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_chunks_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          has_grading: boolean
          id: string
          image_url: string | null
          instructor: string | null
          name: string
          start_date: string | null
          status: string
          subject: string | null
          target_grade: string | null
          term: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          has_grading?: boolean
          id?: string
          image_url?: string | null
          instructor?: string | null
          name: string
          start_date?: string | null
          status?: string
          subject?: string | null
          target_grade?: string | null
          term?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          has_grading?: boolean
          id?: string
          image_url?: string | null
          instructor?: string | null
          name?: string
          start_date?: string | null
          status?: string
          subject?: string | null
          target_grade?: string | null
          term?: string | null
          user_id?: string
        }
        Relationships: []
      }
      exam_prep: {
        Row: {
          course_id: string
          exam_id: string
          id: string
          last_computed_at: string | null
          priority_topics: Json | null
          readiness_score: number | null
          study_plan: Json | null
          topic_breakdown: Json | null
        }
        Insert: {
          course_id: string
          exam_id: string
          id?: string
          last_computed_at?: string | null
          priority_topics?: Json | null
          readiness_score?: number | null
          study_plan?: Json | null
          topic_breakdown?: Json | null
        }
        Update: {
          course_id?: string
          exam_id?: string
          id?: string
          last_computed_at?: string | null
          priority_topics?: Json | null
          readiness_score?: number | null
          study_plan?: Json | null
          topic_breakdown?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_prep_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_prep_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: true
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          allowed_materials: string | null
          chapters: Json | null
          course_id: string
          created_at: string
          exam_date: string | null
          exam_time: string | null
          format: string | null
          grading_category_id: string | null
          id: string
          instructor_hints: string | null
          source_upload_id: string | null
          status: string
          title: string
        }
        Insert: {
          allowed_materials?: string | null
          chapters?: Json | null
          course_id: string
          created_at?: string
          exam_date?: string | null
          exam_time?: string | null
          format?: string | null
          grading_category_id?: string | null
          id?: string
          instructor_hints?: string | null
          source_upload_id?: string | null
          status?: string
          title: string
        }
        Update: {
          allowed_materials?: string | null
          chapters?: Json | null
          course_id?: string
          created_at?: string
          exam_date?: string | null
          exam_time?: string | null
          format?: string | null
          grading_category_id?: string | null
          id?: string
          instructor_hints?: string | null
          source_upload_id?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_grading_category_id_fkey"
            columns: ["grading_category_id"]
            isOneToOne: false
            referencedRelation: "grading_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_source_upload_id_fkey"
            columns: ["source_upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      grade_snapshots: {
        Row: {
          best_case: number | null
          biggest_impact_category: string | null
          computed_at: string
          course_id: string
          current_grade: number | null
          id: string
          needed_on_remaining: Json | null
          priority_list: Json | null
          projected_grade: number | null
          worst_case: number | null
        }
        Insert: {
          best_case?: number | null
          biggest_impact_category?: string | null
          computed_at?: string
          course_id: string
          current_grade?: number | null
          id?: string
          needed_on_remaining?: Json | null
          priority_list?: Json | null
          projected_grade?: number | null
          worst_case?: number | null
        }
        Update: {
          best_case?: number | null
          biggest_impact_category?: string | null
          computed_at?: string
          course_id?: string
          current_grade?: number | null
          id?: string
          needed_on_remaining?: Json | null
          priority_list?: Json | null
          projected_grade?: number | null
          worst_case?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grade_snapshots_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          course_id: string
          grading_category_id: string | null
          id: string
          item_label: string | null
          item_ref_id: string | null
          item_type: string | null
          max_score: number | null
          recorded_at: string
          score: number | null
        }
        Insert: {
          course_id: string
          grading_category_id?: string | null
          id?: string
          item_label?: string | null
          item_ref_id?: string | null
          item_type?: string | null
          max_score?: number | null
          recorded_at?: string
          score?: number | null
        }
        Update: {
          course_id?: string
          grading_category_id?: string | null
          id?: string
          item_label?: string | null
          item_ref_id?: string | null
          item_type?: string | null
          max_score?: number | null
          recorded_at?: string
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_grading_category_id_fkey"
            columns: ["grading_category_id"]
            isOneToOne: false
            referencedRelation: "grading_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      grading_categories: {
        Row: {
          course_id: string
          id: string
          name: string
          weight_pct: number
        }
        Insert: {
          course_id: string
          id?: string
          name: string
          weight_pct: number
        }
        Update: {
          course_id?: string
          id?: string
          name?: string
          weight_pct?: number
        }
        Relationships: [
          {
            foreignKeyName: "grading_categories_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      important_dates: {
        Row: {
          category_id: string | null
          course_id: string
          created_at: string
          due_date: string | null
          due_time: string | null
          grade_pct: number | null
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          course_id: string
          created_at?: string
          due_date?: string | null
          due_time?: string | null
          grade_pct?: number | null
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          course_id?: string
          created_at?: string
          due_date?: string | null
          due_time?: string | null
          grade_pct?: number | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "important_dates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "grading_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "important_dates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_goals: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          due_date: string | null
          goal_type: string | null
          id: string
          related_id: string | null
          related_type: string | null
          status: string
          title: string | null
          week_number: number | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          goal_type?: string | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          title?: string | null
          week_number?: number | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          goal_type?: string | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          title?: string | null
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_goals_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          course_id: string
          created_at: string
          id: string
          priority: string
          read_at: string | null
          related_id: string | null
          related_type: string | null
          scheduled_for: string | null
          sent_at: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          body?: string | null
          course_id: string
          created_at?: string
          id?: string
          priority?: string
          read_at?: string | null
          related_id?: string | null
          related_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          body?: string | null
          course_id?: string
          created_at?: string
          id?: string
          priority?: string
          read_at?: string | null
          related_id?: string | null
          related_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          learning_style: string | null
          onboarded: boolean
          plan: string
          preferred_study_time: string | null
          purpose: string | null
          study_hours_per_week: number | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          learning_style?: string | null
          onboarded?: boolean
          plan?: string
          preferred_study_time?: string | null
          purpose?: string | null
          study_hours_per_week?: number | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          learning_style?: string | null
          onboarded?: boolean
          plan?: string
          preferred_study_time?: string | null
          purpose?: string | null
          study_hours_per_week?: number | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_answers: {
        Row: {
          attempt_id: string
          confidence_rating: string | null
          course_id: string
          id: string
          is_correct: boolean | null
          points_awarded: number | null
          question_id: string
          time_spent_sec: number | null
          user_answer: Json | null
        }
        Insert: {
          attempt_id: string
          confidence_rating?: string | null
          course_id: string
          id?: string
          is_correct?: boolean | null
          points_awarded?: number | null
          question_id: string
          time_spent_sec?: number | null
          user_answer?: Json | null
        }
        Update: {
          attempt_id?: string
          confidence_rating?: string | null
          course_id?: string
          id?: string
          is_correct?: boolean | null
          points_awarded?: number | null
          question_id?: string
          time_spent_sec?: number | null
          user_answer?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_answers_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          course_id: string
          id: string
          quiz_id: string
          score_pct: number | null
          started_at: string | null
          status: string
          submitted_at: string | null
          time_taken_sec: number | null
        }
        Insert: {
          course_id: string
          id?: string
          quiz_id: string
          score_pct?: number | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          time_taken_sec?: number | null
        }
        Update: {
          course_id?: string
          id?: string
          quiz_id?: string
          score_pct?: number | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          time_taken_sec?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          ai_confidence: number | null
          correct_answer: Json | null
          course_id: string
          difficulty: string | null
          explanation: string | null
          id: string
          options: Json | null
          order_index: number | null
          prompt: string
          quiz_id: string
          source_chunk_id: string | null
          topic_id: string | null
          type: string
        }
        Insert: {
          ai_confidence?: number | null
          correct_answer?: Json | null
          course_id: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          order_index?: number | null
          prompt: string
          quiz_id: string
          source_chunk_id?: string | null
          topic_id?: string | null
          type: string
        }
        Update: {
          ai_confidence?: number | null
          correct_answer?: Json | null
          course_id?: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          order_index?: number | null
          prompt?: string
          quiz_id?: string
          source_chunk_id?: string | null
          topic_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_source_chunk_id_fkey"
            columns: ["source_chunk_id"]
            isOneToOne: false
            referencedRelation: "content_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string
          created_at: string
          difficulty: string | null
          generated_from: Json | null
          id: string
          related_id: string | null
          related_type: string | null
          status: string
          time_limit_sec: number | null
          title: string | null
          type: string
        }
        Insert: {
          course_id: string
          created_at?: string
          difficulty?: string | null
          generated_from?: Json | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          time_limit_sec?: number | null
          title?: string | null
          type: string
        }
        Update: {
          course_id?: string
          created_at?: string
          difficulty?: string | null
          generated_from?: Json | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          status?: string
          time_limit_sec?: number | null
          title?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_recommendations: {
        Row: {
          course_id: string
          created_at: string
          dismissed: boolean
          id: string
          priority_rank: number | null
          reason: Json | null
          related_attempt_id: string | null
          related_topic_id: string | null
          resource_id: string
          trigger: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          dismissed?: boolean
          id?: string
          priority_rank?: number | null
          reason?: Json | null
          related_attempt_id?: string | null
          related_topic_id?: string | null
          resource_id: string
          trigger?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          dismissed?: boolean
          id?: string
          priority_rank?: number | null
          reason?: Json | null
          related_attempt_id?: string | null
          related_topic_id?: string | null
          resource_id?: string
          trigger?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_recommendations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_recommendations_related_attempt_id_fkey"
            columns: ["related_attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_recommendations_related_topic_id_fkey"
            columns: ["related_topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_recommendations_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          id: string
          source_location: Json | null
          source_upload_id: string | null
          title: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          id?: string
          source_location?: Json | null
          source_upload_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          id?: string
          source_location?: Json | null
          source_upload_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_source_upload_id_fkey"
            columns: ["source_upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_links: {
        Row: {
          course_id: string
          created_at: string
          id: string
          relation: string | null
          target_id: string
          target_type: string
          topic_id: string
          weight: number | null
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          relation?: string | null
          target_id: string
          target_type: string
          topic_id: string
          weight?: number | null
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          relation?: string | null
          target_id?: string
          target_type?: string
          topic_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_links_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_relationships: {
        Row: {
          course_id: string
          from_topic_id: string
          id: string
          relation: string | null
          to_topic_id: string
        }
        Insert: {
          course_id: string
          from_topic_id: string
          id?: string
          relation?: string | null
          to_topic_id: string
        }
        Update: {
          course_id?: string
          from_topic_id?: string
          id?: string
          relation?: string | null
          to_topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_relationships_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_relationships_from_topic_id_fkey"
            columns: ["from_topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_relationships_to_topic_id_fkey"
            columns: ["to_topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          is_exam_relevant: boolean
          last_reviewed_at: string | null
          mastery_score: number
          name: string
          parent_topic_id: string | null
          slug: string | null
          status: string | null
          times_missed: number
          week_introduced: number | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_exam_relevant?: boolean
          last_reviewed_at?: string | null
          mastery_score?: number
          name: string
          parent_topic_id?: string | null
          slug?: string | null
          status?: string | null
          times_missed?: number
          week_introduced?: number | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_exam_relevant?: boolean
          last_reviewed_at?: string | null
          mastery_score?: number
          name?: string
          parent_topic_id?: string | null
          slug?: string | null
          status?: string | null
          times_missed?: number
          week_introduced?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topics_parent_topic_id_fkey"
            columns: ["parent_topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      transcripts: {
        Row: {
          course_id: string
          created_at: string
          full_text: string | null
          id: string
          language: string | null
          segments: Json | null
          upload_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          full_text?: string | null
          id?: string
          language?: string | null
          segments?: Json | null
          upload_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          full_text?: string | null
          id?: string
          language?: string | null
          segments?: Json | null
          upload_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcripts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transcripts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: true
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      uploads: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          file_type: string | null
          file_url: string
          id: string
          original_name: string | null
          size_bytes: number | null
          status: string
          supersedes_id: string | null
          version: number
          week: number | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          original_name?: string | null
          size_bytes?: number | null
          status?: string
          supersedes_id?: string | null
          version?: number
          week?: number | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          original_name?: string | null
          size_bytes?: number | null
          status?: string
          supersedes_id?: string | null
          version?: number
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "uploads_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uploads_supersedes_id_fkey"
            columns: ["supersedes_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      weaknesses: {
        Row: {
          course_id: string
          detected_at: string
          evidence: Json | null
          id: string
          severity: string | null
          specific_points: Json | null
          status: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          course_id: string
          detected_at?: string
          evidence?: Json | null
          id?: string
          severity?: string | null
          specific_points?: Json | null
          status?: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          detected_at?: string
          evidence?: Json | null
          id?: string
          severity?: string | null
          specific_points?: Json | null
          status?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weaknesses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weaknesses_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
