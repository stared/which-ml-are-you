<template>
  <table>
    <tbody>
      <tr>
        <th colspan="2" rowspan="2"/>
        <th colspan="3">Actual class</th>
      </tr>
      <tr>
        <th>Positive</th>
        <th>Negative</th>
      </tr>
      <tr>
        <th rowspan="3" style="height:6em;">
          <div class="label-columns">Predicted<br> class</div>
        </th>
        <th>Positive</th>
        <td>True Positives: {{ metrics.truePositives }}</td>
        <td>False Positives: {{ metrics.falsePositives }}</td>
      </tr>
      <tr>
        <th>Negative</th>
        <td>False Negatives: {{ metrics.falseNegatives }}</td>
        <td>True Negatives: {{ metrics.trueNegatives }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'ConfusionTable',
  props: {
    metrics: {
      type: Object,
      default: () => ({
        truePositives: 0,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      })
    }
  },
  methods: {
  },

}

</script>

<style scoped>

.label-columns {
  display: inline-block;
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

</style>
