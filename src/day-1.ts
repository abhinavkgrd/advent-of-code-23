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
  console.log(line);
  let firstNumber = 0,
    firstPosition = 0;
  let lastNumber = 0,
    lastPosition = 0;
  let i = 0;
  for (let letter of line) {
    if (!Number.isNaN(Number(letter))) {
      if (typeof firstNumber === "undefined") {
        firstNumber = Number(letter);
        firstPosition = i;
      }
      lastNumber = Number(letter);
      lastPosition = i;
    }
    i++;
  }

  i = 0;
  console.log("og", firstNumber, lastNumber);
  for (let digit of digits) {
    const firstIndex = line.indexOf(digit);
    if (firstIndex !== -1) {
      console.log("found number");
      if (firstIndex < firstPosition) {
        firstNumber = i;
      } else if (firstIndex > lastPosition) {
        lastNumber = i;
      }
    }
    i++;
  }
  const number = firstNumber * 10 + lastNumber;
  console.log(line, firstNumber, lastNumber, number);
  sum += Number(number);
}
console.log(sum);
