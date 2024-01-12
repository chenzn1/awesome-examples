import { createYoga } from 'graphql-yoga';

import prisma from '@/server/drives/prisma';
import { schema } from '@/server/graphql-schema';
const { handleRequest } = createYoga({
	schema,
	graphqlEndpoint: '/api/graphql',
	fetchAPI: { Response, Headers },
	context: async () => {
		return { prisma };
	},
});

export const GET = handleRequest;
export const POST = handleRequest;
