import builder from '../graphql-builder';
import { StringFilter } from './common.entity';

export const User = builder.prismaObject('User', {
	fields: t => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		balance: t.expose('balance', { type: 'Decimal' }),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
	}),
});

export const CreateUserInput = builder.inputType('CreateUserInput', {
	fields: t => ({
		name: t.string({ required: true }),
	}),
});

export const UsersFilter = builder.prismaWhere('User', {
	fields: {
		id: 'String',
		name: StringFilter,
	},
	name: 'UsersFilter',
});

export const UsersOrderBy = builder.prismaOrderBy('User', {
	fields: {
		balance: true,
		createdAt: true,
		updatedAt: true,
	},
	name: 'UsersOrderBy',
});
