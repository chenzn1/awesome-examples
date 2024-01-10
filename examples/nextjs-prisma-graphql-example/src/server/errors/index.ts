import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export class UserNotFoundError extends GraphQLError {
	constructor(extensions?: GraphQLErrorExtensions) {
		super('User not found.', { extensions });
	}
}

export class RechargeNotFoundError extends GraphQLError {
	constructor(extensions?: GraphQLErrorExtensions) {
		super(`Recharge not found.`, { extensions });
	}
}

export class RechargeUpdateError extends GraphQLError {
	constructor(extensions?: GraphQLErrorExtensions) {
		super(`Recharge cannot be updated.`, { extensions });
	}
}
