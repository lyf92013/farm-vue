import Hashids from "hashids";

const hasherWa = new Hashids("525420", 4);
const hasherWb = new Hashids(
  "3388511",
  5,
  "abcdefghijkmnprstuvwxyABCDEFGHJKLMNPQRSTUVWXY234578"
);
const hasherWc = new Hashids(
  "3388522",
  5,
  "abcdefghijkmnprstuvwxyABCDEFGHJKLMNPQRSTUVWXY234578"
);
const hasherWf = new Hashids(
  "3838522",
  5,
  "abcdefghijkmnprstuvwxyABCDEFGHJKLMNPQRSTUVWXY234578"
);

export { hasherWa, hasherWb, hasherWc, hasherWf }