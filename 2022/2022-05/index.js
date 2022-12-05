const { getArrayFromFile } = require("../modules/input");
let data = getArrayFromFile("./input.txt");

// Parse data to retrieve Stacks and Moves
let { stackList, moveList } = data.reduce(
  (data, line, index) => {
    if (line) {
      if (line && !line.includes("move")) {
        line.match(/.{3}[ ]?/g).forEach((crate, index) => {
          if (!data.stackList[index]) {
            data.stackList[index] = [];
          }
          if (crate.includes("[")) {
            data.stackList[index].push(crate);
          }
        });
      } else {
        data.moveList.push(line);
      }
    }
    return data;
  },
  { stackList: [], moveList: [] }
);

// Move Crates between Stacks
const stackListEnd = moveList.reduce(
  (stacks, move) => {
    let [cratesMoving, fromIndex, toIndex] = move.match(/[0-9]+[ ]?/g);
    fromIndex = parseInt(fromIndex) - 1;
    toIndex = parseInt(toIndex) - 1;

    // --------------------- PART1
    // if cratesMoving bigger than stack, take all crates
    cratesMoving = Math.min(stacks.part1[fromIndex].length, cratesMoving);

    for (let i = 0; i < cratesMoving; i++) {
      // Crate to move is first of the stack
      let crate = stacks.part1[fromIndex][0];

      // create Crate in destination Stack
      stacks.part1[toIndex].unshift(crate);

      // delete Crate from origin Stack
      stacks.part1[fromIndex].shift();
    }

    // --------------------- PART2
    // Crates to Add
    const cratesToAdd = stacks.part2[fromIndex].filter((v, i) => i < cratesMoving);

    // Remaining crates
    stacks.part2[fromIndex] = stacks.part2[fromIndex].filter((v, i) => i >= cratesMoving);

    // Add Crates in destination Stack
    stacks.part2[toIndex] = [...cratesToAdd, ...stacks.part2[toIndex]];

    // --------------------- return
    return stacks;
  },
  {
    part1: JSON.parse(JSON.stringify(stackList)),
    part2: JSON.parse(JSON.stringify(stackList)),
  }
);

const start = stackList.map((stack) => stack[0].match(/\w/g)).join("");
const part1 = stackListEnd.part1.map((stack) => stack[0].match(/\w/g)).join("");
const part2 = stackListEnd.part2.map((stack) => stack[0].match(/\w/g)).join("");

console.log(`Start : top of each stack = ${start}`);
console.log(`Part 1 : top of each stack = ${part1}`);
console.log(`Part 2 : top of each stack = ${part2}`);
