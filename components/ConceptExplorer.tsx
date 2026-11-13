"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, Briefcase, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ConceptItem } from "@/data/types";

interface ConceptExplorerProps {
  concepts: ConceptItem[];
}

export default function ConceptExplorer({ concepts }: ConceptExplorerProps) {
  const [openId, setOpenId] = useState<string | null>(concepts[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState<"fromZero" | "inPractice" | "attention">("fromZero");

  return (
    <section id="conceitos" className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
          Guia de Estudo Interativo
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002060] mt-1">
          Conteúdo Completo da Unidade
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Clique em qualquer tópico abaixo para expandir a explicação simples, exemplos práticos e pontos de atenção.
        </p>
      </div>

      <div className="space-y-4">
        {concepts.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all ${
                isOpen
                  ? "border-cyan-500 shadow-lg shadow-cyan-500/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => {
                  setOpenId(isOpen ? null : item.id);
                  setActiveTab("fromZero");
                }}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#002060] mb-2">
                    {item.chapter}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{item.summary}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${
                    isOpen ? "rotate-180 text-cyan-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab("fromZero")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeTab === "fromZero"
                          ? "bg-[#002060] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" /> Do Zero (Simples)
                    </button>
                    <button
                      onClick={() => setActiveTab("inPractice")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeTab === "inPractice"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" /> Na Prática
                    </button>
                    <button
                      onClick={() => setActiveTab("attention")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeTab === "attention"
                          ? "bg-amber-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Atenção / Risco
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                    {activeTab === "fromZero" && item.fromZero}
                    {activeTab === "inPractice" && item.inPractice}
                    {activeTab === "attention" && item.attention}
                  </div>

                  <div className="flex items-start gap-2.5 bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 text-sm text-[#002060]">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Ponto-chave para levar: </span>
                      {item.keyTakeaway}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
