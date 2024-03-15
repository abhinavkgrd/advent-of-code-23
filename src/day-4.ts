import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-4");

let r = 1;
let ans = 0;
for (const line of lines) {
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
  if (matchCount > 0) {
    ans += Math.pow(2, matchCount - 1);
  }
}

console.log("ans", ans);
