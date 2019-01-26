function isPointInsideTile(point, tile, tileSize) {
  return tile.x <= point.x && point.x < tile.x + tileSize
    && tile.y <= point.y && point.y < tile.y + tileSize;
}

function truePositive(predicted, actual) {
  return actual && (predicted === actual);
}

function falsePositive(predicted, actual) {
  return !actual && (predicted !== actual);
}

function trueNegative(predicted, actual) {
  return !actual && (predicted === actual);
}

function falseNegative(predicted, actual) {
  return actual && (predicted !== actual);
}

function computeMetric(points, tiles, tileSize, metric) {
  return points.reduce(
    function (counter, point) {
      let isCorrect = false;
      tiles.forEach(
        function(tile) {
          if (isPointInsideTile(point, tile, tileSize)) {
            isCorrect = metric(tile.v, point.v);
          }
        }
      );
      return counter + isCorrect;
    },
    0);
}

export function computeTruePositives(points, tiles, tileSize) {
  return computeMetric(points, tiles, tileSize, truePositive);
}

export function computeFalsePositives(points, tiles, tileSize) {
  return computeMetric(points, tiles, tileSize, falsePositive)
}

export function computeTrueNegatives(points, tiles, tileSize) {
  return computeMetric(points, tiles, tileSize, trueNegative)
}

export function computeFalseNegatives(points, tiles, tileSize) {
  return computeMetric(points, tiles, tileSize, falseNegative)
}
