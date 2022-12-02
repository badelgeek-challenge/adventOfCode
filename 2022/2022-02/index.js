const { getStringFromFile, getArrayFromFile } = require("../modules/input");
let data = getArrayFromFile("./input.txt");

//| A | X | 1 points | for Rock
//| B | Y | 2 points | for Paper
//| C | Z | 3 points | for Scissors

const real = {
  R: {
    shape: "R",
    points: 1,
    winAgainst: "S",
    loseAgainst: "P",
  },
  P: {
    shape: "P",
    points: 2,
    winAgainst: "R",
    loseAgainst: "S",
  },
  S: {
    shape: "S",
    points: 3,
    winAgainst: "P",
    loseAgainst: "R",
  },
}

const encodedToReal = {}
encodedToReal.A = encodedToReal.X = real.R;
encodedToReal.B = encodedToReal.Y = real.P;
encodedToReal.C = encodedToReal.Z = real.S;

function getRountPointsPart1(roundLine) {
  const [opponent, me] = roundLine.split(" ");
  let points = encodedToReal[me].points;
  // | 3 | DRAW 
  if (encodedToReal[opponent].shape === encodedToReal[me].shape) {
    return points += 3;
  }
  // | 6 | WIN 
  if (encodedToReal[opponent].shape === encodedToReal[me].winAgainst) {
    return points += 6;
  }

  //console.log(`(${encodedToReal[opponent].shape},${encodedToReal[opponent].points}) ${opponent} VS ${me} (${encodedToReal[me].shape},${encodedToReal[me].points}) => ${points}`)
  // | 0 | LOSE 
  return points

}

function getRountPointsPart2(roundLine) {
  const [opponent, roundEnd] = roundLine.split(" ");
  let me = "";
  let status = "";
  let points = 0;
  switch (roundEnd) {
    case 'X':
      // Lose
      status = "LOSE"
      me = encodedToReal[opponent].winAgainst;
      points = real[me].points;

      break;
    case 'Y':
      // DRAW
      status = "DRAW"
      me = encodedToReal[opponent].shape;
      points = real[me].points + 3;
      break;
    case 'Z':
      // WIN
      status = "WIN"
      me = encodedToReal[opponent].loseAgainst;
      points = real[me].points + 6;
      break;
  }
  // console.log(`⏩ ${encodedToReal[opponent].shape} VS ${me} (must ${status}) => ${points}`);
  return points
}


// PART 1
const totalPoints = data.reduce((total, roundLine) => {
  return total += +getRountPointsPart1(roundLine);
}, 0)
console.log(`Part 1 : points = ${totalPoints}`);

// PART 2
const totalPointsPart2 = data.reduce((total, roundLine) => {
  return total += +getRountPointsPart2(roundLine);
}, 0)
console.log(`Part 2 : points = ${totalPointsPart2}`);


