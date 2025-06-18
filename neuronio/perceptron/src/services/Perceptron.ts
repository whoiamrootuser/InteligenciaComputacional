import type { InputVector, TargetOutput } from '../types';

export class Perceptron {
  weights: number[];
  learningRate: number;
  threshold: number;
  isTraining: boolean = false;

  constructor(
    inputSize: number,
    learningRate: number = 1,
    initialBias?: number,
    threshold: number = 0.0,
  ) {
    this.learningRate = learningRate;
    this.threshold = threshold;
    this.weights = new Array(inputSize + 1).fill(0);

    if (initialBias !== undefined) {
      this.weights[0] = initialBias;
    } else {
      this.weights[0] = Math.random() * 0.2 - 0.1;
    }

    for (let i = 1; i <= inputSize; i++) {
      this.weights[i] = Math.random() * 0.2 - 0.1;
    }
  }

  activationFunction(yent: number): number {
    if (this.isTraining)
      return yent > this.threshold ? 1 : yent < -this.threshold ? -1 : 0;
    return yent > this.threshold ? 1 : -1;
  }

  predict(inputs: InputVector): TargetOutput {
    const inputsWithBias = [1, ...inputs];

    if (inputsWithBias.length !== this.weights.length) {
      console.error(
        'Input vector:',
        inputs,
        'Inputs with bias:',
        inputsWithBias,
        'Weights:',
        this.weights,
      );
      throw new Error(
        `Input vector size mismatch. Expected ${
          this.weights.length - 1
        } features, got ${inputs.length}.`,
      );
    }

    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputsWithBias[i] * this.weights[i];
    }
    return this.activationFunction(sum);
  }

  train(inputs: InputVector, target: TargetOutput): void {
    this.isTraining = true;
    const prediction = this.predict(inputs);
    const error = target - prediction;

    const inputsWithBias = [1, ...inputs];

    if (error !== 0) {
      for (let i = 0; i < this.weights.length; i++) {
        // Regra de aprendizado do Perceptron: w_novo = w_antigo + taxa_aprendizado * erro * input_i
        // O erro é (target - prediction). Para bipolar, isso é -2, 0 ou 2.
        // O *0.5 efetivamente normaliza a parte do erro da atualização para -1, 0 ou 1.
        this.weights[i] += this.learningRate * error * inputsWithBias[i] * 0.5;
      }
    }
    this.isTraining = false;
  }
}
