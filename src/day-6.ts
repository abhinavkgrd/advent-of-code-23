import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-6");

const times = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => !!x)
  .map((x) => Number(x));

const distances = lines[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => !!x)
  .map((x) => Number(x));

const n = times.length;

const t = 45988373;
const d = 295173412781210;
const dt = Math.pow(Math.pow(t, 2) - 4 * d, 0.5);
let t1 = (t - dt) / 2;
let t2 = (t + dt) / 2;
let rt1 = Math.floor(t1 + 1);
let rt2 = Math.ceil(t2 - 1);
const ans = rt2 - rt1 + 1;
console.log("ans", ans);
