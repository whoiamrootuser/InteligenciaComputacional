export class Perceptron {
  weights: number[];
  bias: number;
  learningRate: number;
  threshold: number;
  isTraining: boolean;

  constructor(
    inputSize: number,
    learningRate: number = 0.01,
    threshold: number = 1,
  ) {
    this.isTraining = false;
    this.threshold = threshold;
    this.weights = Array(inputSize + 1).fill(0);
    this.bias = 0;
    this.learningRate = learningRate;
  }

  activationFunction(yent: number): number {
    if (this.isTraining)
      return yent > this.threshold ? 1 : yent < -this.threshold ? -1 : 0;
    return yent > this.threshold ? 1 : -1;
  }

  predict(inputs: number[]): number {
    const weightedSum = inputs.reduce(
      (sum, input, index) => sum + input * this.weights[index],
      this.bias,
    );
    return this.activationFunction(weightedSum);
  }

  train(trainingData: Array<{ inputs: number[]; label: number }>): void {
    this.isTraining = true;
    let epoch = 0;
    let hasError: boolean;
    trainingData = trainingData.map((data) => ({
      inputs: [1, ...data.inputs],
      label: data.label,
    }));

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
    this.isTraining = false;
    console.log(`Training completed in ${epoch} epochs.`);
    console.log(`Final Weights: ${this.weights}`);
    console.log(`Final Bias: ${this.bias}`);
  }
}
