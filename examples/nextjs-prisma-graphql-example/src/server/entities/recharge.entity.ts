import { RECHARGE_STATUS } from "@prisma/client";
import builder from "../graphql-builder"

export const RechargeStatus = builder.enumType('RECHARGE_STATUS', {
	values: Object.values(RECHARGE_STATUS),
});

export const Recharge = builder.prismaObject('Recharge', {
  fields: t => ({
    id: t.exposeID('id'),
    amount: t.expose('amount', {type: 'Decimal'}),
    status: t.expose('status', {type: RechargeStatus}),
    user: t.relation('user'),
    createdAt:  t.expose('createdAt', { type: 'DateTime' }),
    updatedAt:  t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

export const CreateRechargeInput = builder.inputType('CreateRechargeInput', {
  fields: t => ({
    amount: t.float({required: true}),
    userId: t.string({required: true}),
  }),
})

export const UpdateRechargeInput = builder.inputType('UpdateRechargeInput', {
  fields: t => ({
    amount: t.float({required: true}),
    status: t.field({ required: true, type: RechargeStatus}),
  }),
})

export const RechargesFilter = builder.prismaWhere('Recharge', {
	fields: {
		id: 'String',
		status: RechargeStatus,
	},
	name: 'RechargesFilter',
});

export const RechargesOrderBy = builder.prismaOrderBy('Recharge', {
	fields: {
		createdAt: true,
		updatedAt: true,
    amount: true,
	},
	name: 'RechargesOrderBy',
});
