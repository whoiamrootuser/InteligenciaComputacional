import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AppData, Chromosome, Gene } from "../types";
import Button from "./ui/Button";
import Card from "./ui/Card";

interface AlgorithmStepProps {
  appData: AppData;
  onComplete: (bestSchedule: Chromosome) => void;
}

// --- CONFIGURATION ---
const POPULATION_SIZE = 100;
const MAX_GENERATIONS = 50;
const MUTATION_RATE = 0.005;
const TOURNAMENT_SIZE = 5;
const DAYS = 5; // Seg-Sex
const HOURS_PER_DAY = 4; // 19h - 23h
const START_HOUR = 19;

// --- GA HELPER FUNCTIONS ---

const createInitialPopulation = (appData: AppData): Chromosome[] => {
  const population: Chromosome[] = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const genes: Gene[] = [];
    appData.disciplines.forEach((discipline) => {
      // Ensure the discipline has a teacher assigned before creating genes
      if (discipline.teacherId !== null) {
        for (let h = 0; h < discipline.hoursPerWeek; h++) {
          genes.push({
            disciplineId: discipline.id,
            teacherId: discipline.teacherId, // Use the pre-assigned teacher
            day: Math.floor(Math.random() * DAYS),
            hour: START_HOUR + Math.floor(Math.random() * HOURS_PER_DAY),
          });
        }
      }
    });
    population.push({ genes, fitness: 0 });
  }
  return population;
};

const calculateFitness = (chromosome: Chromosome): number => {
  let conflicts = 0;
  const scheduleSlots = new Map<string, number>(); // key: "day-hour-teacher" or "day-hour"

  for (const gene of chromosome.genes) {
    const teacherSlot = `${gene.day}-${gene.hour}-${gene.teacherId}`;
    const classSlot = `${gene.day}-${gene.hour}`;

    if (scheduleSlots.has(teacherSlot)) conflicts++;
    else scheduleSlots.set(teacherSlot, 1);

    if (scheduleSlots.has(classSlot)) conflicts++;
    else scheduleSlots.set(classSlot, 1);
  }
  // Fitness is higher for fewer conflicts. Using inverse score.
  return 1 / (1 + conflicts);
};

const selection = (population: Chromosome[]): Chromosome => {
  let best: Chromosome | null = null;
  for (let i = 0; i < TOURNAMENT_SIZE; i++) {
    const randomIndividual =
      population[Math.floor(Math.random() * population.length)];
    if (best === null || randomIndividual.fitness > best.fitness) {
      best = randomIndividual;
    }
  }
  return best!;
};

const crossover = (parent1: Chromosome, parent2: Chromosome): Chromosome => {
  const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
  const childGenes = [
    ...parent1.genes.slice(0, crossoverPoint),
    ...parent2.genes.slice(crossoverPoint),
  ];
  return { genes: childGenes, fitness: 0 };
};

const mutate = (chromosome: Chromosome, appData: AppData): Chromosome => {
  const mutatedGenes = chromosome.genes.map((gene) => {
    if (Math.random() < MUTATION_RATE) {
      // Mutate only the time slot, not the teacher or discipline
      return {
        ...gene,
        day: Math.floor(Math.random() * DAYS),
        hour: START_HOUR + Math.floor(Math.random() * HOURS_PER_DAY),
      };
    }
    return gene;
  });
  return { genes: mutatedGenes, fitness: 0 };
};

