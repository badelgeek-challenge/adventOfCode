const { getArrayFromFile } = require("../modules/input");

const data = getArrayFromFile("./input.txt");

const caloriesByElfeList = data.reduce(
  (byElfe, calorie, index) => {
    if (calorie) {
      byElfe.current += +calorie;
    } else {
      byElfe.list.push(byElfe.current);
      byElfe.current = 0;
    }
    return byElfe;
  },
  { list: [], current: 0 }
).list;

const [e1, e2, e3, ...rest] = caloriesByElfeList.sort((a, b) => b - a);
console.log(`Part 1 : max = ${e1}`);
console.log(`Part 2 : sum of top3 = ${e1 + e2 + e3}`);
