import {datasets} from '../assets/datasets/all.json'

const k = 10;
const n = 50;
export const tileSize = 1;

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

export const tiles = range(k * k)
  .map((i) => {
    return {
      x: i % k,
      y: Math.floor(i / k),
      v: 0 // Math.random()
    };
  });

const points = range(n)
  .map(() => {
    const x = Math.random();
    const y = Math.random();

    return {
      x: k * x,
      y: k * y,
      v: +(y < Math.sin(4 * x))
    };
  });

const circle = range(n)
  .map(() => {
    const x = Math.random();
    const y = Math.random();

    return {
      x: k * x,
      y: k * y,
      v: +(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2) < 0.1)
    };
  });

export const generatedDatasets = [
  {name: "Sinish", points: points},
  {name: "Circle", points: circle},
  {name: "Empty", points: []},
];

export const fixedDatasets = datasets.map(
    (dataset) => ({
      name: dataset.name,
      points: dataset.data.train
    })
);
