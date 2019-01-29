import sinon from 'sinon';
import axios from 'axios';
import mockResponse from '../../utils/mockAxiosResponse';
import {
  AxiosNetworkService,
  INetworkService,
} from '../../../src/services/NetworkService';
import { LoggingService } from '../../../src/services/LoggingService';
import { EServiceName } from '../../../src/services/service/enums';

describe('AxiosNetworkService', () => {
  describe('constructor', () => {
    it('creates a network service', () => {
      const library = new AxiosNetworkService();
      expect(library.getServiceName()).toEqual(EServiceName.NetworkService);
      expect(library.getImplementationName()).toEqual('AxiosNetworkService');
    });
    it('uses the given logger', async () => {
      const net = new AxiosNetworkService();
      const loggerSpy = sinon.spy();
      await net.init({ log: () => loggerSpy });
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses the default logger when not given one', async () => {
      const net = new AxiosNetworkService();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await net.init({});
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses axios by default', async () => {
      const axiosStub = sinon.stub(axios, 'get');
      axiosStub.callsFake(() => mockResponse({}));
      const net = new AxiosNetworkService();
      await net.init({});
      await net.get({ url: 'hello' });
      expect(axiosStub.calledOnce).toBe(true);
      expect(axiosStub.args[0][0]).toEqual('hello');
      expect(axiosStub.args[0][1]).toEqual({});
      axiosStub.restore();
    });
    it('uses given client', async () => {
      const client = { get: sinon.stub() };
      client.get.callsFake(() => mockResponse({}));
      const net = new AxiosNetworkService();
      await net.init({ client: client as any });
      await net.get({ url: 'hello' });
      expect(client.get.calledOnce).toBe(true);
      expect(client.get.args[0][0]).toEqual('hello');
      expect(client.get.args[0][1]).toEqual({});
    });
  });

  describe('network requests', () => {
    let net: INetworkService;

    beforeEach(async () => {
      net = new AxiosNetworkService();
      await net.init({});
    });

    describe('get()', () => {
      let getStub: sinon.SinonStub;
      beforeAll(() => {
        getStub = sinon.stub(axios, 'get');
        getStub.callsFake(() =>
          mockResponse({
            data: 'post data',
            status: 200,
            statusText: 'ok',
            headers: null,
          }),
        );
      });
      afterAll(() => getStub.restore());
      beforeEach(() => getStub.resetHistory());

      it('sends a GET request and receives expected response', async () => {
        const result = await net.get({
          url: 'myurl',
          headers: { authorization: 'token' },
          params: { limit: 10 },
        });
        expect(result).toEqual({
          data: 'post data',
          status: 200,
          statusText: 'ok',
          headers: null,
        });
        expect(getStub.calledOnce).toBe(true);
        expect(getStub.args[0][0]).toEqual('myurl');
        expect(getStub.args[0][1]).toEqual({
          headers: { authorization: 'token' },
          params: { limit: 10 },
        });
      });
      it('sends a GET request (no params)', () => {
        net.get({ url: 'myurl', headers: { authorization: 'token' } });
        expect(getStub.calledOnce).toBe(true);
        expect(getStub.args[0][0]).toEqual('myurl');
        expect(getStub.args[0][1]).toEqual({
          headers: { authorization: 'token' },
        });
      });
      it('sends a GET request (no headers)', () => {
        net.get({ url: 'myurl', params: { limit: 10 } });
        expect(getStub.calledOnce).toBe(true);
        expect(getStub.args[0][0]).toEqual('myurl');
        expect(getStub.args[0][1]).toEqual({
          params: { limit: 10 },
        });
      });
      it('sends a GET request (no headers and params)', () => {
        net.get({ url: 'myurl' });
        expect(getStub.calledOnce).toBe(true);
        expect(getStub.args[0][0]).toEqual('myurl');
        expect(getStub.args[0][1]).toEqual({});
      });
    });

    describe('post()', () => {
      let postStub: sinon.SinonStub;
      beforeAll(() => {
        postStub = sinon.stub(axios, 'post');
        postStub.callsFake(() =>
          mockResponse({
            data: 'post data',
            status: 200,
            statusText: 'ok',
            headers: null,
          }),
        );
      });
      afterAll(() => postStub.restore());
      beforeEach(() => postStub.resetHistory());

      it('sends a POST request and receives expected data', async () => {
        const result = await net.post({
          url: 'myurl',
          headers: { authorization: 'token' },
          body: 'data',
        });
        expect(result).toEqual({
          data: 'post data',
          status: 200,
          statusText: 'ok',
          headers: null,
        });
        expect(postStub.calledOnce).toBe(true);
        expect(postStub.args[0][0]).toEqual('myurl');
        expect(postStub.args[0][1]).toEqual('data');
        expect(postStub.args[0][2]).toEqual({
          headers: { authorization: 'token' },
        });
      });
      it('sends a POST request (no body)', () => {
        net.post({ url: 'myurl', headers: { authorization: 'token' } });
        expect(postStub.calledOnce).toBe(true);
        expect(postStub.args[0][0]).toEqual('myurl');
        expect(postStub.args[0][1]).toBeUndefined();
        expect(postStub.args[0][2]).toEqual({
          headers: { authorization: 'token' },
        });
      });
      it('sends a POST request (no headers)', () => {
        net.post({ url: 'myurl', body: 'data' });
        expect(postStub.calledOnce).toBe(true);
        expect(postStub.args[0][0]).toEqual('myurl');
        expect(postStub.args[0][1]).toEqual('data');
        expect(postStub.args[0][2]).toEqual({});
      });
      it('sends a POST request (no headers and params)', () => {
        net.post({ url: 'myurl' });
        expect(postStub.calledOnce).toBe(true);
        expect(postStub.args[0][0]).toEqual('myurl');
        expect(postStub.args[0][1]).toBeUndefined();
        expect(postStub.args[0][2]).toEqual({});
      });
    });

    describe('delete()', () => {
      let deleteStub: sinon.SinonStub;
      beforeAll(() => {
        deleteStub = sinon.stub(axios, 'delete');
        deleteStub.callsFake(() =>
          mockResponse({
            data: 'post data',
            status: 200,
            statusText: 'ok',
            headers: null,
          }),
        );
      });
      afterAll(() => deleteStub.restore());
      beforeEach(() => deleteStub.resetHistory());

      it('sends a DELETE request and receives expected response', async () => {
        const result = await net.delete({
          url: 'myurl',
          headers: { authorization: 'token' },
          params: { limit: 10 },
        });
        expect(result).toEqual({
          data: 'post data',
          status: 200,
          statusText: 'ok',
          headers: null,
        });
        expect(deleteStub.calledOnce).toBe(true);
        expect(deleteStub.args[0][0]).toEqual('myurl');
        expect(deleteStub.args[0][1]).toEqual({
          headers: { authorization: 'token' },
          params: { limit: 10 },
        });
      });
      it('sends a DELETE request (no params)', () => {
        net.delete({ url: 'myurl', headers: { authorization: 'token' } });
        expect(deleteStub.calledOnce).toBe(true);
        expect(deleteStub.args[0][0]).toEqual('myurl');
        expect(deleteStub.args[0][1]).toEqual({
          headers: { authorization: 'token' },
        });
      });
      it('sends a DELETE request (no headers)', () => {
        net.delete({ url: 'myurl', params: { limit: 10 } });
        expect(deleteStub.calledOnce).toBe(true);
        expect(deleteStub.args[0][0]).toEqual('myurl');
        expect(deleteStub.args[0][1]).toEqual({
          params: { limit: 10 },
        });
      });
      it('sends a DELETE request (no headers and params)', () => {
        net.delete({ url: 'myurl' });
        expect(deleteStub.calledOnce).toBe(true);
        expect(deleteStub.args[0][0]).toEqual('myurl');
        expect(deleteStub.args[0][1]).toEqual({});
      });
    });
  });
});
