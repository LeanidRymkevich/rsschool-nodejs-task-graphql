import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Post, User } from "@prisma/client";

import { IContext } from "../interfaces.js";

import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

export const PostType: GraphQLObjectType<Post, IContext> = new GraphQLObjectType({
  name: 'Post',
  fields: () =>({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: UserType,
      resolve: async (source, _args, { prisma }): Promise<User | null> => {
        return await prisma.user.findUnique({ where: { id: source.authorId } }); 
      },
    },
  }),
});