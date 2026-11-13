"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ArrowRight, Terminal } from "lucide-react";
import type { SimulatorStep } from "@/data/types";

interface InteractiveSimulatorProps {
  title: string;
  subtitle: string;
  steps: SimulatorStep[];
}

export default function InteractiveSimulator({
  title,
  subtitle,
  steps,
}: InteractiveSimulatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const current = steps[activeIndex];

  return (
    <section id="simulador" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Representação Dinâmica
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002060] mt-1">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (activeIndex === steps.length - 1 && !isPlaying) {
                  setActiveIndex(0);
                }
                setIsPlaying(!isPlaying);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002060] hover:bg-[#003087] text-white font-semibold text-sm transition cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Simular Fluxo
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(0);
              }}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Pipeline Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch mb-8">
          {steps.map((step, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={`w-full h-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isActive
                      ? "border-cyan-500 bg-cyan-50/80 shadow-lg shadow-cyan-500/15 scale-[1.02]"
                      : isPast
                      ? "border-emerald-300 bg-emerald-50/40"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        isActive
                          ? "bg-cyan-500 text-white"
                          : isPast
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500 text-white animate-pulse">
                        Ativo
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    {step.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-snug">
                    {step.shortDesc}
                  </p>
                </button>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Step Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-[#020B2D] text-white rounded-2xl p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              Etapa {activeIndex + 1} de {steps.length} · {current.label}
            </p>
            <h4 className="text-lg font-bold mb-2">O que acontece aqui?</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {current.detail}
            </p>
          </div>
          <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-4 font-mono text-xs text-cyan-200 overflow-x-auto">
            <div className="flex items-center gap-2 text-slate-400 mb-2 pb-2 border-b border-white/10">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Registro do Sistema (Exemplo Didático)</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
              {current.payload}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
