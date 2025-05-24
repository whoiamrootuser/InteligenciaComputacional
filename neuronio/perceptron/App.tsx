
import React, { useState, useEffect, useCallback } from 'react';
import { Perceptron } from './services/Perceptron';
import { TRAINING_DATA, NUM_INPUT_FEATURES, NUM_OUTPUT_BITS, TARGET_TO_DIGIT_MAP, GRID_ROWS, GRID_COLS } from './constants';
import DigitGrid from './components/DigitGrid';
import Controls from './components/Controls';
import OutputDisplay, { TrainingDataDisplay } from './components/OutputDisplay';

// Perceptron configuration
const LEARNING_RATE = 0.1; 
const EPOCHS = 10000;
const PERCEPTRON_INITIAL_BIAS: number | undefined = undefined;
const PERCEPTRON_ACTIVATION_THRESHOLD = 0.0;

const App: React.FC = () => {
  const [perceptrons, setPerceptrons] = useState<Perceptron[]>([]);
  const [isTrained, setIsTrained] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMessage, setTrainingMessage] = useState<string>('');
  const [gridState, setGridState] = useState<number[]>(new Array(NUM_INPUT_FEATURES).fill(0));
  const [predictedOutput, setPredictedOutput] = useState<number[] | null>(null);
  const [recognizedDigit, setRecognizedDigit] = useState<number | string | null>(null);
  
  // Initialize Perceptrons
  useEffect(() => {
    const newPerceptrons: Perceptron[] = [];
    for (let i = 0; i < NUM_OUTPUT_BITS; i++) {
      newPerceptrons.push(
        new Perceptron(
          NUM_INPUT_FEATURES,
          LEARNING_RATE,
          PERCEPTRON_INITIAL_BIAS,
          PERCEPTRON_ACTIVATION_THRESHOLD
        )
      );
    }
    setPerceptrons(newPerceptrons);
    setTrainingMessage('Perceptrons inicializados. Prontos para treinar.');
  }, []);

  const handleTrain = useCallback(() => {
    if (perceptrons.length === 0) {
      setTrainingMessage('Erro: Perceptrons não inicializados.');
      return;
    }
    
    setIsTraining(true);
    setTrainingMessage('Treinamento em andamento...');
    setIsTrained(false); 
    setPredictedOutput(null);
    setRecognizedDigit(null);

  
    const currentPerceptrons = perceptrons.map(p => {
        const newP = new Perceptron(
            NUM_INPUT_FEATURES, 
            p.learningRate, 
            undefined,      
            p.threshold     
        );
        newP.weights = [...p.weights]; 
        return newP;
    });

    setTimeout(() => {
      let totalEpochsRun = 0;
      let allConverged = false;

      for (let epoch = 0; epoch < EPOCHS; epoch++) {
        totalEpochsRun++;
        let totalErrorsInEpoch = 0;
        
        TRAINING_DATA.forEach(instance => {
          for (let i = 0; i < NUM_OUTPUT_BITS; i++) {
            const currentPrediction = currentPerceptrons[i].predict(instance.input);
            const targetBit = instance.target[i];
            if (currentPrediction !== targetBit) {
              totalErrorsInEpoch++;
            }
            currentPerceptrons[i].train(instance.input, targetBit);
          }
        });

        if (totalErrorsInEpoch === 0) {
          allConverged = true;
          break; 
        }
      }
      
      setPerceptrons(currentPerceptrons); 
      setIsTrained(true);
      setIsTraining(false);

      if (allConverged) {
        setTrainingMessage(`Treinamento concluído. Convergido em ${totalEpochsRun} épocas.`);
      } else {
        setTrainingMessage(`Treinamento concluído após ${totalEpochsRun} épocas. Pode não ter convergido completamente.`);
      }
    }, 100); 
  }, [perceptrons]); 

  const handlePredict = useCallback(() => {
    if (!isTrained || perceptrons.length === 0) {
      setRecognizedDigit('Rede ainda não treinada ou treinamento em andamento.');
      setPredictedOutput(null);
      return;
    }
    if (isTraining) {
      setRecognizedDigit('Por favor, aguarde, treinamento em andamento.');
      setPredictedOutput(null);
      return;
    }

    const output: number[] = [];
    for (let i = 0; i < NUM_OUTPUT_BITS; i++) {
      output.push(perceptrons[i].predict(gridState));
    }
    setPredictedOutput(output);

    const outputKey = output.join(',');
    const digit = TARGET_TO_DIGIT_MAP.get(outputKey);
    setRecognizedDigit(digit !== undefined ? digit : 'Padrao desconhecido');
  }, [isTrained, isTraining, perceptrons, gridState]);

  const handleGridChange = (newGrid: number[]) => {
    setGridState(newGrid);
  };

  const handleClearGrid = () => {
    if(isTraining) return;
    setGridState(new Array(NUM_INPUT_FEATURES).fill(0));
    setPredictedOutput(null);
    setRecognizedDigit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 text-slate-800 flex flex-col items-center p-4 sm:p-8 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 py-2">
          Reconhecedor de Dígitos com Perceptron
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-lg max-w-2xl">
        Desenhe um dígito de 0 a 9 na tabela e clique em "Reconhecer Dígito" para ver o resultado.
        </p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        <section className="bg-white/70 p-5 sm:p-6 rounded-xl shadow-xl border border-slate-300">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-sky-600 text-center">Tabela de Entrada de Dígitos</h2> 
          <DigitGrid
            rows={GRID_ROWS}
            cols={GRID_COLS}
            gridState={gridState}
            onGridChange={handleGridChange}
          />
          <Controls
            onTrain={handleTrain}
            onPredict={handlePredict}
            onClear={handleClearGrid}
            isTrained={isTrained}
            disableTrainButton={perceptrons.length === 0}
            isTraining={isTraining}
          />
        </section>

        <section className="bg-white/70 p-5 sm:p-6 rounded-xl shadow-xl border border-slate-300"> 
          <OutputDisplay
            trainingMessage={trainingMessage}
            predictedOutput={predictedOutput}
            recognizedDigit={recognizedDigit}
            isTrained={isTrained}
          />
          <TrainingDataDisplay />
        </section>
      </main>
      <footer className="mt-10 sm:mt-16 text-center text-slate-600 text-xs sm:text-sm">
        <p>Utilizando {NUM_OUTPUT_BITS} Perceptrons, cada um aprendendo uma saída (T).</p>
        <p>Bias Inicial: {PERCEPTRON_INITIAL_BIAS === undefined ? 'Aleatório' : PERCEPTRON_INITIAL_BIAS}, Limiar: {PERCEPTRON_ACTIVATION_THRESHOLD}</p>
      </footer>
    </div>
  );
};

export default App;