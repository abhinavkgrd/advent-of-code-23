import { getLinesInFile } from "./utils";

const lines = getLinesInFile("day-7");

const isFiveOfKind = (sortedCard: string[]) => {
  return sortedCard.every((c) => c === sortedCard[0]);
};

const isFourOfKind = (sortedCard: string[]) => {
  return (
    (sortedCard[0] === sortedCard[1] &&
      sortedCard[1] === sortedCard[2] &&
      sortedCard[2] === sortedCard[3]) ||
    (sortedCard[1] === sortedCard[2] &&
      sortedCard[2] === sortedCard[3] &&
      sortedCard[3] === sortedCard[4])
  );
};

const isFullHouse = (sortedCard: string[]) => {
  return (
    (sortedCard[0] === sortedCard[1] &&
      sortedCard[2] === sortedCard[3] &&
      sortedCard[3] === sortedCard[4]) ||
    (sortedCard[0] === sortedCard[1] &&
      sortedCard[1] === sortedCard[2] &&
      sortedCard[3] === sortedCard[4])
  );
};

const isThreeOfKind = (sortedCard: string[]) => {
  return (
    (sortedCard[0] === sortedCard[1] && sortedCard[1] === sortedCard[2]) ||
    (sortedCard[1] === sortedCard[2] && sortedCard[2] === sortedCard[3]) ||
    (sortedCard[2] === sortedCard[3] && sortedCard[3] === sortedCard[4])
  );
};

const isTwoPair = (sortedCard: string[]) => {
  return (
    (sortedCard[0] === sortedCard[1] && sortedCard[2] === sortedCard[3]) ||
    (sortedCard[0] === sortedCard[1] && sortedCard[3] === sortedCard[4]) ||
    (sortedCard[1] === sortedCard[2] && sortedCard[3] === sortedCard[4])
  );
};

const isOnePair = (sortedCard: string[]) => {
  return (
    sortedCard[0] === sortedCard[1] ||
    sortedCard[1] === sortedCard[2] ||
    sortedCard[2] === sortedCard[3] ||
    sortedCard[3] === sortedCard[4]
  );
};

const getCardStrength = (card: string) => {
  const sortedCard = card.split("").sort();
  //   console.log("sortedCard", sortedCard);
  if (isFiveOfKind(sortedCard)) {
    return 7;
  } else if (isFourOfKind(sortedCard)) {
    return 6;
  } else if (isFullHouse(sortedCard)) {
    return 5;
  } else if (isThreeOfKind(sortedCard)) {
    return 4;
  } else if (isTwoPair(sortedCard)) {
    return 3;
  } else if (isOnePair(sortedCard)) {
    return 2;
  } else {
    return 1;
  }
};

const getCardNumbers = (card: string) => {
  return card.split("").map((c) => {
    if (c === "T") {
      return 10;
    } else if (c === "J") {
      return 11;
    } else if (c === "Q") {
      return 12;
    } else if (c === "K") {
      return 13;
    } else if (c === "A") {
      return 14;
    } else {
      return Number(c);
    }
  });
};

const compareSameRankStrength = (card1: string, card2: string) => {
  const card1Arr = getCardNumbers(card1);
  const card2Arr = getCardNumbers(card2);
  for (let i = 0; i < card1Arr.length; i++) {
    if (card1Arr[i] === card2Arr[i]) {
      continue;
    } else if (card1Arr[i] > card2Arr[i]) {
      return 1;
    } else {
      return -1;
    }
  }
  return 0;
};

const cardAndPoints = [];

for (let line of lines) {
  const [card, point] = line.split(" ");
  cardAndPoints.push({ card: card, point: Number(point) });
}

const final = cardAndPoints
  .map((cardAndPoints) => {
    return { ...cardAndPoints, strength: getCardStrength(cardAndPoints.card) };
  })
  .sort(
    (
      { card: card1, strength: card1Strength },
      { card: card2, strength: card2Strength }
    ) => {
      if (card1Strength === card2Strength) {
        return compareSameRankStrength(card1, card2);
      } else {
        return card1Strength - card2Strength;
      }
    }
  );

console.log("final", final);

let ans = 0;

for (let [index, card] of final.entries()) {
  //   console.log(
  //     "card",
  //     card.card,
  //     "point",
  //     card.point,
  //     index + 1,
  //     card.point * (index + 1)
  //   );
  ans += card.point * (index + 1);
}
console.log("ans", ans);
