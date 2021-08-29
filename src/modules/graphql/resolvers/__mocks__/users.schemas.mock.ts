export const signUpMutationMock = `
mutation($firstName: String!, $lastName: String!,
$phoneNumber: String!, $userType:String!){
    signup(firstName: $firstName, lastName: $lastName,
    phoneNumber: $phoneNumber, userType: $userType){
        firstName
        lastName
        phoneNumber
    }
}
`;

export const profileQueryMock = `query{
    profile{
      firstName
      lastName
    }
}`;

export const signInMutationMock = `
mutation($phoneNumber: String!){
  signin(phoneNumber: $phoneNumber){
    token,
    user{
      phoneNumber
    }
  }
}`;
