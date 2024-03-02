import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { gqlTypesSchema } from './schemas.js';

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
      return graphql({
        schema: gqlTypesSchema, // TODO make a appropriate Schema
        source: req.body.query,
        rootValue: {}, // TODO make a rootValue
        contextValue: prisma,
        variableValues: req.body.variables
      });
    },
  });
};

export default plugin;
