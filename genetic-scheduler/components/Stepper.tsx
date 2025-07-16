import React from 'react';
import { AppStep } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface StepperProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.Input, name: '1. Configurar Entradas' },
  { id: AppStep.Algorithm, name: '2. Executar Algoritmo' },
  { id: AppStep.Result, name: '3. Ver Agenda' },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="flex justify-center">
      <ol role="list" className="flex items-center">
      {steps.map((step, stepIdx) => (
        <li key={step.name} className={`relative flex flex-col items-center ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
        {currentStep > step.id ? (
          <>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-sky-600" />
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center bg-sky-600 rounded-full">
            <CheckIcon className="w-5 h-5 text-white" />
          </div>
          <span className="mt-3 w-max text-xs font-semibold text-sky-600 text-center">{step.name}</span>
          </>
        ) : currentStep === step.id ? (
          <>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-slate-200" />
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-sky-600 rounded-full">
            <span className="h-2.5 w-2.5 bg-sky-600 rounded-full" />
          </div>
          <span className="mt-3 w-max text-xs font-semibold text-sky-600 text-center">{step.name}</span>
          </>
        ) : (
          <>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-slate-200" />
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-300 rounded-full" />
          <span className="mt-3 w-max text-xs font-medium text-slate-500 text-center">{step.name}</span>
          </>
        )}

        {stepIdx !== steps.length - 1 && (
          <div className="hidden sm:block absolute top-1/2 -right-4 -translate-y-1/2 transform">
            <ChevronRightIcon className="h-5 w-5 text-slate-300" />
          </div>
        )}
        </li>
      ))}
      </ol>
    </nav>
  );
};

export default Stepper;
