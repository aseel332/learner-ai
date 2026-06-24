"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { OnboardingStep } from "@/hooks/useOnboarding";

type OnboardingLayoutProps = {
  currentStep: OnboardingStep;
  userEmail: string;
  error: string | null;
  loading?: boolean;
  children: ReactNode;
};

const steps: { id: OnboardingStep; label: string; href: string }[] = [
  { id: "role", label: "Identity", href: "/onboarding/role" },
  { id: "plan", label: "Access", href: "/onboarding/plan" },
  { id: "course", label: "Start", href: "/onboarding/course" },
];

const stepCopy: Record<OnboardingStep, { eyebrow: string; title: string }> = {
  role: {
    eyebrow: "Personalize the first run",
    title: "A focused setup that opens the right door.",
  },
  plan: {
    eyebrow: "Choose access",
    title: "Start free, upgrade only when the workflow earns it.",
  },
  course: {
    eyebrow: "Create momentum",
    title: "Enter the app now or begin with one useful course.",
  },
};

export function OnboardingLayout({
  currentStep,
  userEmail,
  error,
  loading = false,
  children,
}: OnboardingLayoutProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f5ef] text-[#141715]">
      <div className="absolute inset-0 onboarding-grid" aria-hidden="true" />
      <div className="absolute left-0 top-0 h-full w-1/2 onboarding-wash" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[25rem_minmax(0,1fr)] lg:px-8">
        <aside className="flex min-h-[20rem] flex-col justify-between rounded-lg border border-[#d8dcd4] bg-[#151916] p-5 text-white shadow-[0_24px_80px_rgba(20,23,21,0.16)] lg:min-h-[calc(100vh-2rem)] lg:p-6">
          <div>
            <div className="flex items-center justify-between gap-3">
              <Link
                className="text-sm font-semibold tracking-normal text-white"
                href="/"
              >
                Learner AI
              </Link>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                Demo
              </span>
            </div>

            <div className="mt-12">
              <p className="text-sm font-medium text-[#9db7a8]">
                {stepCopy[currentStep].eyebrow}
              </p>
              <h1 className="mt-4 max-w-sm text-4xl font-semibold leading-tight tracking-normal text-white">
                {stepCopy[currentStep].title}
              </h1>
            </div>

            <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="onboarding-visual" aria-hidden="true">
                <span className="visual-card visual-card-one" />
                <span className="visual-card visual-card-two" />
                <span className="visual-card visual-card-three" />
                <span className="visual-line visual-line-one" />
                <span className="visual-line visual-line-two" />
              </div>
            </div>
          </div>

          <div>
            <nav aria-label="Onboarding progress">
              <ol className="space-y-2">
                {steps.map((step, index) => {
                  const isCurrent = step.id === currentStep;
                  const isComplete = index < currentIndex;
                  const canVisit = index <= currentIndex;

                  const content = (
                    <>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-md border text-sm font-semibold transition ${
                          isCurrent
                            ? "border-[#b7f0cb] bg-[#b7f0cb] text-[#101411]"
                            : isComplete
                              ? "border-white/20 bg-white/10 text-white"
                              : "border-white/10 bg-transparent text-white/45"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{step.label}</span>
                    </>
                  );

                  return (
                    <li key={step.id}>
                      {canVisit ? (
                        <Link
                          className={`flex h-12 items-center gap-3 rounded-md px-2 transition ${
                            isCurrent
                              ? "bg-white/[0.08] text-white"
                              : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                          }`}
                          href={step.href}
                          aria-current={isCurrent ? "step" : undefined}
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex h-12 items-center gap-3 rounded-md px-2 text-white/35">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-white/55">
              Signed in as <span className="text-white/80">{userEmail}</span>
            </div>
          </div>
        </aside>

        <section className="flex min-h-[calc(100vh-2rem)] items-center justify-center py-8">
          <div className="w-full max-w-3xl">
            {error ? (
              <div
                className="mb-4 rounded-md border border-[#d89475] bg-[#fff4ed] px-4 py-3 text-sm text-[#793a21]"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <div
              className={`onboarding-page rounded-lg border border-[#d7dbd4] bg-white/90 p-5 shadow-[0_26px_90px_rgba(32,37,33,0.10)] backdrop-blur sm:p-8 ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
