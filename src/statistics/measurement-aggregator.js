import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {
  const tmpArray = []

  function getStats(metric, stats) {
    let i = 0;
    const metricArray = []

    while (i < measurements.length) {
      const value = measurements[i].getMetric(metric);
      if (value) metricArray.push(value);
      i++;
    }

    const jsonStats = metricArray.length ? stats.map(stat => constructStatistic(metric, stat, metricArray)) : [];
    return jsonStats;
  }

  metrics.forEach(metric => tmpArray.push(...getStats(metric, stats)));
  return tmpArray;
}


function constructStatistic(metric, stat, measurements) {
  const data = new Object();
  data.metric = metric;
  data.stat = stat;
  let value;
  console.log(measurements);
  if (measurements.length) {
    switch (stat) {
      case "max":
        value = Math.max(...measurements);
        break;
      case "min":
        value = Math.min(...measurements);
        break;
      case "average":
        const average = measurements.reduce((a, b) => a + b, 0) / measurements.length;
        value = Math.ceil(average * 100) / 100;
        break;
      default:
        value = false;
        break;
    }

    return { ...data, value: value };
  }
  /* error here if not in enum stat query */
}