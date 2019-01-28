/**
 * Define costs for different types of queries here.
 *
 * Categorise costs by what resources it usually accesses,
 * e.g. the cost for a call to the database might have a
 * cost of 10, and the cost for a call to an external API
 * might have a cost of 15.
 */
// prettier-ignore
export enum Cost {
  LIMIT          = 100,
  DEFAULT        = 0,

  Static         = 1,
  Standard       = 10,
  Expensive      = 100,
}
