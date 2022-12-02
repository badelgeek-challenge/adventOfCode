const fs = require("fs");
// lire le contenu du fichier
const rawData = fs.readFileSync("./input.txt", "utf8");
// créer un tableau a partir des lignes
const data = rawData.split("\n");

const increaseNumber = data.reduce(
  (total, value, index) => (+value > +data[index - 1] ? total + 1 : total),
  0
);
console.log("⏩ ~ increaseNumber ~ increaseNumber", increaseNumber);
