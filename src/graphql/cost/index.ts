import { LoggerLevelOutputFn, LogLevel } from '../../services/LoggingService';

import costMap from './costMap';
import { Cost } from './enums';

/**
 * Create cost analyzer options with the given logger.
 *
 * Cost analysis is performed on each query to prevent
 * the overload of resources with expensive queries.
 * Costs of each query/field/type are defined in the
 * `costMap` object.
 */
const createCostAnalyzerOptions = (log: LoggerLevelOutputFn) => ({
  costMap,
  maximumCost: Cost.LIMIT,
  defaultCost: Cost.DEFAULT,
  onComplete(cost: number) {
    if (cost <= Cost.LIMIT) {
      log(LogLevel.SILLY)(`Executing query with cost ${cost}`);
    } else {
      log(LogLevel.WARN)(`Blocking query with cost ${cost}`);
    }
  },
});

export default createCostAnalyzerOptions;
