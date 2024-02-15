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

const filePath = path.join(__dirname, "..", "inputs", "day-1.txt");
const file = fs.readFileSync(filePath, "utf-8");
const lines = file.split("\n");
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

  i = 0;
  for (let digit of digits) {
    const firstIndex = line.indexOf(digit);
    if (firstIndex !== -1 && firstIndex < firstPosition) {
      firstNumber = i;
    }
    const lastIndex = line.lastIndexOf(digit);
    if (lastIndex !== -1 && lastIndex > lastPosition) {
      lastNumber = i;
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
