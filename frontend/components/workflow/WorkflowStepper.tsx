"use client";

import { motion } from "framer-motion";
import {
  UploadCloud,
  Table2,
  Sparkles,
  CircleCheckBig,
} from "lucide-react";

interface WorkflowStepperProps {
  currentStep: number;
}

const steps = [
  {
    title: "Upload",
    subtitle: "Select CSV",
    icon: UploadCloud,
  },
  {
    title: "Preview",
    subtitle: "Review Data",
    icon: Table2,
  },
  {
    title: "AI Process",
    subtitle: "Extract Fields",
    icon: Sparkles,
  },
  {
    title: "Results",
    subtitle: "Import Complete",
    icon: CircleCheckBig,
  },
];

export default function WorkflowStepper({
  currentStep,
}: WorkflowStepperProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index + 1 < currentStep;
          const active = index + 1 === currentStep;

          return (
            <div
              key={step.title}
              className="flex flex-1 items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  animate={
                    active
                      ? {
                          scale: [1, 1.08, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.6,
                    repeat: active ? Infinity : 0,
                  }}
                  className={`
                    flex h-16 w-16 items-center justify-center rounded-full
                    transition-all duration-300

                    ${
                      completed
                        ? "bg-green-500 text-white"
                        : active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-300"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  <Icon size={28} />
                </motion.div>

                <h3
                  className={`mt-4 text-lg font-semibold ${
                    active
                      ? "text-blue-600"
                      : "text-slate-800"
                  }`}
                >
                  {step.title}
                </h3>

                <p className="mt-1 text-center text-sm text-slate-500">
                  {step.subtitle}
                </p>
              </motion.div>

              {index !== steps.length - 1 && (
                <div className="mx-4 hidden flex-1 md:block">
                  <div className="h-1 rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          completed
                            ? "100%"
                            : "0%",
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="h-full rounded-full bg-green-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}