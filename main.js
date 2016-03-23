var util = require('util');
var Randomizer = require('./randomizer');
var Perceptron = require('./perceptron');

var config = {
  trainSetSize: 500,
  testSetSize: 20,
  dimension: 4,
  x: 41,
  acceptableError: .05,
  perceptronLearningRate: .1
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

// Manual check
console.log('Done');
console.log('Want to check manually? Y/n');
process.stdin.setEncoding('utf8');

var input = false;
var vector = [];
var n = 0;
var num = 0;
var sum = 0;

process.stdin.on('readable', () => {
  var text = process.stdin.read();
  if (text !== null) {
    if(!input) {
        if(text == 'n\n') process.exit();
        else input = true;

    } else {
      num = parseFloat(text);
      vector.push(num);
      sum += num;
      if(vector.length == config.dimension) {
        let t = perceptron.activated(vector);
        if(t != (sum > config.x)) {
          process.stdout.write('We failed: Expected ' + sum + (t ? ' > ' : ' <= ') + config.x + '\n');
          process.exit();
        } else {
          process.stdout.write('Success: ' + sum + (t ? ' > ' : ' <= ') + config.x + '\n');
          process.exit();
        }
      }
    }
    process.stdout.write(vector.length + ' num: ');
  }
});
