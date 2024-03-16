import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-5");

/* DATA FORMAT

Line 1: `seeds: ${line ranges of seed numbers}`

example-> seeds: 79 14 55 13
means two seed range (79,14) , (55,13)
where the first value represent the range start and second the range length
*/

// this parse the numbers and generates an array out of it
// in above case , combinedSeedRanges= [79, 14, 55, 13]
const combinedSeedRanges = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => !!x)
  .map((x) => Number(x));

const seedRanges = [];

// seed range separate the range into range array
// for example case [[79, 14], [55, 13]]
for (let i = 0; i < combinedSeedRanges.length; i += 2) {
  seedRanges.push([combinedSeedRanges[i], combinedSeedRanges[i + 1]]);
}

// following lines describe the conversion maps divided in section based on the titles.
// so we get the title line numbers to split them based on it.
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

// Maps contain the parsed mapping data in array of array of number format
// for the test-case
// seed-to-soil map:
// 50 98 2
// 52 50 48
// maps[0]= [[50,98,2], [52,50,48]]

maps.forEach((map) => map.sort((entry1, entry2) => entry1[1] - entry2[1]));

/*
The problem statement wants us to find 
the lowest location number that corresponds to any of the initial seed numbers.

essentially this requires us to convert the seed range provided to us into location range 
that this seeds would be planted on.

A simple brute force approach of looping through all the seeds in the range and finding there 
corresponding location can be very expensive as the range can be very large.

Better solution is to work with the ranges as it is and convert them to 
destination ranges using the mapping.

Lets first reduce the problem from using 7 maps to just single map, as the same process,
can be repeated n number of times, as the destination range of first mapping conversion
becomes the source range for the next map and the process repeats.

So, Now the problem statement is we have two list of ranges, and we have to find the 
overlapping values in those two ranges. as those will be the values that will be converted
to destination value and rest being as the source value.

This problem can be solved by using a two pointer approach, where we sort both the list based on
their starting values and looping through them increasing the value of the pointer for the list 
which ever starts lagging behind.

For example : 
list 1 : (1,10) , (12, 9) , (22,12)
list 2 : (7,6), (14,5) ,(24,10)

here we start by first checking the overlap between the first pair, we see there is a overlap,
so note the overlap and then seeing that the end of the list 2 is greater than list one,
it is possible that the list 2 value overlaps with more values in list one, so we move the list
1 pointer.

Comparing second pair of list 1 with the first pair of list 2, we do see a overlap, 
and we no see that the the end of list 1 is greater than 2,so we move the pointer of list one 
and keep on doing the comparison.

This forms the base logic of our solution.
*/

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
