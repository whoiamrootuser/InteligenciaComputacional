
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', isLoading = false, children, ...props }) => {
  const baseStyle = "w-full px-6 py-3 rounded-lg font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 shadow-md flex items-center justify-center";
  const variantStyles = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500 disabled:bg-sky-300/70 disabled:text-slate-500 disabled:cursor-not-allowed",
    secondary: "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 disabled:bg-emerald-300/70 disabled:text-slate-500 disabled:cursor-not-allowed",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 disabled:bg-red-300/70 disabled:text-slate-500 disabled:cursor-not-allowed",
  };
  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props} disabled={props.disabled || isLoading}>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}

interface ControlsProps {
  onTrain: () => void;
  onPredict: () => void;
  onClear: () => void;
  isTrained: boolean;
  disableTrainButton: boolean;
  isTraining: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onTrain, onPredict, onClear, isTrained, disableTrainButton, isTraining }) => {
  return (
    <div className="mt-6 space-y-4 flex flex-col">
      <Button onClick={onTrain} disabled={disableTrainButton || isTraining} isLoading={isTraining} variant="primary">
        {isTraining ? 'Treinando...' : (isTrained ? 'Re-treino' : 'Treinar')}
      </Button>
      <Button onClick={onPredict} disabled={!isTrained || isTraining} variant="secondary">
        Reconhecer Dígito
            </Button>
      <Button onClick={onClear} variant="danger" disabled={isTraining}>
       Limpar
      </Button>
    </div>
  );
};

export default Controls;