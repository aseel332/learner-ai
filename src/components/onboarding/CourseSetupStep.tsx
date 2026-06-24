"use client";

import { useState } from "react";
import type { FirstCourseData } from "@/services/courseService";

type CourseSetupStepProps = {
  saving: boolean;
  onCreateCourse: (data: FirstCourseData) => Promise<void>;
  onSkip: () => Promise<void>;
};

function nullable(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function CourseSetupStep({
  saving,
  onCreateCourse,
  onSkip,
}: CourseSetupStepProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [term, setTerm] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#526058]">Step 3</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#131714] sm:text-4xl">
            Start with a course, or head home.
          </h2>
        </div>
        <div className="rounded-md border border-[#dce1d8] bg-[#f7f8f4] px-3 py-2 text-sm text-[#58635d]">
          Optional
        </div>
      </div>

      {!isCreating ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            className="group min-h-72 rounded-lg border border-[#171a18] bg-[#f7faf5] p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(24,29,25,0.12)] focus:outline-none focus:ring-2 focus:ring-[#171a18] focus:ring-offset-2"
            type="button"
            onClick={() => setIsCreating(true)}
          >
            <span className="rounded-md bg-[#ddf5e5] px-2.5 py-1 text-xs font-semibold text-[#1e6541]">
              Recommended
            </span>
            <span className="mt-8 block text-2xl font-semibold text-[#141715]">
              Create one course
            </span>
            <span className="mt-3 block text-sm leading-6 text-[#5e6962]">
              One course gives the home screen something useful to organize
              immediately.
            </span>
            <span className="mt-10 flex h-11 items-center justify-center rounded-md bg-[#171a18] text-sm font-semibold text-white transition group-hover:bg-[#2b302c]">
              Add course
            </span>
          </button>

          <button
            className="group min-h-72 rounded-lg border border-[#d9ded6] bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#aeb8ad] hover:shadow-[0_18px_44px_rgba(24,29,25,0.12)] focus:outline-none focus:ring-2 focus:ring-[#171a18] focus:ring-offset-2"
            type="button"
            disabled={saving}
            onClick={onSkip}
          >
            <span className="rounded-md bg-[#eef1ed] px-2.5 py-1 text-xs font-semibold text-[#526058]">
              Fastest
            </span>
            <span className="mt-8 block text-2xl font-semibold text-[#141715]">
              Skip for now
            </span>
            <span className="mt-3 block text-sm leading-6 text-[#5e6962]">
              Finish setup and create courses once you are inside the app.
            </span>
            <span className="mt-10 flex h-11 items-center justify-center rounded-md border border-[#d9ded6] text-sm font-semibold text-[#303732] transition group-hover:border-[#171a18]">
              {saving ? "Finishing..." : "Go home"}
            </span>
          </button>
        </div>
      ) : (
        <form
          className="onboarding-page mt-8 space-y-6 rounded-lg border border-[#d9ded6] bg-[#fbfcf8] p-5"
          onSubmit={async (event) => {
            event.preventDefault();
            await onCreateCourse({
              name: name.trim(),
              subject: nullable(subject),
              term: nullable(term),
            });
          }}
        >
          <div className="grid gap-5">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[#303732]">
                Course name
              </span>
              <input
                className="h-12 w-full rounded-md border border-[#cfd5ce] bg-white px-3 outline-none transition focus:border-[#171a18] focus:ring-2 focus:ring-[#171a18]/10"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Biology 101"
                required
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#303732]">
                  Subject
                </span>
                <input
                  className="h-12 w-full rounded-md border border-[#cfd5ce] bg-white px-3 outline-none transition focus:border-[#171a18] focus:ring-2 focus:ring-[#171a18]/10"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Science"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#303732]">
                  Term
                </span>
                <input
                  className="h-12 w-full rounded-md border border-[#cfd5ce] bg-white px-3 outline-none transition focus:border-[#171a18] focus:ring-2 focus:ring-[#171a18]/10"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Fall 2026"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="h-11 rounded-md bg-[#171a18] px-5 font-semibold text-white transition hover:bg-[#2b302c] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving}
              type="submit"
            >
              {saving ? "Creating..." : "Create and finish"}
            </button>
            <button
              className="h-11 rounded-md border border-[#d5d9d2] px-4 font-semibold text-[#3e4640] transition hover:border-[#b8c0b6] hover:bg-white"
              type="button"
              disabled={saving}
              onClick={() => setIsCreating(false)}
            >
              Back to choices
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
