function isPointInsideTile(point, tile) {
  return tile.x <= point.x && point.x < tile.x + tile.dx
    && tile.y <= point.y && point.y < tile.y + tile.dy;
}

export function computeMetrics(points, tiles) {
  const confusionMatrix = [[0, 0], [0, 0]];
  points.forEach((point) => {
    tiles.forEach((tile) => {
      if (isPointInsideTile(point, tile)) {
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

export function splitByMetrics(points, tiles) {
  const confusionMatrixPoints = [[[], []], [[], []]];
  points.forEach((point) => {
    tiles.forEach((tile) => {
      if (isPointInsideTile(point, tile)) {
        confusionMatrixPoints[tile.v][point.v].push(point);
      }
    });
  });
  return {
    truePositives: confusionMatrixPoints[1][1],
    falsePositives: confusionMatrixPoints[1][0],
    falseNegatives: confusionMatrixPoints[0][1],
    trueNegatives: confusionMatrixPoints[0][0],
  }
}

export const metrics2acronym = {
  truePositive: "TP",
  falsePositives: "FP",
  falseNegatives: "FN",
  trueNegatives: "TN",
};

export const confusionMatrixMetrics = [
  // {
  //   name: "Condition positive",
  //   synonyms: ["(P)"],
  //   wiki: "",
  //   numerator: ["truePositives", "falseNegatives"],
  //   denominator: [1]
  // },
  // {
  //   name: "Condition negative",
  //   synonyms: ["(N)"],
  //   wiki: "",
  //   numerator: ["falsePositives", "trueNegatives"],
  //   denominator: [1]
  // },
  {
    name: "Precision",
    synonyms: ["Positive Predictive Value (PPV)"],
    wiki: "https://en.wikipedia.org/wiki/Precision_and_recall",
    numerator: ["truePositives"],
    denominator: ["truePositives", "falsePositives"]
  },
  {
    name: "Recall",
    synonyms: ["Sensitivity", "Hit rate", "True Positive Rate (TPR)"],
    wiki: "https://en.wikipedia.org/wiki/Precision_and_recall",
    numerator: ["truePositives"],
    denominator: ["truePositives", "falseNegatives"]
  },
  {
    name: "Specificity",
    synonyms: ["Selectivity", "True Negative Rate (TNR)"],
    wiki: "https://en.wikipedia.org/wiki/Sensitivity_and_specificity",
    numerator: ["trueNegatives"],
    denominator: ["falsePositives", "trueNegatives"]
  },
  {
    name: "Negative Predictive Value",
    synonyms: ["(NPV)"],
    wiki: "https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values",
    numerator: ["trueNegatives"],
    denominator: ["falseNegatives", "trueNegatives"]
  },
  {
    name: "False Negative Rate",
    synonyms: ["(FNR)", "Miss Rate"],
    wiki: "https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values",
    numerator: ["falseNegatives"],
    denominator: ["truePositives", "falseNegatives"]
  },
  {
    name: "False Positive Rate",
    synonyms: ["(FPR)", "Fall-out"],
    wiki: null,
    numerator: ["falsePositives"],
    denominator: ["falsePositives", "trueNegatives"]
  },
  {
    name: "False Discovery Rate",
    synonyms: ["(FDR)"],
    wiki: "https://en.wikipedia.org/wiki/False_discovery_rate",
    numerator: ["falsePositives"],
    denominator: ["truePositives", "falsePositives"]
  },
  {
    name: "False Omission Rate",
    synonyms: ["(FOR)"],
    wiki: "https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values",
    numerator: ["falseNegatives"],
    denominator: ["falseNegatives", "trueNegatives"]
  },
  {
    name: "Accuracy",
    synonyms: ["(ACC)"],
    wiki: "https://en.wikipedia.org/wiki/Accuracy_and_precision",
    numerator: ["truePositives", "trueNegatives"],
    denominator: ["truePositives", "falsePositives", "falseNegatives", "trueNegatives"]
  },
  {
    name: "F1 score",
    synonyms: [],
    wiki: "https://en.wikipedia.org/wiki/F1_score",
    numerator: ["truePositives", "truePositives"],
    denominator: ["truePositives", "truePositives", "falsePositives", "falseNegatives"]
  },
];
