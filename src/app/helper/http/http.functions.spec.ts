import { getApiEndpointFromUrl } from './http.functions';

describe('getApiEndpointFromUrl', () => {
  test.each`
    input
    ${undefined}
    ${null}
    ${''}
    ${'noapi'}
    ${'/'}
    ${'//'}
    ${'////'}
    ${'/api/'}
  `('should return undefined if not a valid url is provided: $input', ({ input }) => {
    expect(getApiEndpointFromUrl(input)).toEqual(undefined);
  });

  it('should return the provided endpoint when it is valid', () => {
    expect(getApiEndpointFromUrl('/api/testapi')).toEqual('testapi');
  })
})
