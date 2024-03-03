import { 
  GraphQLBoolean, 
  GraphQLInt, 
  GraphQLNonNull, 
  GraphQLObjectType
} from "graphql";
import { MemberType, Profile, User } from "@prisma/client";

import { IContext } from "../interfaces.js";

import { UUIDType } from "./uuid.js";
import { MemberTypeGql, MemberTypeIdEnum } from "./member_types.js";
import { UserType } from "./user.js";

export const ProfileType: GraphQLObjectType<Profile, IContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(MemberTypeIdEnum)},
    user: {
      type: UserType,
      resolve: async (source, _args, { prisma }): Promise<User | null> => {
       return await prisma.user.findUnique({ where: { id: source.userId } });
      },
    },
    memberType: {
      type: MemberTypeGql,
      resolve: async (source, _args, { prisma }): Promise<MemberType | null> => {
        return await prisma.memberType.findUnique({ where: { id: source.memberTypeId } }); 
      },
    },
  }),
});