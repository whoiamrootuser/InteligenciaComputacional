import { Perceptron } from './perceptron';

function trainAndPortPerceptron() {
  const trainingData = [
    { inputs: [1, 1], label: 1 },
    { inputs: [1, 0], label: -1 },
    { inputs: [0, 1], label: -1 },
    { inputs: [0, 0], label: -1 },
  ];

  const perceptron = new Perceptron(2, 1, 1);
  perceptron.train(trainingData);
  console.log('Weights:', perceptron.weights);

  console.log('[1, 1] ->', perceptron.predict([1, 1])); // 1
  console.log('[1, 0] ->', perceptron.predict([1, 0])); // -1
  console.log('[0, 1] ->', perceptron.predict([0, 1])); // -1
  console.log('[0, 0] ->', perceptron.predict([0, 0])); // -1
}

function main() {
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
    {
      input: [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      label: [-1, 1, 1, 1, -1],
    },
    {
      input: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1],
      label: [1, 1, 1, -1, -1],
    },
    {
      input: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      label: [1, 1, -1, -1, -1],
    },
    {
      input: [1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      label: [1, -1, -1, -1, -1],
    },
    {
      input: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      label: [-1, -1, -1, -1, -1],
    },
    {
      input: [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
      label: [1, 1, 1, 1, 1],
    },
  ];
  const perceptrons = Array.from(
    { length: 4 },
    (_, i) => new Perceptron(15, 1, 1),
  );
  // Train each perceptron for its respective output
  const trainingPromises = perceptrons.map(async (perceptron, i) => {
    const trainingData = numbersRecognitionData.map((sample) => ({
      inputs: sample.input,
      label: sample.label[i],
    }));
    perceptron.train(trainingData);
  });
  Promise.all(trainingPromises).then(() => {
    console.log('All perceptrons trained');
  });
  const testInput = numbersRecognitionData[0].input;
  const prediction = perceptrons.map((p) => p.predict(testInput));
  console.log('Prediction for first input:', prediction);
}

main();
