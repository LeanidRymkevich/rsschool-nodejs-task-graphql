import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PrismaClient } from "@prisma/client";

import { UserType } from "./user.js";
import { UUIDType } from "./uuid.js";
import { MemberType } from "./member_types.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<unknown> => {  
        return await context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    memberType: {
      type: MemberType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<unknown> => {  
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    post: {
      type: PostType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<unknown> => {  
        return await context.post.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    profile: {
      type: ProfileType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<unknown> => {  
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<unknown> => {  
        return await context.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<unknown> => {  
        return await context.memberType.findMany();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<unknown> => {  
        return await context.post.findMany();
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<unknown> => {  
        return await context.profile.findMany();
      }
    },
  }
});