import { 
  GraphQLFloat, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLObjectType, 
  GraphQLString
} from "graphql";
import { Post, PrismaClient, Profile, User } from "@prisma/client";

import { UUIDType } from "./uuid.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: { type: new GraphQLNonNull(GraphQLFloat)},
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source: User, _args: unknown, context: PrismaClient): Promise<Post[]> => {
        return await context.post.findMany({ where: { authorId: source.id } })
      }
    },
    profile: {
      type: ProfileType,
      resolve: async (source: User, _args: unknown, context: PrismaClient): Promise<Profile | null> => {
         return await context.profile.findUnique({ where: { userId: source.id }});
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source: User, _args: unknown, context: PrismaClient): Promise<User[]> => {
        return context.user.findMany({ where: { userSubscribedTo: { some: { authorId: source.id } } } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source: User, _args: unknown, context: PrismaClient): Promise<User[]> => {
        return context.user.findMany({ where: { userSubscribedTo: { some: { subscriberId: source.id } } } });
      },
    }
  })
});