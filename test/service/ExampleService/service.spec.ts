import sinon from 'sinon';
import DataLoader from 'dataloader';

import { ExampleService } from '../../../src/services/ExampleService/service';
import {
  getUserData,
  resetUserData,
} from '../../../src/services/ExampleService/data';
import { EServiceName } from '../../../src/services/service/enums';
import { LoggingService } from '../../../src/services/LoggingService';
import { User } from '../../../src/graphql/typeDefs/models/User';

describe('Service: ExampleService', () => {
  describe('constructor', () => {
    it('creates an Example service', () => {
      const example = new ExampleService();
      expect(example.getServiceName()).toEqual(EServiceName.ExampleService);
      expect(example.getImplementationName()).toEqual('ExampleService');
    });
    it('uses the given logger', async () => {
      const example = new ExampleService();
      const loggerSpy = sinon.spy();
      await example.init({
        getUserData,
        logger: () => loggerSpy,
      });
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses the default logger when not given one', async () => {
      const example = new ExampleService();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await example.init({ getUserData });
      expect(loggerSpy.calledOnce).toBe(true);
    });
  });

  describe('methods', () => {
    let example: ExampleService;
    let getUserDataSpy: sinon.SinonSpy;
    let fixture: User[];

    beforeEach(async () => {
      fixture = [...getUserData()];
      example = new ExampleService();
      getUserDataSpy = sinon.spy(getUserData);
      await example.init({ getUserData: getUserDataSpy });
      getUserDataSpy.resetHistory();
    });

    afterEach(() => resetUserData());

    describe('newContext() & getLoader()', () => {
      it('creates a DataLoader instance', () => {
        example.newContext();
        expect(example.getLoader()).toBeInstanceOf(DataLoader);
      });
      it('creates a new DataLoader per context', () => {
        example.newContext();
        expect(example.getLoader()).toBeInstanceOf(DataLoader);
        const loader = example.getLoader();
        example.newContext();
        expect(example.getLoader()).toBeInstanceOf(DataLoader);
        expect(example.getLoader()).not.toBe(loader);
      });
    });

    describe('getUser()', () => {
      it('gets the specified user', async () => {
        const data = await example.getUser('1');
        expect(data).toEqual(fixture[0]);
      });
    });

    describe('getUsers()', async () => {
      it('gets users (without limit)', async () => {
        const data = await example.getUsers();
        expect(data).toEqual(fixture);
      });
      it('gets users (limit: 10)', async () => {
        const data = await example.getUsers(10);
        expect(data).toEqual(fixture.slice(0, 10));
      });
    });

    describe('loadUser()', () => {
      it('loads the specified user', async () => {
        example.newContext();
        const data = await example.loadUser('1');
        expect(data).toEqual(fixture[0]);
      });
      it('batches user loads together', async () => {
        example.newContext();
        const data = await Promise.all([
          example.loadUser('10'),
          example.loadUser('1'),
          example.loadUser('2'),
          example.loadUser('3'),
          example.loadUser('4'),
        ]);
        expect(data).toEqual([fixture[9], ...fixture.slice(0, 4)]);
        expect(getUserDataSpy.calledOnce).toBe(true);
      });
    });

    describe('loadUsers()', () => {
      it('loads the specified users', async () => {
        example.newContext();
        const data = await example.loadUsers(['1', '5']);
        expect(data).toEqual([fixture[0], fixture[4]]);
      });
      it('batches user loads together', async () => {
        example.newContext();
        const data = await Promise.all([
          example.loadUsers(['1', '2', '3']),
          example.loadUsers(['2', '3', '4']),
        ]);
        expect(data).toEqual([fixture.slice(0, 3), fixture.slice(1, 4)]);
        expect(getUserDataSpy.calledOnce).toBe(true);
      });
    });

    describe('addUser()', () => {
      it('adds a user', async () => {
        example.newContext();
        const data = await example.addUser({
          firstname: 'John',
          lastname: 'Smith',
        });
        expect(data).toEqual({
          _id: '21',
          firstname: 'John',
          lastname: 'Smith',
          friendIds: [],
        });
        expect(getUserData()).toEqual(
          fixture.concat([
            {
              _id: '21',
              firstname: 'John',
              lastname: 'Smith',
              friendIds: [],
            },
          ]),
        );
      });
    });

    describe('deleteUser()', () => {
      it('removes a user', async () => {
        example.newContext();
        const data = await example.deleteUser('1');
        expect(data).toEqual(fixture.slice(1));
        expect(getUserData()).toEqual(fixture.slice(1));
      });
      it('does not modify the data when deleting a non-existent user', async () => {
        example.newContext();
        const data = await example.deleteUser('100');
        expect(data).toEqual(fixture);
        expect(getUserData()).toEqual(fixture);
      });
    });
  });
});