const AlgorithmStep: React.FC<AlgorithmStepProps> = ({
  appData,
  onComplete,
}) => {
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState<Chromosome[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [highlightedStep, setHighlightedStep] = useState("");

  const bestChromosome = useMemo(() => {
    if (population.length === 0) return null;
    return population.reduce(
      (best, current) => (current.fitness > best.fitness ? current : best),
      population[0]
    );
  }, [population]);

  const evolve = useCallback(() => {
    setPopulation((currentPopulation) => {
      // Step 1: Fitness Evaluation
      setHighlightedStep("fitness-evaluation");
      const evaluatedPopulation = currentPopulation.map((c) => ({
        ...c,
        fitness: calculateFitness(c),
      }));

      // Step 2: Ordering (sort by fitness descending)
      setHighlightedStep("ordering");
      const orderedPopulation = [...evaluatedPopulation].sort(
        (a, b) => b.fitness - a.fitness
      );

      const newPopulation: Chromosome[] = [];

      // Elitism: Keep the best individual from the current generation (already at index 0 after ordering)
      const bestOfGeneration = orderedPopulation[0];
      newPopulation.push(bestOfGeneration);

      while (newPopulation.length < POPULATION_SIZE) {
        // Step 3: Selection (now using ordered population)
        setHighlightedStep("selection");
        const parent1 = selection(orderedPopulation);
        const parent2 = selection(orderedPopulation);

        // Step 4: Crossover
        setHighlightedStep("crossover");
        let child = crossover(parent1, parent2);

        // Step 5: Mutation
        setHighlightedStep("mutation");
        child = mutate(child, appData);

        newPopulation.push(child);
      }

      return newPopulation;
    });
    setGeneration((g) => g + 1);
  }, [appData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isRunning) {
      if (
        generation >= MAX_GENERATIONS ||
        (bestChromosome && bestChromosome.fitness === 1)
      ) {
        setIsRunning(false);
        if (bestChromosome) onComplete(bestChromosome);
        return;
      }

      const timer = setTimeout(() => {
        evolve();
      }, 100); // Delay for visualization

      return () => clearTimeout(timer);
    }
  }, [isRunning, generation, evolve, onComplete, bestChromosome]);

  const handleStart = () => {
    setHighlightedStep("initial-population");
    setGeneration(0);
    const initialPop = createInitialPopulation(appData);
    setPopulation(initialPop);
    setIsRunning(true);
  };

  const renderGaStep = (key: string, title: string, description: string) => (
    <div
      className={`p-4 rounded-lg transition-all duration-300 ${
        highlightedStep === key && isRunning
          ? "bg-sky-100 ring-2 ring-sky-400"
          : "bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-700">{title}</h4>
      </div>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  );

  return (
    <div>
      <Card className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Algoritmo em Execução
        </h2>
        <p className="text-slate-600 mb-6">
          Veja o algoritmo genético evoluir uma solução. Pressione Iniciar para
          começar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-inner border border-slate-200 text-center">
            <div className="text-sm text-slate-500">Geração</div>
            <div className="text-3xl font-bold text-sky-600">{generation}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-inner border border-slate-200 text-center">
            <div className="text-sm text-slate-500">Tamanho da populaç</div>
            <div className="text-3xl font-bold text-sky-600">
              {POPULATION_SIZE}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-inner border border-slate-200 text-center">
            <div className="text-sm text-slate-500">
              Melhor Avaliação (1 é perfeito)
            </div>
            <div className="text-3xl font-bold text-sky-600">
              {bestChromosome ? bestChromosome.fitness.toFixed(4) : "N/A"}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {renderGaStep(
            "initial-population",
            "1. População Inicial",
            "Criando um conjunto de cronogramas válidos aleatórios."
          )}
          {renderGaStep(
            "fitness-evaluation",
            "2. Avaliação de Fitness",
            "Pontuando cada cronograma com base em conflitos."
          )}
          {renderGaStep(
            "ordering",
            "3. Ordenação",
            "Organizando a população por fitness (melhor para pior)."
          )}
          {renderGaStep(
            "selection",
            "4. Seleção",
            'Escolhendo os cronogramas mais "aptos" como pais.'
          )}
          {renderGaStep(
            "crossover",
            "5. Cruzamento",
            "Combinando dois cronogramas pais para criar descendentes."
          )}
          {renderGaStep(
            "mutation",
            "6. Mutação",
            "Introduzindo pequenas mudanças aleatórias para manter a diversidade."
          )}
        </div>

        <div className="mt-8 border-t pt-6 flex justify-center">
          {isRunning ? (
            <Button variant="secondary" onClick={() => setIsRunning(false)}>
              Pausar Algoritmo
            </Button>
          ) : (
            <Button
              onClick={handleStart}
              disabled={generation > 0 && bestChromosome?.fitness !== 1}
            >
              {generation === 0 ? "Iniciar Algoritmo" : "Retomar Algoritmo"}
            </Button>
          )}
        </div>
        {bestChromosome?.fitness === 1 && !isRunning && generation > 0 && (
          <div className="text-center mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-semibold">
              Solução ótima encontrada! Prosseguindo para o cronograma final.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AlgorithmStep;
