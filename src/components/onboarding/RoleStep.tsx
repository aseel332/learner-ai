"use client";

import type { OnboardingRole } from "@/services/onboardingService";

type RoleStepProps = {
  selectedRole: OnboardingRole;
  saving: boolean;
  onChoose: (role: OnboardingRole) => Promise<void>;
};

const roles: {
  id: OnboardingRole;
  title: string;
  description: string;
  metric: string;
  tint: string;
}[] = [
  {
    id: "student",
    title: "Student",
    description: "Classes, assignments, exams, and weekly study rhythm.",
    metric: "Class mode",
    tint: "bg-[#ddf5e5] text-[#1e6541]",
  },
  {
    id: "self_learner",
    title: "Self learner",
    description: "Independent goals, flexible structure, steady progress.",
    metric: "Path mode",
    tint: "bg-[#e1ecfb] text-[#295f9a]",
  },
  {
    id: "educator",
    title: "Educator",
    description: "Lesson planning, learner support, and reusable material.",
    metric: "Teach mode",
    tint: "bg-[#f2e9cf] text-[#765a1e]",
  },
  {
    id: "professional",
    title: "Professional",
    description: "Career learning, certifications, and focused skill growth.",
    metric: "Career mode",
    tint: "bg-[#f7e4de] text-[#8d4a39]",
  },
];

export function RoleStep({ selectedRole, saving, onChoose }: RoleStepProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#526058]">Step 1</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#131714] sm:text-4xl">
            Choose your learning profile.
          </h2>
        </div>
        <div className="rounded-md border border-[#dce1d8] bg-[#f7f8f4] px-3 py-2 text-sm text-[#58635d]">
          4 profiles
        </div>
      </div>

      <div
        className="mt-8 grid gap-3 sm:grid-cols-2"
        role="group"
        aria-label="Choose your learning profile"
      >
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;

          return (
            <button
              className={`relative min-h-48 overflow-hidden rounded-lg border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(24,29,25,0.12)] focus:outline-none focus:ring-2 focus:ring-[#171a18] focus:ring-offset-2 ${
                isSelected
                  ? "border-[#171a18] bg-[#f7faf5]"
                  : "border-[#d9ded6] bg-white hover:border-[#aeb8ad]"
              }`}
              key={role.id}
              type="button"
              aria-pressed={isSelected}
              disabled={saving}
              onClick={() => onChoose(role.id)}
            >
              <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${role.tint}`}>
                {role.metric}
              </span>
              <span className="mt-7 block text-xl font-semibold text-[#141715]">
                {role.title}
              </span>
              <span className="mt-3 block max-w-xs text-sm leading-6 text-[#5e6962]">
                {role.description}
              </span>
              <span
                className={`absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-md border text-sm font-semibold transition ${
                  isSelected
                    ? "border-[#171a18] bg-[#171a18] text-white"
                    : "border-[#d9ded6] text-[#788078]"
                }`}
              >
                {isSelected ? "OK" : "Go"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
