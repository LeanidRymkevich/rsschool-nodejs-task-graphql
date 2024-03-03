import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { gqlTypesSchema } from './schemas.js';

const UNKNOWN_ERR_MSG = 'Unknown error';

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

       try {
        return await graphql({
          schema: gqlTypesSchema,
          source: query,
          contextValue: prisma,
          variableValues: variables
        });
       } catch (err) {
        const msg = err instanceof Error ? (err.message || UNKNOWN_ERR_MSG) : UNKNOWN_ERR_MSG;

        return {errors: [msg]};
       }
    },
  });
};

export default plugin;
