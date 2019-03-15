import {predictions} from '../assets/predictions/all.json'

function closeEnough(v, w) {
  return Math.abs(v - w) < 0.05;
}

function findPrediction(tile, preds) {
  for (let i = 0; i < preds.length; ++i) {
    if (closeEnough(tile.x, preds[i].x) && closeEnough(tile.y, preds[i].y))
      return +(preds[i].v > 0.5);
  }
  return 0;
}

export function getPredictions(tiles, dataset, classifier) {
  if (predictions[dataset] === undefined)
    return;
  if (predictions[dataset][classifier] === undefined)
    return;
  const selectedPredictions = predictions[dataset][classifier];
  tiles.forEach((d) => d.v = findPrediction(d, selectedPredictions));
}
