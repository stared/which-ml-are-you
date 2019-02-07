import {scaleLinear} from "d3-scale";
import {datasets} from '../assets/datasets/all.json'

const k = 10;
export const tileSize = 1;

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

const scaleX = scaleLinear()
  .domain([0, k])
  .range([-1, 1]);

const scaleY = scaleLinear()
  .domain([0, k])
  .range([-1, 1]);

export const tiles = range(k * k)
  .map((i) => {
    return {
      x: scaleX(i % k),
      y: scaleY(Math.floor(i / k)),
      dx: scaleX(1) - scaleX(0),
      dy: scaleY(1) - scaleY(0),
      v: 0 // Math.random()
    };
  });

const generateSin = (n, wavenumber) => {
  return range(n)
    .map(() => {
      const x = 2 * Math.random() - 1;
      const y = 2 * Math.random() - 1;

      return {
        x: x,
        y: y,
        v: +(y < Math.sin(wavenumber * x))
      };
    });
}

const generateCircle = (n, radius) => {
  const rSq = Math.pow(radius, 2);
  return range(n)
    .map(() => {
      const x = 2 * Math.random() - 1;
      const y = 2 * Math.random() - 1;

      return {
        x: x,
        y: y,
        v: +(Math.pow(x, 2) + Math.pow(y, 2) < rSq)
      };
    });
}

export const generatedDatasets = [
  {name: "Sin4", points: generateSin(50, 4)},
  {name: "Sin4 Test", points: generateSin(50, 4)},
  {name: "Circle", points: generateCircle(50, 0.5)},
  {name: "Circle Test", points: generateCircle(50, 0.5)},
  {name: "Empty", points: []},
];

const normalize = (data, ranges) => {

  const scaleX = scaleLinear()
    .domain([ranges.xmin, ranges.xmax])
    .range([-1, 1]);

  const scaleY = scaleLinear()
    .domain([ranges.ymin, ranges.ymax])
    .range([-1, 1]);

  return data.map((d) => ({
    x: scaleX(d.x),
    y: scaleY(d.y),
    v: d.v
  }));
};

export const fixedDatasets = datasets.map(
    (dataset) => ({
      name: dataset.name,
      points: normalize(dataset.data.train, dataset)
    })
);

export const fixedDatasetsTest = datasets.map(
    (dataset) => ({
      name: dataset.name + " Test",
      points: normalize(dataset.data.test, dataset)
    })
);

export const allDatasets = generatedDatasets
  .concat(fixedDatasets)
  .concat(fixedDatasetsTest);
