import { 
  GraphQLFloat, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLObjectType, 
  GraphQLString
} from "graphql";
import { Post, Profile, User } from "@prisma/client";

import { IContext } from "../interfaces.js";

import { UUIDType } from "./uuid.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const UserType: GraphQLObjectType<User, IContext> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: { type: new GraphQLNonNull(GraphQLFloat)},
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, _args, { prisma }): Promise<Post[]> => {
        return await prisma.post.findMany({ where: { authorId: source.id } })
      }
    },
    profile: {
      type: ProfileType,
      resolve: async (source, _args, { prisma }): Promise<Profile | null> => {
         return await prisma.profile.findUnique({ where: { userId: source.id }});
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args, { prisma }): Promise<User[]> => {
        return prisma.user.findMany({ where: { userSubscribedTo: { some: { authorId: source.id } } } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args, { prisma }): Promise<User[]> => {
        return prisma.user.findMany({ where: { userSubscribedTo: { some: { subscriberId: source.id } } } });
      },
    }
  })
});