var Randomizer = require('./randomizer');

class Perceptron {

  constructor(dimension, learningRate = 10) {
    this.dimension = dimension;
    this.weights = new Randomizer(dimension).getVector(true);
    this.threshold = 1;
    this.learningRate = learningRate;
  }

  activated(vector) {
    if(vector.hasOwnProperty('length') && vector.length >= this.dimension) {
      let sum = 0;
      for(let i = 0; i < this.dimension; i++)
        sum += vector[i] * this.weights[i];

      sum -= this.threshold;
      return sum > 0;
    }
  }

  train(vector) {
    if(vector.hasOwnProperty('length') && vector.length == (this.dimension + 1))
      if(this.activated(vector) != vector[this.dimension])
        this.updateWeights(vector);
  }

  updateWeights(vector) {
    if(vector.hasOwnProperty('length') && vector.length == (this.dimension + 1)) {

      for(let i = 0; i < this.dimension; i++) {
        if(vector[this.dimension])
          this.weights[i] += this.learningRate * vector[i]
        else
          this.weights[i] -= this.learningRate * vector[i]
      }

      if(vector[this.dimension])
        this.threshold -= this.learningRate;
      else
        this.threshold += this.learningRate;
    }
  }
}

module.exports = Perceptron;
