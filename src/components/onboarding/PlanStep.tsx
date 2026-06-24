"use client";

import type { SubscriptionPlan } from "@/services/onboardingService";

type PlanStepProps = {
  selectedPlan: SubscriptionPlan;
  saving: boolean;
  onChoose: (plan: SubscriptionPlan) => Promise<void>;
};

const plans: {
  id: SubscriptionPlan;
  title: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  badge?: string;
}[] = [
  {
    id: "free",
    title: "Free",
    price: "$0",
    cadence: "forever",
    description: "A focused workspace for getting started.",
    features: ["One starter course", "Basic course organization", "Core study setup"],
    badge: "Default",
  },
  {
    id: "pro",
    title: "Pro",
    price: "$12",
    cadence: "per month",
    description: "More planning power when learning gets serious.",
    features: ["Multiple courses", "AI study planning", "Priority learning tools"],
  },
  {
    id: "campus",
    title: "Campus",
    price: "Custom",
    cadence: "teams",
    description: "Structured learning support for groups.",
    features: ["Shared programs", "Reusable course templates", "Educator support"],
  },
];

export function PlanStep({ selectedPlan, saving, onChoose }: PlanStepProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#526058]">Step 2</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#131714] sm:text-4xl">
            Select your starting plan.
          </h2>
        </div>
        <div className="rounded-md border border-[#dce1d8] bg-[#f7f8f4] px-3 py-2 text-sm text-[#58635d]">
          Free selected
        </div>
      </div>

      <div
        className="mt-8 grid gap-3 lg:grid-cols-3"
        role="group"
        aria-label="Choose a subscription plan"
      >
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <button
              className={`group flex min-h-96 flex-col rounded-lg border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(24,29,25,0.12)] focus:outline-none focus:ring-2 focus:ring-[#171a18] focus:ring-offset-2 ${
                isSelected
                  ? "border-[#171a18] bg-[#f7faf5]"
                  : "border-[#d9ded6] bg-white hover:border-[#aeb8ad]"
              }`}
              key={plan.id}
              type="button"
              aria-pressed={isSelected}
              disabled={saving}
              onClick={() => onChoose(plan.id)}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#526058]">
                  {plan.title}
                </span>
                {plan.badge ? (
                  <span className="rounded-md bg-[#ddf5e5] px-2 py-1 text-xs font-semibold text-[#1e6541]">
                    {plan.badge}
                  </span>
                ) : null}
              </span>

              <span className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-normal text-[#141715]">
                  {plan.price}
                </span>
                <span className="pb-1 text-sm text-[#68736b]">
                  {plan.cadence}
                </span>
              </span>

              <span className="mt-5 block min-h-12 text-sm leading-6 text-[#5e6962]">
                {plan.description}
              </span>

              <span className="mt-8 grid gap-3 text-sm text-[#303732]">
                {plan.features.map((feature) => (
                  <span className="flex items-start gap-2" key={feature}>
                    <span className="mt-2 h-1.5 w-4 rounded-full bg-[#b7f0cb]" />
                    {feature}
                  </span>
                ))}
              </span>

              <span
                className={`mt-auto flex h-11 items-center justify-center rounded-md border text-sm font-semibold transition ${
                  isSelected
                    ? "border-[#171a18] bg-[#171a18] text-white"
                    : "border-[#d9ded6] text-[#303732] group-hover:border-[#171a18]"
                }`}
              >
                {isSelected ? "Selected" : "Choose plan"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
