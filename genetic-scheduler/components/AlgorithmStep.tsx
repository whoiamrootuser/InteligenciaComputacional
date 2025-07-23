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
const HOURS_PER_DAY = 4;

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
            teacherId: discipline.teacherId,
            period: discipline.period
          });
        }
      }
    });
    const shuffledGenes = genes
      .sort(() => Math.random() - 0.5).sort((a, b) => a.period - b.period);
    const genesIndexed: string[] = shuffledGenes.map(gene =>
      `${gene.period}-${gene.teacherId}-${gene.disciplineId}`
    );
    population.push({ genes: genesIndexed, fitness: 0 });
  }

  return population;
};

const calculateFitness = (chromosome: string[]): number => {
  let conflicts = 0;
  const teacherSlots = new Map<string, Set<number>>();

  for (let i = 0; i < chromosome.length; i++) {
    const gene = chromosome[i];
    const [_period, teacherId, _disciplineId] = gene.split('-');
    const day = Math.floor(i / HOURS_PER_DAY) % DAYS;
    const hour = i % HOURS_PER_DAY;

    const slotKey = `${day}-${hour}`;
    if (!teacherSlots.has(slotKey)) {
      teacherSlots.set(slotKey, new Set());
    }

    const teachersInSlot = teacherSlots.get(slotKey)!;
    if (teachersInSlot.has(Number(teacherId))) {
      conflicts++;
    } else {
      teachersInSlot.add(Number(teacherId));
    }
  }
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
  const childGenes: string[] = [];

  for (let i = 0; i < parent1.genes.length; i += 20) {
    const sliceStart = i;
    const sliceEnd = i + 20;

    // Perform crossover for each 20-position segment
    const parent1Segment = parent1.genes.slice(sliceStart, sliceEnd);
    const parent2Segment = parent2.genes.slice(sliceStart, sliceEnd);

    const crossoverPoint = Math.floor(Math.random() * (sliceEnd - sliceStart)) + sliceStart;

    const childSegment = [
      ...parent1Segment.slice(0, crossoverPoint),
      ...parent2Segment.slice(crossoverPoint),
    ];

    childGenes.push(...childSegment);
  }

  return { genes: childGenes, fitness: 0 };
};

const mutate = (chromosome: Chromosome): Chromosome => {
  if (Math.random() < MUTATION_RATE) return chromosome;
  const mutatedGenes = [...chromosome.genes];
  for (let i = 0; i < mutatedGenes.length; i += 20) {
    const segment = mutatedGenes.slice(i, i + 20);

    for (let j = segment.length - 1; j > 0; j--) {
      const randomIndex = Math.floor(Math.random() * (j + 1));
      [segment[j], segment[randomIndex]] = [segment[randomIndex], segment[j]];
    }
    mutatedGenes.splice(i, segment.length, ...segment);
  }
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

  console.log(`Best Chromosome: ${bestChromosome ? bestChromosome.genes.join(', ') : 'N/A'}`);

  const evolve = useCallback(() => {
    setPopulation((currentPopulation) => {
      // Step 1: Fitness Evaluation
      setHighlightedStep('fitness-evaluation');
      const evaluatedPopulation = currentPopulation.map(c => ({ ...c, fitness: calculateFitness(c.genes) }));
      console.log(`Generation ${generation + 1} - Best Fitness: ${Math.max(...evaluatedPopulation.map(c => c.fitness))}`);
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

        // Step 4: Mutation
        setHighlightedStep('mutation');
        child = mutate(child);

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
      className={`p-4 rounded-lg transition-all duration-300 ${highlightedStep === key && isRunning
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

            <div className="text-sm text-slate-500">Tamanho da população</div>
            <div className="text-3xl font-bold text-sky-600">{POPULATION_SIZE}</div>
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
