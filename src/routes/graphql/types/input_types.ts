import { 
  GraphQLBoolean, 
  GraphQLFloat, 
  GraphQLInputObjectType, 
  GraphQLInt, 
  GraphQLString 
} from "graphql";

import { MemberTypeIdEnum } from "./member_types.js";
import { UUIDType } from "./uuid.js";


export const  UserCreateInput = new GraphQLInputObjectType({
  name: 'UserCreateInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});

export const ProfileCreateInput = new GraphQLInputObjectType({
  name: 'ProfileCreateInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
    userId: { type: UUIDType },
  },
});

export const ProfileChangeInput = new GraphQLInputObjectType({
  name: 'ProfileChangeInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});