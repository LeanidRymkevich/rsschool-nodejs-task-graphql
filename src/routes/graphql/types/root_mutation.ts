import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { Post, Profile, User } from "@prisma/client";

import { 
  IChangePostData,
  IChangeProfileData,
  IChangeUserData, 
  IContext, 
  ICreatePostData, 
  ICreateProfileData, 
  ICreateUserData, 
  ISource, 
  ISubscribeToData
} from "../interfaces.js";

import { UserType } from "./user.js";
import {
  CreatePostInput,
  ChangePostInput,
  ChangeProfileInput,
  CreateProfileInput, 
  CreateUserInput, 
  ChangeUserInput
} from "./input_types.js";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const RootMutation: GraphQLObjectType<ISource, IContext> = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: {
      type: UserType,
    	args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: async (_source, args: ICreateUserData, { prisma }): Promise<User> => {
        return await prisma.user.create({ data: args.dto });
      },
    },  
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeUserInput },
      },
      resolve: async (_source, args: IChangeUserData, { prisma }): Promise<User> => {
        return await prisma.user.update({ where: { id: args.id }, data: args.dto });
      },
    },
    deleteUser: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: {id: string}, { prisma }): Promise<string> => {
        await prisma.user.delete({ where: { id: args.id } });
        return args.id;
      },
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source: unknown, args: ISubscribeToData, { prisma }): Promise<User> => {
        return await prisma.user.update({
          where: { id: args.userId },
          data: { userSubscribedTo: { create: { authorId: args.authorId } } },
        });
      },
    },
    unsubscribeFrom: {
      type: UUIDType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source: unknown, args: ISubscribeToData, { prisma }): Promise<string> => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return args.userId;
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: async (_source, args: ICreateProfileData, { prisma }): Promise<Profile> => {
        return await  prisma.profile.create({ data: args.dto });
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeProfileInput },
      },
      resolve: async (_source, args: IChangeProfileData, { prisma }): Promise<Profile> => {
        return await prisma.profile.update({ where: { id: args.id }, data: args.dto });
      },
    },
    deleteProfile: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, args: {id: string}, { prisma }): Promise<string> => {
        await prisma.profile.delete({ where: { id: args.id } });
        return args.id;
      },
    },
    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (_source, args: ICreatePostData, { prisma }): Promise<Post> => {
        return await  prisma.post.create({ data: args.dto });
      },
    },
    changePost: {
      type: PostType,
      args: { 
        id: { type: new GraphQLNonNull(UUIDType) }, 
        dto: { type: ChangePostInput } 
      },
      resolve: async (_source, args: IChangePostData, { prisma }): Promise<Post> => {
        return await prisma.post.update({ where: { id: args.id }, data: args.dto });
      },
    },
    deletePost: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, args: {id: string}, { prisma }): Promise<string> => {
        await prisma.post.delete({ where: { id: args.id } });
        return args.id;
      },
    },
  },
});