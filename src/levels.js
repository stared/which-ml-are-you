// directly or through datasets.js
// for now quick&dirty

import {
  fixedDatasets,
  fixedDatasetsTest
} from './datasets.js'

export const levels = [{
    // linear
    train: fixedDatasets[2],
    validation: fixedDatasetsTest[2]
  },
  {
    // moons
    train: fixedDatasets[0],
    validation: fixedDatasetsTest[0]
  },
  {
    // circle
    train: fixedDatasets[1],
    validation: fixedDatasetsTest[1]
  },
  {
    // xor
    train: fixedDatasets[4],
    validation: fixedDatasetsTest[4]
  },
  {
    // spirals
    train: fixedDatasets[3],
    validation: fixedDatasetsTest[3]
  },
];
