import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-5");

const combinedSeedRanges = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => !!x)
  .map((x) => Number(x));

const seedRanges = [];

for (let i = 0; i < combinedSeedRanges.length; i += 2) {
  seedRanges.push([combinedSeedRanges[i], combinedSeedRanges[i + 1]]);
}

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

maps.forEach((map) => map.sort((entry1, entry2) => entry1[1] - entry2[1]));

let sourceRanges = seedRanges.sort((x, y) => x[0] - y[0]);

for (let mapNumber = 0; mapNumber < 7; mapNumber++) {
  const map = maps[mapNumber];
  let i = 0,
    j = 0;
  const destRanges = [];
  while (i < sourceRanges.length && j < map.length) {
    // console.log("loop start", "i: ", i, "j: ", j);
    const sourceRange: number[] = sourceRanges[i];
    const mapEntry = map[j];
    // console.log("sourceRange", sourceRange);
    // console.log("mapEntry", mapEntry);
    let destRangeSt, destRangeLength;
    if (sourceRange[0] < mapEntry[1]) {
      destRangeSt = sourceRange[0];
      destRangeLength = Math.min(mapEntry[1] - sourceRange[0], sourceRange[1]);
    } else if (
      sourceRange[0] >= mapEntry[1] &&
      sourceRange[0] < mapEntry[1] + mapEntry[2]
    ) {
      const startOffset = sourceRange[0] - mapEntry[1];
      destRangeSt = mapEntry[0] + startOffset;
      destRangeLength = Math.min(sourceRange[1], mapEntry[2] - startOffset);
      //   console.log("c1:destRange", destRanges);
    } else {
      j++;
      continue;
    }
    destRanges.push([destRangeSt, destRangeLength]);
    if (destRangeLength < sourceRange[1]) {
      const updatedSourceRange = sourceRange[0] + destRangeLength;
      const updatedSourceLength = sourceRange[1] - destRangeLength;
      sourceRanges[i] = [updatedSourceRange, updatedSourceLength];
    } else {
      i++;
    }
  }
  //   console.log("loop end", "i: ", i, "j: ", j);
  if (i < sourceRanges.length) {
    destRanges.push(...sourceRanges.slice(i));
    // console.log("c2:destRange", destRanges);
  }
  //   console.log("destRange", destRanges);
  sourceRanges = destRanges.sort((x, y) => x[0] - y[0]);
}

// console.log("sourceRanges", sourceRanges);

console.log("ans", sourceRanges[0][0]);
