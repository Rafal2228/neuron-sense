var Randomizer = require('./randomizer');
var Perceptron = require('./perceptron');

var config = {
  trainSetSize: 100,
  testSetSize: 20,
  dimension: 4,
  x: 100,
  acceptableError: .1,
  perceptronLearningRate: 1
}

// init
var rand = new Randomizer(config.dimension, config.x);
var perceptron = new Perceptron(config.dimension, config.perceptronLearningRate);
var set = {
  training: [],
  test: []
}

for(let i = 0; i < config.trainSetSize; i++)
  set.training.push(rand.getVector());

for(let i = 0; i < config.testSetSize; i++)
  set.test.push(rand.getVector());

// methods
function train() {
  for(let i = 0; i < config.trainSetSize; i++) {
    perceptron.train(set.training[i]);
  }
}

function check() {
  var err = 0;
  for(let i = 0; i < config.testSetSize; i++){
    if(perceptron.activated(set.test[i]) != set.test[i][config.dimension])
      err++;
  }
  console.log(err / 20);
  return err / 20;
}

train();
while(check() > config.acceptableError)
  train();
