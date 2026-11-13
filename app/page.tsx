import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveSimulator from "@/components/InteractiveSimulator";
import ConceptExplorer from "@/components/ConceptExplorer";
import QuizSection from "@/components/QuizSection";
import MemoryGame from "@/components/MemoryGame";
import Footer from "@/components/Footer";
import { unitData } from "@/data/unitData";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar unitNumber={unitData.unitNumber} unitTitle={unitData.unitTitle} />
      <main className="flex-1">
        <Hero
          unitNumber={unitData.unitNumber}
          unitTitle={unitData.unitTitle}
          unitSubtitle={unitData.unitSubtitle}
          overview={unitData.overview}
        />
        <InteractiveSimulator
          title={unitData.simulatorTitle}
          subtitle={unitData.simulatorSubtitle}
          steps={unitData.simulatorSteps}
        />
        <ConceptExplorer concepts={unitData.concepts} />
        <QuizSection questions={unitData.quiz} />
        <MemoryGame pairs={unitData.memoryPairs} />
      </main>
      <Footer />
    </div>
  );
}
