var Randomizer = require('./randomizer');
var Perceptron = require('./perceptron');

var config = {
  trainSetSize: 100,
  testSetSize: 20,
  dimension: 4,
  x: 41,
  acceptableError: .05,
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
      // console.log('For ' + set.test[i] + ' got: ' + !set.test[i][config.dimension]);
      err++;
  }
  console.log(err / config.testSetSize);
  return err / config.testSetSize;
}

train();
while(check() > config.acceptableError)
  train();
