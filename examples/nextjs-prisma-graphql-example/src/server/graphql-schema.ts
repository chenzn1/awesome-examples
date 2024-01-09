import { writeFileSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { join } from 'path';
import builder from './graphql-builder';

// Import your types here
import './resolvers';

export const schema = builder.toSchema({});

// Only generate in development or when the yarn run generate:schema command is run
// This fixes deployment on Netlify, otherwise you'll run into an EROFS error during building
const shouldGenerateArtifacts =
	process.env.NODE_ENV === 'development' || !!process.env.GENERATE;

if (shouldGenerateArtifacts) {
	const schemaAsString = printSchema(lexicographicSortSchema(schema));

	writeFileSync(join(__dirname, './schema.graphql'), schemaAsString);
}
