import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";


export const  UserCreateInput = new GraphQLInputObjectType({
  name: 'UserCreateInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});
