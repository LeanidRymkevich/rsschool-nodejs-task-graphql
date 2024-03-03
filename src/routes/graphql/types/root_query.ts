import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, Post, PrismaClient, Profile, User } from "@prisma/client";

import { UserType } from "./user.js";
import { UUIDType } from "./uuid.js";
import { MemberTypeGql } from "./member_types.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<User | null> => {  
        return await context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    memberType: {
      type: MemberTypeGql,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<MemberType | null> => {  
        return await context.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    post: {
      type: PostType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<Post | null> => {  
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
      resolve: async (_source: unknown, args: {id: string}, context: PrismaClient): Promise<Profile | null> => {  
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<User[]> => {  
        return await context.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberTypeGql),
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<MemberType[]> => {  
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
      resolve: async (_source: unknown, _args: unknown, context: PrismaClient): Promise<Profile[]> => {  
        return await context.profile.findMany();
      }
    },
  }
});