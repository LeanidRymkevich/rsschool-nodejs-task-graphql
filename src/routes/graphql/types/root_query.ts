import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, Post, Profile, User } from "@prisma/client";

import { IContext, ISource } from "../interfaces.js";

import { UserType } from "./user.js";
import { UUIDType } from "./uuid.js";
import { MemberTypeGql } from "./member_types.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const RootQuery = new GraphQLObjectType<ISource, IContext>({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source, args: {id: string}, {prisma}): Promise<User | null> => {  
        return await prisma.user.findUnique({ where: { id: args.id } });
      }
    },
    memberType: {
      type: MemberTypeGql,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source, args: {id: string}, {prisma}): Promise<MemberType | null> => {  
        return await prisma.memberType.findUnique({ where: { id: args.id } });
      }
    },
    post: {
      type: PostType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source, args: {id: string}, {prisma}): Promise<Post | null> => {  
        return await prisma.post.findUnique({ where: { id: args.id } });
      }
    },
    profile: {
      type: ProfileType,
      args: {id: {type: new GraphQLNonNull(UUIDType)}},
      resolve: async (_source, args: {id: string}, {prisma}): Promise<Profile | null> => {  
        return await prisma.profile.findUnique({ where: { id: args.id } });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, {prisma}): Promise<User[]> => {  
        return await prisma.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberTypeGql),
      resolve:  async (_source, _args, {prisma}): Promise<MemberType[]> => {  
        return await prisma.memberType.findMany();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source, _args, {prisma}): Promise<unknown> => {  
        return await prisma.post.findMany();
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, {prisma}): Promise<Profile[]> => {  
        return await prisma.profile.findMany();
      }
    },
  }
});