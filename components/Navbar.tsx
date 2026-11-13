"use client";

import { Cpu, BookOpen, PlayCircle, HelpCircle, Brain } from "lucide-react";

interface NavbarProps {
  unitNumber: string;
  unitTitle: string;
}

export default function Navbar({ unitNumber, unitTitle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#020B2D]/90 border-b border-cyan-500/20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="truncate">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              {unitNumber}
            </p>
            <p className="text-sm font-bold truncate">{unitTitle}</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <a
            href="#simulador"
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5"
          >
            <PlayCircle className="w-4 h-4" /> Simulador
          </a>
          <a
            href="#conceitos"
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" /> Conteúdo
          </a>
          <a
            href="#quiz"
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" /> Quiz (10)
          </a>
          <a
            href="#memoria"
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5"
          >
            <Brain className="w-4 h-4" /> Jogo da Memória
          </a>
        </nav>
      </div>
    </header>
  );
}
