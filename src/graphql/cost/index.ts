import { default as costAnalysis } from 'graphql-cost-analysis';

import { LoggerLevelOutputFn, ELogLevel } from '../../services/LoggingService';

import costMap from './costMap';
import { Cost } from './enums';

/**
 * Create a cost analyzer object with the given logger.
 *
 * Cost analysis is performed on each query to prevent
 * the overload of resources with expensive queries.
 * Costs of each query/field/type are defined in the
 * `costMap` object.
 */
const createCostAnalyzer = (log: LoggerLevelOutputFn) =>
  costAnalysis({
    costMap,
    maximumCost: Cost.LIMIT,
    defaultCost: Cost.DEFAULT,
    onComplete(cost: number) {
      if (cost <= Cost.LIMIT) {
        log(ELogLevel.SILLY)(`Executing query with cost ${cost}`);
      } else {
        log(ELogLevel.WARN)(`Blocking query with cost ${cost}`);
      }
    },
  });

export default createCostAnalyzer;
