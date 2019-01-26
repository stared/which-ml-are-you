function isPointInsideTile(point, tile, tileSize) {
  return tile.x <= point.x && point.x < tile.x + tileSize
    && tile.y <= point.y && point.y < tile.y + tileSize;
}

export function computeMetrics(points, tiles, tileSize) {
  const confusionMatrix = [[0, 0], [0, 0]];
  points.forEach((point) => {
    tiles.forEach((tile) => {
      if (isPointInsideTile(point, tile, tileSize)) {
        confusionMatrix[tile.v][point.v] += 1;
      }
    });
  });
  return {
    truePositives: confusionMatrix[1][1],
    falsePositives: confusionMatrix[1][0],
    falseNegatives: confusionMatrix[0][1],
    trueNegatives: confusionMatrix[0][0],
  }
}
