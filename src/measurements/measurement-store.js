import { Measurement } from './measurement';
import { HttpError } from '../errors';

/**
 * DB to store measurements
 * @type {Array}
 */
const db = [];

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  db.push(measurement);
}/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  const result = db.find(measurement => measurement.getTimestamp().getTime() == new Date(timestamp).getTime());

  return result;
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
  const results = db.filter(measurement => measurement.getTimestamp() >= from && measurement.getTimestamp() < to);

  return results;
}
