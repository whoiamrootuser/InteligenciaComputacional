export class Perceptron {
  weights: number[];
  bias: number;
  learningRate: number;
  threshold: number;

  constructor(
    inputSize: number,
    learningRate: number = 0.01,
    threshold: number = 1,
  ) {
    this.threshold = threshold;
    this.weights = Array(inputSize).fill(0);
    this.bias = 0;
    this.learningRate = learningRate;
  }

  activationFunction(x: number): number {
    return x >= this.threshold ? 1 : -1;
  }

  predict(inputs: number[]): number {
    const weightedSum = inputs.reduce(
      (sum, input, index) => sum + input * this.weights[index],
      this.bias,
    );
    return this.activationFunction(weightedSum);
  }

  train(trainingData: Array<{ inputs: number[]; label: number }>): void {
    let epoch = 0;
    let hasError: boolean;
    do {
      hasError = false;
      for (const { inputs, label } of trainingData) {
        const prediction = this.predict(inputs);
        const error = label - prediction;
        if (error !== 0) {
          hasError = true;
        }
        this.weights = this.weights.map(
          (weight, index) => weight + this.learningRate * error * inputs[index],
        );
        this.bias += this.learningRate * error;
        console.log(
          `Epoch ${epoch + 1}, Weights: ${this.weights}, Bias: ${this.bias}`,
        );
        console.log(`Prediction: ${prediction}, Error: ${error}`);
      }
      epoch++;
    } while (hasError);
  }
}
