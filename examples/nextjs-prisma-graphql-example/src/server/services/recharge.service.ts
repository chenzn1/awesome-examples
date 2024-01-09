import { Prisma, RECHARGE_STATUS } from "@prisma/client";
import { getUser } from ".";
import prisma from "../drives/prisma";
import { CreateRechargeInput, UpdateRechargeInput } from "../entities";
import { RechargeNotFoundError, RechargeUpdateError } from "../errors";

export async function getRecharge(id: string) {
  const recharge = await prisma.recharge.findUnique({where: {id, deleted: false}})
  if (!recharge) {
    throw new RechargeNotFoundError({id})
  }
  return recharge
}

export async function createRecharge({userId, amount}: typeof CreateRechargeInput.$inferInput) {
  await getUser(userId)
  const recharge = await prisma.recharge.create({data: {amount, userId, status: RECHARGE_STATUS.PENDING}})
  return recharge
}

export async function updateRecharge(id: string, {amount, status}: typeof UpdateRechargeInput.$inferInput) {
  const oldRecharge = await getRecharge(id);
  if (oldRecharge.status !== RECHARGE_STATUS.PENDING) {
    throw new RechargeUpdateError({id})
  }
  if (status === RECHARGE_STATUS.SUCCEEDED) {
    return await prisma.$transaction(async t => {
      await t.user.update({ where: { id: oldRecharge.userId }, data: {balance: {increment: oldRecharge.amount}}}) 
      return await t.recharge.update({ where: { id },data: {amount, status}}) 
    })
  } else  {
    return await prisma.recharge.update({ where: { id },data: {amount, status}})
  }
}