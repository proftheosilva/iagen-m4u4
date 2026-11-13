"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import type { QuizQuestion } from "@/data/types";

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section id="quiz" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Avaliação Interativa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002060]">
              Quiz de Fixação ({questions.length} Perguntas)
            </h2>
          </div>
          {!finished && (
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {currentIdx + 1} / {questions.length}
            </span>
          )}
        </div>

        {finished ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Quiz Concluído!
            </h3>
            <p className="text-slate-600 mb-6">
              Você acertou{" "}
              <span className="font-extrabold text-[#002060] text-xl">
                {score} de {questions.length}
              </span>{" "}
              perguntas ({Math.round((score / questions.length) * 100)}%).
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#002060] hover:bg-[#003087] text-white font-bold text-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Refazer Quiz
            </button>
          </div>
        ) : (
          <div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                style={{
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
              {q.id}. {q.question}
            </h3>

            <div className="space-y-3 mb-6">
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === q.correctIndex;
                let style =
                  "border-slate-200 bg-slate-50 hover:border-cyan-400 text-slate-800";
                if (selected !== null) {
                  if (isCorrect) {
                    style =
                      "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                  } else if (isSelected) {
                    style = "border-red-400 bg-red-50 text-red-900";
                  } else {
                    style = "border-slate-200 bg-slate-50 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center justify-between gap-3 cursor-pointer ${style}`}
                  >
                    <span className="text-sm sm:text-base">{opt}</span>
                    {selected !== null && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {selected !== null && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-slate-700">
                <span className="font-bold text-[#002060]">Explicação: </span>
                {q.explanation}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={selected === null}
                className="px-6 py-2.5 rounded-xl bg-[#002060] hover:bg-[#003087] disabled:opacity-40 text-white font-bold text-sm transition cursor-pointer"
              >
                {currentIdx + 1 === questions.length
                  ? "Ver Resultado"
                  : "Próxima Pergunta"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
