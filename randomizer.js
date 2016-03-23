const NUM_LIMIT = 1000;

class Randomizer {
  constructor(dimension, x) {
    this.dimension = dimension;
    this.x = x || 0;
  }

  getVector(test) {
    let arr = [];
    let sum = 0;

    for(let i = 0; i < this.dimension; i++) {
      let n = Math.floor(Math.random() * NUM_LIMIT) + 1 - NUM_LIMIT / 2;
      sum += n;
      arr.push(n);
    }

    if(!test) arr.push(sum > this.x);
    return arr;
  }
}

module.exports = Randomizer;
