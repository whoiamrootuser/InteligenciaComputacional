type DataPoint = {
  input: number[];
  label: number[];
};

function sign(x: number, threshold: number): number {
  return x >= threshold ? 1 : -1;
}

function trainPerceptron(
  data: DataPoint[],
  inputSize: number,
  outputSize: number,
  learningRate: number,
  bias: number,
  threshold: number, // kept for compatibility, but not used
): number[][] {
  let weights: number[][] = Array.from({ length: outputSize }, () =>
    Array(inputSize).fill(0),
  );
  let biases: number[] = Array(outputSize).fill(bias);

  let hasError = true;
  while (hasError) {
    hasError = false;
    for (const { input, label } of data) {
      for (let o = 0; o < outputSize; o++) {
        const weightedSum =
          input.reduce((sum, x, i) => sum + x * weights[o][i], 0) + biases[o];
        const prediction = sign(weightedSum, threshold);

        const error = label[o] - prediction;
        if (error !== 0) {
          hasError = true;
          for (let i = 0; i < inputSize; i++) {
            weights[o][i] += learningRate * error * input[i];
          }
          biases[o] += learningRate * error;
        }
      }
    }
  }
  return weights;
}

// Usage
const numbersRecognitionData = [
  {
    input: [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    label: [-1, -1, -1, -1, 1],
  },
  {
    input: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    label: [-1, -1, -1, 1, 1],
  },
  {
    input: [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    label: [-1, -1, 1, 1, 1],
  },
  //   {
  //     input: [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  //     label: [-1, 1, 1, 1, -1],
  //   },
  //   {
  //     input: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1],
  //     label: [1, 1, 1, -1, -1],
  //   },
  //   {
  //     input: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     label: [1, 1, -1, -1, -1],
  //   },
  //   {
  //     input: [1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  //     label: [1, -1, -1, -1, -1],
  //   },
  //   {
  //     input: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     label: [-1, -1, -1, -1, -1],
  //   },
  //   {
  //     input: [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  //     label: [1, 1, 1, 1, 1],
  //   },
];

const inputSize = numbersRecognitionData[0].input.length;
const outputSize = numbersRecognitionData[0].label.length;
const learningRate = 1;
const bias = 0;
const threshold = 0;
//const epochs = 10000;

const weights = trainPerceptron(
  numbersRecognitionData,
  inputSize,
  outputSize,
  learningRate,
  bias,
  threshold,
);

console.log('Trained weights:', weights);
