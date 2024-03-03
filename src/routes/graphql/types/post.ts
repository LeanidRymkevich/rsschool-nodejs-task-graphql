import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Post, PrismaClient, User } from "@prisma/client";

import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {type: new GraphQLNonNull(UUIDType)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    author: {
      type: UserType,
      resolve: async (source: Post, _args: unknown, context: PrismaClient): Promise<User | null> => {
        return await context.user.findUnique({ where: { id: source.authorId} }); 
      },
    },
  }
});