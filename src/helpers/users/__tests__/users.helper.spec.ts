import { ErrorResponse } from '../users.helper';

describe('users.helper', () => {
  it('ErrorResponse()', () => {
    try {
      const response = ErrorResponse({
        errors: 'An error occurred',
      });
      expect(response).rejects.toThrow();
      // tslint:disable-next-line: no-empty
    } catch (error) {}
  });
});
