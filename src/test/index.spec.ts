import { ApolloServer, gql } from 'apollo-server-express'
import { expect } from 'chai'
import userResolvers from '../resolvers/userResolver'
import schema from '../schema/index'

const ql = gql`
  query Mutation($registerInput: RegisterInput) {
    createUser(registerInput: $registerInput) {
      token
      user {
        role
        id
      }
    }
  }
`
describe('User mutations', () => {
    const testServer = new ApolloServer({
        typeDefs: schema,
        resolvers: userResolvers,
    })
    it('Should return error as email is taken', async () => {
        const result = await testServer.executeOperation({
            query: ql,
            variables: {
                registerInput: {
                    email: 'admin@gmail.com',
                    password: 'Andela123',
                },
            },
        })
        expect(result.errors).to.be.a('Array')
    })
})
