const { getArrayFromFile } = require("../modules/input");
let data = getArrayFromFile("./input.txt");

const letterToPriority = (letter) => {
  const asciiCode = letter.charCodeAt();
  if (asciiCode >= 97) {
    return asciiCode - 96;
  }
  return asciiCode - 38;
};

const findSameItems = (string1, string2) => {
  return string1.split("").filter((letter1) => {
    return string2.split("").filter((letter2) => letter1 === letter2).length;
  });
};

const sumPriorities = data.reduce(
  (total, rucksack, index) => {
    //------- PART 1 -----------------
    // Divide ruckstack by 2
    const middle = rucksack.length / 2;
    const compartiment1 = rucksack.slice(0, middle);
    const compartiment2 = rucksack.slice(middle, rucksack.length);

    const sameItem = findSameItems(compartiment1, compartiment2)[0];
    total.part1 += letterToPriority(sameItem);

    //------- PART 2 -----------------
    // Check when all groups when first group
    if (!((index + 3) % 3)) {
      // Find same items between group 1 and group 2
      const sameItemGroup1Group2 = findSameItems(
        data[index],
        data[index + 1]
      ).join("");

      // Find same items with group 3
      const sameItemGroup1Group2Group3 = findSameItems(
        sameItemGroup1Group2,
        data[index + 2]
      )[0];

      total.part2 += letterToPriority(sameItemGroup1Group2Group3);
    }

    return total;
  },
  { part1: 0, part2: 0 }
);

console.log(`Part 1 : points = ${sumPriorities.part1}`);
console.log(`Part 2 : points = ${sumPriorities.part2}`);
