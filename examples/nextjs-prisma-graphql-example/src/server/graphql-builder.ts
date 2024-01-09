import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import prisma from './drives/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import TracingPlugin, { wrapResolver, isRootField } from '@pothos/plugin-tracing';

export interface GraphQLContext {
	prisma: PrismaClient;
	origin: string;
}

const builder = new SchemaBuilder<{
	Context: GraphQLContext;
	PrismaTypes: PrismaTypes;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date;
		};
		JSON: {
			Input: any;
			Output: any;
		};
		Decimal: {
			Input: Prisma.Decimal;
			Output: Prisma.Decimal;
		};
	};
}>({
	plugins: [RelayPlugin, PrismaPlugin, PrismaUtils, TracingPlugin],
	relayOptions: {
		clientMutationId: 'omit',
		cursorType: 'String',
	},
	prisma: {
		client: prisma,
		exposeDescriptions: true,
		filterConnectionTotalCount: true,
	},
	tracing: {
		default: config => isRootField(config),
		wrap: (resolver, options, config) =>
			wrapResolver(resolver, (error, duration) => {
				console.log(`Executed resolver ${config.parentType}.${config.name} in ${duration.toFixed(2)}ms`);
			}),
	},
});

// Add root Query and Mutation types to schema
builder.queryType({});
builder.mutationType({});
builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('JSON', JSONResolver, {});
builder.scalarType('Decimal', {
	serialize: value => value.toString(),
	parseValue: value => {
		if (typeof value !== 'string') {
			throw new TypeError('Decimal must be a string');
		}

		return new Prisma.Decimal(value);
	},
});

export default builder;
