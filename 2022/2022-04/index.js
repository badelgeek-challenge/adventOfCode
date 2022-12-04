const { getArrayFromFile } = require("../modules/input");
let data = getArrayFromFile("./input.txt");

const arrayFromAssignement = (assignement) => {
  const start = +assignement.split("-")[0];
  const end = +assignement.split("-")[1];
  return Array(end - start + 1)
    .fill()
    .map((v, i) => start + i);
};

const totalPair = data.reduce(
  (total, pairAssignement, index) => {
    const pair1 = pairAssignement.split(",")[0];
    const pair2 = pairAssignement.split(",")[1];

    const pair1Array = arrayFromAssignement(pair1);
    const pair2Array = arrayFromAssignement(pair2);

    // Find Cross sections for pair
    const crossSectionsNumber = pair1Array.filter((section) =>
      pair2Array.includes(section)
    ).length;

    // ----------- PART 1
    // Number of full inclusion of sections
    // prettier-ignore
    if (crossSectionsNumber === Math.min(pair1Array.length, pair2Array.length)) {
      total.part1 += 1;
    }

    // ----------- PART 2
    // Number of overlapping sections
    if (crossSectionsNumber) {
      total.part2 += 1;
    }

    return total;
  },
  { part1: 0, part2: 0 }
);

console.log(`Part 1 : points = ${totalPair.part1}`);
console.log(`Part 2 : points = ${totalPair.part2}`);
