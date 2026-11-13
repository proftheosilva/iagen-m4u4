"use client";

import { Sparkles, ArrowDown, HelpCircle } from "lucide-react";

interface HeroProps {
  unitNumber: string;
  unitTitle: string;
  unitSubtitle: string;
  overview: string;
}

export default function Hero({
  unitNumber,
  unitTitle,
  unitSubtitle,
  overview,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#001645] via-[#002060] to-[#00509D] text-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-300/30 text-cyan-200 text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          Material Didático · Curso de Formação em IA Generativa
        </div>

        <p className="text-cyan-300 font-bold text-sm sm:text-base mb-2">
          {unitNumber}
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          {unitTitle}
        </h1>
        <p className="text-lg sm:text-xl text-cyan-100 font-medium max-w-3xl mb-6">
          {unitSubtitle}
        </p>
        <p className="text-sm sm:text-base text-slate-200/90 max-w-3xl leading-relaxed mb-8 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
          {overview}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#conceitos"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#001645] font-bold text-sm transition shadow-lg shadow-cyan-500/25"
          >
            <ArrowDown className="w-4 h-4" /> Explorar Conteúdo
          </a>
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition"
          >
            <HelpCircle className="w-4 h-4" /> Testar Conhecimentos (Quiz)
          </a>
        </div>
      </div>
    </section>
  );
}
