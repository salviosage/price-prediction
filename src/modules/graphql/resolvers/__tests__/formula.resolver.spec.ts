import 'reflect-metadata';
import { graphQLTestSchema } from '../../../../utils/graphql.utils';
import {
  calculateMock,
  calculateMockSchema,
} from '../__mocks__/formula.schemas.mock';

describe('formula resolver', () => {
  it('should calculate a totalPrice', async () => {
    const graph = await graphQLTestSchema({
      source: calculateMockSchema,
      variableValues: calculateMock,
    });
    expect(typeof graph).toBe('object');
  });
  it('should throw an error when depreciation name is not found', async () => {
    calculateMock.depreciationName = 'lif';
    const graph = await graphQLTestSchema({
      source: calculateMockSchema,
      variableValues: calculateMock,
    });
    expect(typeof graph).toBe('object');
    expect(graph).toHaveProperty('errors');
  });
});
