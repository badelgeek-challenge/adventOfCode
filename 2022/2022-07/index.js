const { getArrayFromFile } = require("../modules/input");
let data = getArrayFromFile("./input.txt");

// Part2
const FS_SIZE = 70000000;
const NEEDED_SPACE_FOR_INSTALL = 30000000;

const createDirObj = (dirname) => {
  return {
    dirname: dirname,
    files: [],
    subdirs: [],
  };
};

const getSizeOfAllDirs = (dirname, treeObj, listOfAllDirs = []) => {
  let sizeOfDir = 0;
  const current = treeObj;

  // Sum of Files in dir
  if ((dirname = current.dirname)) {
    sizeOfDir += current.files.reduce((sizeOfFiles, file) => sizeOfFiles + file.size, 0);
  }

  // Recursive
  current.subdirs.forEach((subdir) => {
    sizeOfDir += getSizeOfAllDirs(subdir.dirname, subdir, listOfAllDirs).sizeOfDir;
    listOfAllDirs.push(getSizeOfAllDirs(subdir.dirname, subdir));
  });

  const data = {
    dirname,
    sizeOfDir,
    listOfAllDirs,
  };

  return data;
};

// Parsing line to Generate tree folder object
const { tree } = data.reduce(
  (obj, line) => {
    const first_word = line.split(" ")[0];
    const last_word = line.split(" ").pop();

    // Command
    if (line.includes("$")) {
      // list directory
      if (last_word === "ls") {
        return obj;
      }
      //debugger;
      // up in directory tree
      if (last_word === "..") {
        obj.history.pop();
        obj.current = obj.history[obj.history.length - 1];
        return obj;
      }

      // go to root
      if (last_word === "/") {
        obj.current = obj.tree;
        obj.history.push(obj.current);
        return obj;
      }

      // Go down in directory tree
      obj.current = obj.current.subdirs.find((subdir) => {
        return subdir.dirname === last_word;
      });
      obj.history.push(obj.current);
      return obj;
    }

    // Command RESULT of LS
    // if Directory
    if (first_word === "dir") {
      obj.current.subdirs.push(createDirObj(last_word));
      return obj;
    }

    // FILE
    obj.current.files.push({
      filename: last_word,
      size: parseInt(first_word),
    });

    return obj;
  },
  {
    tree: createDirObj("/"),
    history: [],
    current: null,
  }
);

// Get sizes of root folder and list all folders with size
const { sizeOfDir, listOfAllDirs } = getSizeOfAllDirs("/", tree);

const fsActual = FS_SIZE - sizeOfDir;
const sizeToFree = NEEDED_SPACE_FOR_INSTALL - fsActual;

const { sumOfDirLowerThan100000, smallestDirToRemove } = listOfAllDirs.reduce(
  (data, dirData) => {
    //------------- Part1
    if (dirData.sizeOfDir <= 100000) {
      data.sumOfDirLowerThan100000 += dirData.sizeOfDir;
    }

    //------------- Part 2
    if (dirData.sizeOfDir >= sizeToFree) {
      data.smallestDirToRemove = Math.min(dirData.sizeOfDir, data.smallestDirToRemove);
    }
    return data;
  },
  {
    sumOfDirLowerThan100000: 0,
    smallestDirToRemove: Infinity,
  }
);

console.log(`Part 1 : Sum of dir lower than 100 000 = ${sumOfDirLowerThan100000}`);
console.log(`Part 2 : Smallest folder to remove to have enough space = ${smallestDirToRemove}`);
