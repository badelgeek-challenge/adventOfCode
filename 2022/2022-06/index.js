const { getStringFromFile } = require("../modules/input");
let data = getStringFromFile("./input.txt").split("");

const nbCharactersBeforeMarker = (array, markerSize) => {
  for (let i = 0, max = array.length; i < max; i++) {
    const sequence = array.slice(i, i + markerSize);
    if (new Set(sequence).size === markerSize) {
      return i + markerSize;
    }
  }
};

const part1 = nbCharactersBeforeMarker(data, 4);
const part2 = nbCharactersBeforeMarker(data, 14);

console.log(`Part 1 : Number of characters = ${part1}`);
console.log(`Part 2 : Number of characters = ${part2}`);
