import prisma from '../drives/prisma';
import {
	CreateRechargeInput,
	Recharge,
	RechargesFilter,
	RechargesOrderBy,
	UpdateRechargeInput,
} from '../entities';
import builder from '../graphql-builder';
import { createRecharge, updateRecharge } from '../services';

builder.queryFields(t => ({
	rechargeTotalCount: t.field({
		type: 'Int',
		nullable: false,
		args: {
			where: t.arg({ type: RechargesFilter, required: false }),
		},
		resolve: async (__, args, ctx) => {
			const { where } = args;
			const count = await prisma.recharge.count({
				where: {
					...where,
					deleted: false,
				},
			});
			return count;
		},
	}),
	recharges: t.prismaField({
		type: [Recharge],
		nullable: false,
		args: {
			take: t.arg({ type: 'Int', required: true }),
			skip: t.arg({ type: 'Int', required: true }),
			where: t.arg({ type: RechargesFilter, required: false }),
			orderBy: t.arg({ type: RechargesOrderBy, required: false }),
		},
		resolve: async (args, __, extArgs, ctx) => {
			const { where, orderBy, take, skip } = extArgs;
			const list = await prisma.recharge.findMany({
				...args,
				where: {
					...where,
					deleted: false,
				},
				take,
				skip,
				orderBy: orderBy ? orderBy : { createdAt: 'desc' },
			});

			return list;
		},
	}),
}));

builder.mutationFields(t => ({
	createRecharge: t.field({
		type: Recharge,
		nullable: false,
		args: {
			data: t.arg({ type: CreateRechargeInput, required: true }),
		},
		resolve: (_, args) => createRecharge(args.data),
	}),
	updateRecharge: t.field({
		type: Recharge,
		nullable: false,
		args: {
			id: t.arg({ type: 'String', required: true }),
			data: t.arg({ type: UpdateRechargeInput, required: true }),
		},
		resolve: (_, args) => updateRecharge(args.id, args.data),
	}),
}));
