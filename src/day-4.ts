import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-4");

let ans = 0;
let extraCardCounts = new Array(lines.length).fill(0);
let runningCounter = 1;
for (const [index, line] of lines.entries()) {
  const [_, game] = line.split(":");
  const [win, my] = game.split("|");
  const winNumbers = new Set(win.split(" ").filter((x) => !!x));
  const myNumbers = my.split(" ").filter((x) => !!x);
  let matchCount = 0;
  for (let n of myNumbers) {
    if (winNumbers.has(n)) {
      matchCount++;
    }
  }
  runningCounter += extraCardCounts[index];
  // console.log(
  //   `game ${index + 1}: matches: ${matchCount} cnt: ${runningCounter}`
  // );
  if (matchCount > 0) {
    const stIndex = Math.min(lines.length - 1, index + 1);
    const endIndex = Math.min(lines.length - 1, index + 1 + matchCount);
    extraCardCounts[stIndex] += runningCounter;
    extraCardCounts[endIndex] -= runningCounter;
  }
  // console.log(`extraCardCounts`, extraCardCounts);
}

// console.log(`extraCardCounts`, extraCardCounts);

runningCounter = 1;
for (let extraCnt of extraCardCounts) {
  runningCounter += extraCnt;
  ans += runningCounter;
}

console.log("ans", ans);
