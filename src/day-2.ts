import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-2"); //.slice(0, 5);
// const lines = [
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
// ];
const MAX_RED_DICE = 12;
const MAX_GREEN_DICE = 13;
const MAX_BLUE_DICE = 14;

// let id = 1;
let ans = 0;
for (const line of lines) {
  // console.log(line);
  const [gameID, roundsString] = line.split(":");
  const id = Number(gameID.split(" ")[1]);
  const rounds = roundsString.split(";");
  // console.log(rounds);
  let valid = true;
  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;
  for (const round of rounds) {
    const dicesCounts = round.split(",");
    for (let diceCount of dicesCounts) {
      const count = diceCount
        .split(" ")
        .map((x) => Number(x))
        .filter((x) => !!x)[0];
      // console.log(diceCount, count);
      if (diceCount.includes("red")) {
        if (maxRed < count) {
          maxRed = count;
        }
      }
      if (diceCount.includes("blue")) {
        if (maxBlue < count) {
          maxBlue = count;
        }
      }
      if (diceCount.includes("green")) {
        if (maxGreen < count) {
          maxGreen = count;
        }
      }
    }
    if (!valid) {
      break;
    }
  }
  if (valid) {
    ans += maxRed * maxGreen * maxBlue;
    console.log(maxRed, maxGreen, maxBlue, ans);
  }
  // id++;
}
console.log("ans", ans);
