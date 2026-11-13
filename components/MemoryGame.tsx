"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Trophy, Sparkles } from "lucide-react";
import type { MemoryPair } from "@/data/types";

interface MemoryGameProps {
  pairs: MemoryPair[];
}

interface CardItem {
  uid: string;
  pairId: string;
  text: string;
  kind: "term" | "definition";
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MemoryGame({ pairs }: MemoryGameProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    pairs.forEach((p) => {
      deck.push({ uid: `${p.id}-t`, pairId: p.id, text: p.term, kind: "term" });
      deck.push({
        uid: `${p.id}-d`,
        pairId: p.id,
        text: p.definition,
        kind: "definition",
      });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  const handleFlip = (idx: number) => {
    if (locked) return;
    if (flipped.includes(idx)) return;
    if (matched.includes(cards[idx].pairId)) return;

    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      if (cards[a].pairId === cards[b].pairId) {
        setMatched((prev) => [...prev, cards[a].pairId]);
        setFlipped([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const allMatched = pairs.length > 0 && matched.length === pairs.length;

  return (
    <section id="memoria" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-[#020B2D] to-[#002060] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Desafio de Fixação
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Jogo da Memória
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Combine cada conceito com sua definição correta.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 text-xs font-bold">
              Jogadas: <span className="text-cyan-300">{moves}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/10 text-xs font-bold">
              Pares:{" "}
              <span className="text-emerald-300">
                {matched.length}/{pairs.length}
              </span>
            </div>
            <button
              onClick={initGame}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#001645] transition cursor-pointer"
              title="Reiniciar jogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {allMatched && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-amber-300 shrink-0" />
              <div>
                <p className="font-bold text-white">
                  Parabéns! Você completou todos os pares!
                </p>
                <p className="text-xs text-emerald-200">
                  Total de jogadas realizadas: {moves}
                </p>
              </div>
            </div>
            <button
              onClick={initGame}
              className="px-4 py-2 rounded-xl bg-emerald-400 text-[#001645] font-bold text-xs cursor-pointer"
            >
              Jogar de Novo
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card, idx) => {
            const isFlipped =
              flipped.includes(idx) || matched.includes(card.pairId);
            const isMatched = matched.includes(card.pairId);

            return (
              <button
                key={card.uid}
                onClick={() => handleFlip(idx)}
                className={`min-h-[115px] p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isMatched
                    ? "bg-emerald-500/20 border-emerald-400 text-white"
                    : isFlipped
                    ? "bg-white text-slate-900 border-cyan-400 shadow-lg"
                    : "bg-white/10 hover:bg-white/15 border-white/15 text-cyan-200"
                }`}
              >
                {isFlipped ? (
                  <>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        isMatched
                          ? "text-emerald-300"
                          : card.kind === "term"
                          ? "text-cyan-600"
                          : "text-amber-600"
                      }`}
                    >
                      {card.kind === "term" ? "Conceito" : "Definição"}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold leading-snug">
                      {card.text}
                    </span>
                  </>
                ) : (
                  <Sparkles className="w-6 h-6 opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
