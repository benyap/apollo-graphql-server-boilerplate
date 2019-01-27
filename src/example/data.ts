import { User } from '../graphql/typeDefs/models/User';

export const users: User[] = [
  {
    _id: '1',
    firstname: 'John',
    lastname: 'Smith',
    friendIds: ['2', '3'],
  },
  {
    _id: '2',
    firstname: 'Frank',
    lastname: 'Whittaker',
    friendIds: ['5'],
  },
  {
    _id: '3',
    firstname: 'Samantha',
    lastname: 'Sims',
    friendIds: ['2', '5'],
  },
  {
    _id: '4',
    firstname: 'Matthew',
    lastname: 'Palmer',
    friendIds: ['1', '2'],
  },
  {
    _id: '5',
    firstname: 'Jane',
    lastname: 'Hammond',
    friendIds: ['3', '2'],
  },
];
