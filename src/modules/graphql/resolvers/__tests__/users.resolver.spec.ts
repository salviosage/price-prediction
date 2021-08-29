import 'reflect-metadata';
import { disconnect, testConnect } from '../../../../database/connect';
import { graphQLTestSchema } from '../../../../utils/graphql.utils';
import {
  profileMock,
  signinMock,
  signinMockError,
  signupMock,
} from '../__mocks__/users.mock';
import {
  profileQueryMock,
  signInMutationMock,
  signUpMutationMock,
} from '../__mocks__/users.schemas.mock';

describe('UserResolver', () => {
  beforeAll(async () => {
    await testConnect();
  });
  afterAll(async () => {
    await disconnect();
  });
  it('UserResolver->profile', async () => {
    const graph = await graphQLTestSchema({
      source: profileQueryMock,
      variableValues: profileMock,
    });
    expect(typeof graph).toBe('object');
  });
  describe('signup', () => {
    it('UserResolver->signup', async () => {
      const graph = await graphQLTestSchema({
        source: signUpMutationMock,
        variableValues: signupMock,
      });
      expect(typeof graph).toEqual('object');
    });
  });
  describe('signin()', () => {
    it('userResolver()->signin()', async () => {
      const graph = await graphQLTestSchema({
        source: signInMutationMock,
        variableValues: signinMock,
      });
      expect(typeof graph).toBe('object');
    });
    it('userResolver()->signin() should throw an error', async () => {
      const graph = await graphQLTestSchema({
        source: signInMutationMock,
        variableValues: signinMockError,
      });
      expect(typeof graph).toBe('object');
      expect(graph).toHaveProperty('errors');
    });
  });
});
