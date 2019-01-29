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
    friendIds: ['1', '3', '4', '5', '6', '7'],
  },
  {
    _id: '3',
    firstname: 'Samantha',
    lastname: 'Sims',
    friendIds: ['2', '5', '12', '13'],
  },
  {
    _id: '4',
    firstname: 'Matthew',
    lastname: 'Palmer',
    friendIds: ['2', '10', '11', '18', '19', '20'],
  },
  {
    _id: '5',
    firstname: 'Jane',
    lastname: 'Hammond',
    friendIds: ['2', '3', '13', '14'],
  },
  {
    _id: '6',
    firstname: 'Kaitlin',
    lastname: 'Rawlings',
    friendIds: ['2', '7', '8', '9'],
  },
  {
    _id: '7',
    firstname: 'Arlo',
    lastname: 'Olson',
    friendIds: ['2', '6', '8', '10'],
  },
  {
    _id: '8',
    firstname: 'Kelsea',
    lastname: 'Steadman',
    friendIds: ['6', '7', '11', '12', '13', '14'],
  },
  {
    _id: '9',
    firstname: 'Amiee',
    lastname: 'Dominguez',
    friendIds: ['6', '15', '17', '18'],
  },
  {
    _id: '10',
    firstname: 'Saxon',
    lastname: 'Ford',
    friendIds: ['4', '7', '16', '17', '18'],
  },
  {
    _id: '11',
    firstname: 'Usmaan',
    lastname: 'Searle',
    friendIds: ['4', '8', '16', '19', '20'],
  },
  {
    _id: '12',
    firstname: 'Alma',
    lastname: 'Cano',
    friendIds: ['3', '8', '19', '20'],
  },
  {
    _id: '13',
    firstname: 'Albie',
    lastname: 'Arnold',
    friendIds: ['3', '5', '8', '15', '16', '20'],
  },
  {
    _id: '14',
    firstname: 'Izabel',
    lastname: 'Wiggins',
    friendIds: ['5', '8', '15', '20'],
  },
  {
    _id: '15',
    firstname: 'Fearne',
    lastname: 'Becker',
    friendIds: ['9', '13', '14', '18', '19'],
  },
  {
    _id: '16',
    firstname: 'Kamran',
    lastname: 'Stott',
    friendIds: ['10', '11', '13'],
  },
  {
    _id: '17',
    firstname: 'Justine',
    lastname: 'Fraser',
    friendIds: ['9', '10'],
  },
  {
    _id: '18',
    firstname: 'Scott',
    lastname: 'Le',
    friendIds: ['4', '9', '10', '15'],
  },
  {
    _id: '19',
    firstname: 'Breanna',
    lastname: 'Gardiner',
    friendIds: ['4', '11', '12', '15'],
  },
  {
    _id: '20',
    firstname: 'Adeel',
    lastname: 'Watkins',
    friendIds: ['4', '11', '12', '13', '14'],
  },
];
