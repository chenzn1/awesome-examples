import builder from '../graphql-builder';

export const StringFilter = builder.prismaFilter('String', {
	ops: ['contains', 'equals', 'startsWith', 'is', 'not'],
});
