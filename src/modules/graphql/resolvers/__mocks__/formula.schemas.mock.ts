export const calculateMockSchema = `mutation calculate($distance: String!, $time: String!, $depreciationName: String!){
    calculate(distance: $distance, time: $time, depreciationName: $depreciationName){
      totalPrice
    }
  }`;

export const calculateMock = {
  distance: '1',
  depreciationName: 'Lifan',
  time: '3',
};
