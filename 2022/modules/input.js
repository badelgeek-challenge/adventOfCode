const fs = require("fs");

const input = {
  getArrayFromFile(file) {
    // lire le contenu du fichier
    const rawData = fs.readFileSync(file, "utf8");
    // créer un tableau a partir des lignes
    const data = rawData.split("\n");

    return data;
  },

  getStringFromFile(file) {
    // lire le contenu du fichier
    const data = fs.readFileSync(file, "utf8");
    // créer un tableau a partir des lignes

    return data;
  },
};

module.exports = input;
