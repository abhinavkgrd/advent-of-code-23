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
  console.log(line);
  const [gameID, roundsString] = line.split(":");
  const id = Number(gameID.split(" ")[1]);
  const rounds = roundsString.split(";");
  // console.log(rounds);
  let valid = true;
  for (const round of rounds) {
    const dicesCounts = round.split(",");
    for (let diceCount of dicesCounts) {
      const count = diceCount
        .split(" ")
        .map((x) => Number(x))
        .filter((x) => !!x)[0];
      console.log(diceCount, count);
      if (diceCount.includes("red") && count > MAX_RED_DICE) {
        valid = false;
        break;
      }
      if (diceCount.includes("blue") && count > MAX_BLUE_DICE) {
        valid = false;
        break;
      }
      if (diceCount.includes("green") && count > MAX_GREEN_DICE) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      break;
    }
  }
  if (valid) {
    console.log("id", id, "isValid", valid, "ans", ans);
    ans += id;
  }
  // id++;
}
console.log("ans", ans);
