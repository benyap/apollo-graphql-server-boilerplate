/**
 * Model definition for User
 *
 * This definition describes the data model for the
 * User type in the database (notice that the `friends`
 * field is not present here when compared with the
 * GraphQL schema).
 */

export interface User {
  _id: string;
  firstname?: string;
  lastname?: string;
  friendIds?: string[];
}

export interface UserInput {
  firstname?: string;
  lastname?: string;
}
