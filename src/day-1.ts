// read file from path
import fs = require("fs");
import path = require("path");

const filePath = path.join(__dirname, "..", "inputs", "day-1.txt");
const file = fs.readFileSync(filePath, "utf-8");
const lines = file.split("\n");
let sum = 0;
for (let line of lines) {
  let firstNumber;
  let lastNumber;
  for (let letter of line) {
    if (!Number.isNaN(Number(letter))) {
      if (typeof firstNumber === "undefined") {
        firstNumber = Number(letter);
      }
      lastNumber = Number(letter);
    }
  }
  if (firstNumber && lastNumber) {
    const number = firstNumber * 10 + lastNumber;
    console.log(line, number);
    sum += Number(number);
  }
}
console.log(sum);
