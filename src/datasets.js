import {datasets} from '../assets/datasets/all.json'

const k = 10;
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

const generateSin = (n, wavenumber) => {
  return range(n)
    .map(() => {
      const x = Math.random();
      const y = Math.random();

      return {
        x: k * x,
        y: k * y,
        v: +(y < Math.sin(wavenumber * x))
      };
    });
}

const generateCircle = (n, radius) => {
  const rSq = Math.pow(radius, 2);
  return range(n)
    .map(() => {
      const x = Math.random();
      const y = Math.random();

      return {
        x: k * x,
        y: k * y,
        v: +(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2) < rSq)
      };
    });
}

export const generatedDatasets = [
  {name: "Sin4", points: generateSin(50, 4)},
  {name: "Sin4 Test", points: generateSin(50, 4)},
  {name: "Circle", points: generateCircle(50, 0.3)},
  {name: "Circle Test", points: generateCircle(50, 0.3)},
  {name: "Empty", points: []},
];

export const fixedDatasets = datasets.map(
    (dataset) => ({
      name: dataset.name,
      points: dataset.data.train
    })
);

export const fixedDatasetsTest = datasets.map(
    (dataset) => ({
      name: dataset.name + " Test",
      points: dataset.data.test
    })
);

export const allDatasets = generatedDatasets
  .concat(fixedDatasets)
  .concat(fixedDatasetsTest);
