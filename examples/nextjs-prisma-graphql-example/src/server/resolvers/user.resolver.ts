import prisma from "../drives/prisma";
import { CreateUserInput, User, UsersFilter, UsersOrderBy } from "../entities";
import builder from "../graphql-builder";
import { createUser, deleteUser, updateUser } from "../services";

builder.queryFields(t => ({
	userTotalCount: t.field({
		type: 'Int',
		nullable: false,
		args: {
			where: t.arg({ type: UsersFilter, required: false }),
		},
		resolve: async (__, args, ctx) => {
			const { where } = args;
			const count = await prisma.user.count({
				where: {
					...where,
          deleted: false
				},
			});
			return count;
		},
	}),
  users: t.prismaField({
		type: [User],
		nullable: false,
		args: {
			take: t.arg({ type: 'Int', required: true }),
			skip: t.arg({ type: 'Int', required: true }),
			where: t.arg({ type: UsersFilter, required: false }),
			orderBy: t.arg({ type: UsersOrderBy, required: false }),
		},
		resolve: async (args, __, extArgs, ctx) => {
			const { where, orderBy, take, skip } = extArgs;
			const list = await prisma.user.findMany({
				...args,
				where: {
					...where,
          deleted: false
				},
				take,
				skip,
				orderBy: orderBy ? orderBy : { createdAt: 'desc' },
			});

			return list;
		},
	}),
}))

builder.mutationFields(t => ({
	createUser: t.field({
		type: User,
		nullable: false,
		args: {
			data: t.arg({ type: CreateUserInput, required: true }),
		},
		resolve: (_, args) => createUser(args.data)
	}),
	updateUser: t.field({
		type: User,
		nullable: false,
		args: {
			id: t.arg({ type: 'String', required: true  }),
			data: t.arg({ type: CreateUserInput, required: true }),
		},
		resolve: (_, args) => updateUser(args.id, args.data)
	}),
	deleteUser: t.field({
		type: 'Boolean',
		nullable: false,
		args: {
			id: t.arg({ type: 'String', required: true  }),
		},
		resolve: (_, args) => deleteUser(args.id)
	})
}))