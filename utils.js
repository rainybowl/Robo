const existsInArray = (item, arr) => arr.indexOf(item) != -1;

const getRandomIndex = (prevIndex, range) => {
  var randomIndex = Math.floor(Math.random()*range);
  return randomIndex !== prevIndex ? randomIndex : getRandomIndex(prevIndex, range);
};

module.exports = {
  existsInArray,
  getRandomIndex
};