import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLObjectType
} from "graphql";
import { MemberType, PrismaClient, Profile } from "@prisma/client";

import { MemberTypeId } from '../../member-types/schemas.js';
import { ProfileType } from "./profile.js";

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberTypeGql = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source: MemberType, _args: unknown, context: PrismaClient): Promise<Profile[]> => {
        return await context.profile.findMany({ where: { memberTypeId: source.id } }); 
      },
    },
  },
});