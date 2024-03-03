import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLObjectType
} from "graphql";
import { MemberType, Profile } from "@prisma/client";

import { IContext } from "../interfaces.js";

import { MemberTypeId } from '../../member-types/schemas.js';
import { ProfileType } from "./profile.js";

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberTypeGql: GraphQLObjectType<MemberType, IContext> = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, _args, { prisma }): Promise<Profile[]> => {
        return await prisma.profile.findMany({ where: { memberTypeId: source.id } }); 
      },
    },
  }),
});