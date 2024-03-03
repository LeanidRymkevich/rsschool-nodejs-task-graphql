import { 
  GraphQLBoolean, 
  GraphQLInt, 
  GraphQLNonNull, 
  GraphQLObjectType
} from "graphql";
import { MemberType, PrismaClient, Profile, User } from "@prisma/client";

import { UUIDType } from "./uuid.js";
import { MemberTypeGql, MemberTypeIdEnum } from "./member_types.js";
import { UserType } from "./user.js";

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(MemberTypeIdEnum)},
    user: {
      type: UserType,
      resolve: async (source: Profile, _args: unknown, context: PrismaClient): Promise<User | null> => {
       return await context.user.findUnique({ where: { id: source.userId } });
      },
    },
    memberType: {
      type: MemberTypeGql,
      resolve: async (source: Profile, _args: unknown, context: PrismaClient): Promise<MemberType | null> => {
        return await context.memberType.findUnique({ where: { id: source.memberTypeId } }); 
      },
    },
  }
});