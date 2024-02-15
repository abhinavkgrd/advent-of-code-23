// read file from path
import fs = require("fs");
import path = require("path");

const digits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// const digits = ["three"];

const filePath = path.join(__dirname, "..", "inputs", "day-1.txt");
const file = fs.readFileSync(filePath, "utf-8");
const lines = file.split("\n");
// const lines = ["rbgfivefive3eightthree"];
let sum = 0;
for (let line of lines) {
  let firstNumber = 0,
    firstPosition = -1;
  let lastNumber = 0,
    lastPosition = Number.MAX_SAFE_INTEGER;
  let i = 0;
  for (let letter of line) {
    if (!Number.isNaN(Number(letter))) {
      if (firstPosition === -1) {
        firstNumber = Number(letter);
        firstPosition = i;
      }
      lastNumber = Number(letter);
      lastPosition = i;
    }
    i++;
  }

  // console.log("og", firstNumber, lastNumber);
  i = 0;
  for (let digit of digits) {
    // console.log("digit", digit);
    const firstIndex = line.indexOf(digit);
    // console.log("firstIndex", firstIndex);
    if (firstIndex !== -1 && firstIndex < firstPosition) {
      console.log("found new first Number", digit);
      firstNumber = i;

      firstPosition = firstIndex;
    }
    const lastIndex = line.lastIndexOf(digit);
    // console.log("lastIndex", firstIndex);
    if (lastIndex !== -1 && lastIndex > lastPosition) {
      console.log("found new last Number", digit);
      lastNumber = i;
      lastPosition = lastIndex;
    }
    i++;
  }
  if (firstPosition !== -1 && lastPosition !== Number.MAX_SAFE_INTEGER) {
    const number = firstNumber * 10 + lastNumber;
    console.log(line, firstNumber, lastNumber, number);
    sum += Number(number);
  }
}
console.log(sum);
