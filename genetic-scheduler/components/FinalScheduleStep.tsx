import React from 'react';
import { AppData, Chromosome } from '../types';
import Card from './ui/Card';
import ScheduleView from './ScheduleView';
import Button from './ui/Button';
import { ScheduleByPeriod } from './ScheduleByPeriod';

interface FinalScheduleStepProps {
  schedule: Chromosome;
  appData: AppData;
  onReset: () => void;
}

const FinalScheduleStep: React.FC<FinalScheduleStepProps> = ({ schedule, appData, onReset }) => {
  return (
    <Card className="max-w-7xl mx-auto">
      <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">Grade Otimizada</h2>
      <p className="mt-2 text-slate-600">O algoritmo genético produziu o seguinte cronograma livre de conflitos.</p>
      <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
        Pontuação Final de Fitness: {schedule.fitness.toFixed(4)}
      </div>
      </div>

      <div className="mt-8">
      <ScheduleByPeriod chromosome={schedule} appData={appData} />
      </div>

      <div className="mt-8 border-t pt-6 flex justify-center">
      <Button onClick={onReset} variant="secondary">
        Criar Nova Grade
      </Button>
      </div>
    </Card>
  );
};

export default FinalScheduleStep;
