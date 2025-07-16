import React, { useState, useCallback } from 'react';
import { AppStep, AppData, Chromosome } from './types';
import Stepper from './components/Stepper';
import InputStep from './components/InputStep';
import AlgorithmStep from './components/AlgorithmStep';
import FinalScheduleStep from './components/FinalScheduleStep';
import { DnaIcon } from './components/icons/DnaIcon';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Input);
  const [appData, setAppData] = useState<AppData | null>(null);
  const [finalSchedule, setFinalSchedule] = useState<Chromosome | null>(null);

  const handleInputSubmit = useCallback((data: AppData) => {
    setAppData(data);
    setStep(AppStep.Algorithm);
  }, []);

  const handleAlgorithmComplete = useCallback((bestSchedule: Chromosome) => {
    setFinalSchedule(bestSchedule);
    setStep(AppStep.Result);
  }, []);
  
  const handleReset = () => {
    setStep(AppStep.Input);
    setAppData(null);
    setFinalSchedule(null);
  }

  const renderStep = () => {
    switch (step) {
      case AppStep.Input:
        return <InputStep onSubmit={handleInputSubmit} />;
      case AppStep.Algorithm:
        if (!appData) return null;
        return <AlgorithmStep appData={appData} onComplete={handleAlgorithmComplete} />;
      case AppStep.Result:
        if (!finalSchedule || !appData) return null;
        return <FinalScheduleStep schedule={finalSchedule} appData={appData} onReset={handleReset} />;
      default:
        return <InputStep onSubmit={handleInputSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-6xl mb-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <DnaIcon className="w-10 h-10 text-sky-500" />
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
            Algoritmo Genético
          </h1>
        </div>
        <p className="mt-2 text-slate-600">Otimização de Horários com Computação Evolutiva</p>
      </header>
      
      <main className="w-full max-w-6xl">
        <Stepper currentStep={step} />
        <div className="mt-8">
          {renderStep()}
        </div>
      </main>
    </div>
  );
};

export default App;
