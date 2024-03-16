import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-5");

const seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => !!x)
  .map((x) => Number(x));

const mapStarts = [
  lines.findIndex((x) => x === "seed-to-soil map:"),
  lines.findIndex((x) => x === "soil-to-fertilizer map:"),
  lines.findIndex((x) => x === "fertilizer-to-water map:"),
  lines.findIndex((x) => x === "water-to-light map:"),
  lines.findIndex((x) => x === "light-to-temperature map:"),
  lines.findIndex((x) => x === "temperature-to-humidity map:"),
  lines.findIndex((x) => x === "humidity-to-location map:"),
  lines.length + 1,
];

const rawMaps = [];

for (let i = 1; i < mapStarts.length; i++) {
  rawMaps.push(lines.slice(mapStarts[i - 1] + 1, mapStarts[i] - 1));
}

const maps = [];
for (const rawMap of rawMaps) {
  const map = [];
  for (const rawEntry of rawMap) {
    const entry = rawEntry
      .split(" ")
      .filter((x) => !!x)
      .map((x) => Number(x));
    map.push(entry);
  }
  maps.push(map);
}
const locations = [];

for (let seed of seeds) {
  let mapNumber = 0;
  let id = seed;
  //   let path = `${id}->`;
  while (mapNumber < 7) {
    const map = maps[mapNumber];
    for (let entry of map) {
      if (id >= entry[1] && id < entry[1] + entry[2]) {
        id = entry[0] + id - entry[1];
        break;
      }
    }
    // path += `${id}->`;
    mapNumber++;
  }
  //   console.log(path);
  locations.push(id);
}

let ans = Number.MAX_SAFE_INTEGER;

for (let location of locations) {
  ans = Math.min(ans, location);
}
console.log(ans);
