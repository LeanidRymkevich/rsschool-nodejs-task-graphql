import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GraphQLError, graphql, parse, validate } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { gqlTypesSchema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

const UNKNOWN_ERR_MSG = 'Unknown error';
const DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const {query, variables} = req.body;
      const errorArr: readonly GraphQLError[] = 
        validate(gqlTypesSchema, parse(query), [depthLimit(DEPTH_LIMIT)]);

      if (errorArr.length > 0) return {errors: errorArr};

      try {       
        return await graphql({
          schema: gqlTypesSchema,
          source: query,
          contextValue: { prisma },
          variableValues: variables,
        });
      } catch (err) {
        const msg = err instanceof Error ? (err.message || UNKNOWN_ERR_MSG) : UNKNOWN_ERR_MSG;

        return {errors: [msg]};
      }
    },
  });
};

export default plugin;
