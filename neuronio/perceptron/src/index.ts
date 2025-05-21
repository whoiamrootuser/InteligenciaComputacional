import { Perceptron } from './perceptron';

function main() {
  const trainingData = [
    { inputs: [0, 0], label: -1 },
    { inputs: [0, 1], label: -1 },
    { inputs: [1, 0], label: -1 },
    { inputs: [1, 1], label: 1 },
  ];

  const andPerceptron = new Perceptron(2, 0.1, 1);
  andPerceptron.train(trainingData);
  console.log('AND Perceptron Weights:', andPerceptron.weights);

  console.log(andPerceptron.predict([0, 0])); // -1
  console.log(andPerceptron.predict([0, 1])); // -1
  console.log(andPerceptron.predict([1, 0])); // -1
  console.log(andPerceptron.predict([1, 1])); // 1
}

main();
