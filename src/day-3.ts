import { getLinesInFile } from "./utils";

const ogLines = getLinesInFile("day-3"); //.slice(0, 5);
const n = ogLines.length;
const m = ogLines[0].length;
let lines: string[][] = [];
// console.log(lines.map((line) => line.join("")).join("\n"));
for (let i = 0; i < n + 2; i++) {
  lines.push([]);
  for (let j = 0; j < m + 2; j++) {
    if (i == 0 || i == n + 1 || j == 0 || j == m + 1) {
      lines[i].push(".");
      continue;
    }
    // console.log("i", i, j, ogLines[i - 1][j - 1]);
    lines[i].push(ogLines[i - 1][j - 1]);
  }
}

console.log(lines.map((line) => line.join("")).join("\n"));

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (!Number.isNaN(Number(lines[i][j]))) {
      if (
        (Number.isNaN(Number(lines[i - 1][j])) && lines[i - 1][j] !== ".") ||
        (Number.isNaN(Number(lines[i + 1][j])) && lines[i + 1][j] !== ".") ||
        (Number.isNaN(Number(lines[i][j - 1])) && lines[i][j - 1] !== ".") ||
        (Number.isNaN(Number(lines[i][j + 1])) && lines[i][j + 1] !== ".") ||
        (Number.isNaN(Number(lines[i + 1][j + 1])) &&
          lines[i + 1][j + 1] !== ".") ||
        (Number.isNaN(Number(lines[i + 1][j - 1])) &&
          lines[i + 1][j - 1] !== ".") ||
        (Number.isNaN(Number(lines[i - 1][j + 1])) &&
          lines[i - 1][j + 1] !== ".") ||
        (Number.isNaN(Number(lines[i - 1][j - 1])) &&
          lines[i - 1][j - 1] !== ".")
      ) {
        const oj = j;
        // console.log(i, j);
        while (!Number.isNaN(Number(lines[i][--j]))) {
          // do nothing
        }
        j++;
        let num = 0;
        while (!Number.isNaN(Number(lines[i][j]))) {
          num = num * 10 + Number(lines[i][j]);
          lines[i][j] = ".";
          j++;
        }
        lines[i][oj] = num.toString();
      }
    }
  }
}

let ans = 0;

const getNumber = (x: string) => (!Number.isNaN(Number(x)) ? Number(x) : 1);

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (Number.isNaN(Number(lines[i][j])) && lines[i][j] === "*") {
      const ng =
        Number(!Number.isNaN(Number(lines[i - 1][j]))) +
        Number(!Number.isNaN(Number(lines[i + 1][j]))) +
        Number(!Number.isNaN(Number(lines[i][j - 1]))) +
        Number(!Number.isNaN(Number(lines[i][j + 1]))) +
        Number(!Number.isNaN(Number(lines[i + 1][j + 1]))) +
        Number(!Number.isNaN(Number(lines[i + 1][j - 1]))) +
        Number(!Number.isNaN(Number(lines[i - 1][j + 1]))) +
        Number(!Number.isNaN(Number(lines[i - 1][j - 1])));

      if (ng === 2) {
        ans +=
          Number(getNumber(lines[i - 1][j])) *
          Number(getNumber(lines[i + 1][j])) *
          Number(getNumber(lines[i][j - 1])) *
          Number(getNumber(lines[i][j + 1])) *
          Number(getNumber(lines[i + 1][j + 1])) *
          Number(getNumber(lines[i + 1][j - 1])) *
          Number(getNumber(lines[i - 1][j + 1])) *
          Number(getNumber(lines[i - 1][j - 1]));

        console.log("ans", ans);
      }
    }
  }
}
console.log("ans", ans);
