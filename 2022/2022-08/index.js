const { getArrayFromFile } = require("../modules/input");

const isTreeVisibleFromOutside = (tree, rowIndex, rows, columnIndex, columns) => {
  tree = +tree;
  if (
    !rowIndex ||
    !columnIndex ||
    rowIndex === rows.length - 1 ||
    columnIndex === columns.length - 1
  ) {
    return true;
  }

  const leftRows = rows[rowIndex].slice(0, columnIndex).split("");
  const rightRows = rows[rowIndex].slice(columnIndex + 1, rows.length).split("");
  const upColumns = columns[columnIndex].slice(0, rowIndex).split("");
  const downColumns = columns[columnIndex].slice(rowIndex + 1, columns.length).split("");

  return (
    tree > Math.max(...leftRows) ||
    tree > Math.max(...rightRows) ||
    tree > Math.max(...upColumns) ||
    tree > Math.max(...downColumns)
  );
};

const getNbOfVisibleTreesInDirection = (tree, directionArray) => {
  let total = 0;
  for (const treeToCompare of directionArray) {
    if (treeToCompare >= tree) {
      return (total += 1);
    }
    total += 1;
  }
  return total;
};

const getTotalScenicScore = (tree, rowIndex, rows, columnIndex, columns) => {
  tree = +tree;

  // 4 directions arrays from tree to edges
  const leftRows = rows[rowIndex].slice(0, columnIndex).split("").reverse();
  const rightRows = rows[rowIndex].slice(columnIndex + 1, rows.length).split("");
  const upColumns = columns[columnIndex].slice(0, rowIndex).split("").reverse();
  const downColumns = columns[columnIndex].slice(rowIndex + 1, columns.length).split("");

  // Get nb of trees in each direction
  const totalLeft = getNbOfVisibleTreesInDirection(tree, leftRows);
  const totalRight = getNbOfVisibleTreesInDirection(tree, rightRows);
  const totalUp = getNbOfVisibleTreesInDirection(tree, upColumns);
  const totalDown = getNbOfVisibleTreesInDirection(tree, downColumns);

  // Calculate Scenic Score
  const scenicScore = totalLeft * totalRight * totalUp * totalDown;

  return scenicScore;
};

let rows = getArrayFromFile("./input.txt");
const nbRows = rows.length;
const nbColumns = rows[0].length;
let columns = [];

// Set columns
for (let columnIndex = 0, max = nbColumns; columnIndex < max; columnIndex++) {
  let column = "";
  for (let r = 0; r < nbRows; r++) {
    column = column.concat(rows[r][columnIndex]);
  }
  columns.push(column);
}

// Look every tree and check if it is the smaller of line and column
const { visibleFromOutside, highestScenicScore } = rows.reduce(
  (trees, row, rowIndex) => {
    //  Part 1 -----------------------------------
    const count = row.split("").reduce((count, tree, columnIndex) => {
      if (isTreeVisibleFromOutside(tree, rowIndex, rows, columnIndex, columns)) {
        count += 1;
      }
      return count;
    }, 0);
    trees.visibleFromOutside += count;

    //  Part 2 -----------------------------------
    const maxRowTreeScore = row.split("").reduce((score, tree, columnIndex) => {
      const treeScore = getTotalScenicScore(tree, rowIndex, rows, columnIndex, columns);
      score = Math.max(score, treeScore);
      return score;
    }, 0);

    trees.highestScenicScore = Math.max(maxRowTreeScore, trees.highestScenicScore);

    return trees;
  },
  {
    visibleFromOutside: 0,
    highestScenicScore: 0,
  }
);

console.log(`Part 1 : Number of visible trees from Outside = ${visibleFromOutside}`);
console.log(`Part 2 : Number of highest Scenic Score = ${highestScenicScore}`);
