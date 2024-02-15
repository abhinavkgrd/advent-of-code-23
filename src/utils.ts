// read file from path
import fs = require("fs");
import path = require("path");

export const getLinesInFile = (fileName: string) => {
  const filePath = path.join(__dirname, "..", "inputs", `${fileName}.txt`);
  const file = fs.readFileSync(filePath, "utf-8");
  const lines = file.split("\n");
  return lines;
};
