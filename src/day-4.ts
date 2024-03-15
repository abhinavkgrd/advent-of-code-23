import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-4");

const cntArr = new Array(lines.length + 1).fill(0);
console.log(cntArr);
let r = 1;
let ans = 0;
for (const line of lines) {
  console.log("line", line);
  const [cardID, game] = line.split(":");
  console.log("cardID", cardID);
  const [_, idString] = cardID.split(" ");
  console.log("idString", idString);
  const id = Number(idString);
  const [win, my] = game.split("|");
  const winNumbers = new Set(win.split(" ").filter((x) => !!x));
  const myNumbers = my.split(" ").filter((x) => !!x);
  let matchCount = 0;
  for (let n of myNumbers) {
    if (winNumbers.has(n)) {
      matchCount++;
    }
  }
  console.log("id", id, " cntArr[id - 1]", cntArr[id - 1]);
  r += cntArr[id - 1];
  ans += r;
  cntArr[id] += r;
  cntArr[id + matchCount] -= r;
  console.log("r", r, "ans", ans);
}

console.log("ans", ans);
