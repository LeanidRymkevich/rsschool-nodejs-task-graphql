import { 
  GraphQLBoolean, 
  GraphQLFloat, 
  GraphQLInputObjectType, 
  GraphQLInt, 
  GraphQLString 
} from "graphql";

import { MemberTypeIdEnum } from "./member_types.js";
import { UUIDType } from "./uuid.js";


export const  CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});

export const  ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
    userId: { type: UUIDType },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});