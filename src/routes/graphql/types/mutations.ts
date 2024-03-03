import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { User } from "@prisma/client";

import { 
  IChangeUserData, 
  IContext, 
  ICreateUserData, 
  ISource, 
  ISubscribeToData
} from "../interfaces.js";

import { UserType } from "./user.js";
import { UserCreateInput } from "./input_types.js";
import { UUIDType } from "./uuid.js";

export const mutation: GraphQLObjectType<ISource, IContext> = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
    	args: { dto: { type: new GraphQLNonNull(UserCreateInput) } },
      resolve: async (_source, args: ICreateUserData, { prisma }): Promise<User> => {
        return await prisma.user.create({ data: args.dto });
      },
    },  
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: UserCreateInput },
      },
      resolve: async (_source, args: IChangeUserData, { prisma }): Promise<User> => {
        return await prisma.user.update({ where: { id: args.id }, data: args.dto });
      },
    },
    deleteUser: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: {id: string}, { prisma }): Promise<void> => {
        await prisma.user.delete({ where: { id: args.id } });
      },
    },
    subscribeTo: {
      type: UserType as GraphQLObjectType,
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
      resolve: async (_source: unknown, args: ISubscribeToData, { prisma }): Promise<void> => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
      },
    },
  },
});