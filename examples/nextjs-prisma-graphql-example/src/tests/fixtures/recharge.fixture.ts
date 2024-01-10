import { RECHARGE_STATUS } from '@prisma/client';

export const recharges = [
	{
		id: 'clr786jff000508jq31w81psj',
		userId: 'clr784xko000108jqdxhp3x1t',
		amount: 1000,
		status: RECHARGE_STATUS.PENDING,
	},
	{
		id: 'clr787l0w000608jq5dvk16x1',
		userId: 'clr784xko000108jqdxhp3x1t',
		amount: 100,
		status: RECHARGE_STATUS.SUCCEEDED,
	},
	{
		id: 'clr787zw8000708jqbhip44tx',
		userId: 'clr78594v000208jq0kjgff4s',
		amount: 100,
		status: RECHARGE_STATUS.FAILED,
	},
	{
		id: 'clr788bwc000808jq6b698tjs',
		userId: 'clr785w77000408jq5p7batda',
		amount: 204,
		status: RECHARGE_STATUS.PENDING,
	},
	{
		id: 'clr788shy000908jqemufbt5g',
		userId: 'clr785w77000408jq5p7batda',
		amount: 204,
		status: RECHARGE_STATUS.PENDING,
	},
];
