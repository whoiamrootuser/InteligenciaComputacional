import React from 'react';
import { TRAINING_DATA } from '../constants'; // For TrainingDataDisplay

interface OutputDisplayProps {
  trainingMessage: string;
  predictedOutput: number[] | null;
  recognizedDigit: number | string | null;
  isTrained: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  trainingMessage,
  predictedOutput,
  recognizedDigit,
  isTrained,
}) => {
  let trainingMessageColor = 'text-yellow-600';
  if (
    trainingMessage.toLowerCase().includes('complete') &&
    !trainingMessage.toLowerCase().includes('may not')
  ) {
    trainingMessageColor = 'text-green-600';
  } else if (
    trainingMessage.toLowerCase().includes('error') ||
    trainingMessage.toLowerCase().includes('failed')
  ) {
    trainingMessageColor = 'text-red-600';
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-sky-600">
          Status do treinamento
        </h2>
        <div className="bg-slate-200/70 p-4 rounded-lg min-h-[4rem] flex items-center justify-center shadow-inner">
          <p
            className={`text-center text-sm sm:text-base ${trainingMessageColor}`}
          >
            {trainingMessage || 'Aguardando ação para treinar...'}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3 text-sky-600">Resultado</h2>
        <div className="bg-slate-200/70 p-4 rounded-lg min-h-[8rem] flex flex-col items-center justify-center space-y-2 shadow-inner">
          {predictedOutput && (
            <p className="text-slate-700 text-xs sm:text-sm">
              Padrão de Saída:{' '}
              <span className="font-mono text-sky-600 text-sm sm:text-base">
                [{predictedOutput.join(', ')}]
              </span>
            </p>
          )}
          {recognizedDigit !== null ? (
            <p className="text-3xl sm:text-4xl font-bold">
              {typeof recognizedDigit === 'number' ? (
                <span className="text-green-600">{recognizedDigit}</span>
              ) : (
                <span className="text-yellow-600 text-xl sm:text-2xl">
                  {recognizedDigit}
                </span>
              )}
            </p>
          ) : (
            <p className="text-slate-500 text-sm sm:text-base">
              {isTrained
                ? 'Desenhe um dígito e clique em "Reconhecer Digito"'
                : 'Treine a rede primeiro'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const TrainingDataDisplay: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mt-6 bg-slate-200/50 p-4 rounded-lg shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-150 flex justify-between items-center py-2" // Adjusted text color
      >
        <span>
          Visualizar dados para treinamento ({TRAINING_DATA.length} amostras)
        </span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3 text-xs sm:text-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {TRAINING_DATA.map((item, index) => (
            <div key={index} className="p-3 bg-white/80 rounded-md shadow">
              <p className="font-mono">
                <span className="text-sky-600 font-bold">
                  Rótulo: {item.label}
                </span>
              </p>
              <p className="font-mono text-slate-700 break-all">
                Entrada (X): [{item.input.join(',')}]
              </p>
              <p className="font-mono text-slate-700">
                Target (T): [{item.target.join(',')}]
              </p>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0; /* slate-200 for light theme */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0ea5e9; /* sky-500 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0284c7; /* sky-600 */
        }
      `}</style>
    </div>
  );
};

export default OutputDisplay;
