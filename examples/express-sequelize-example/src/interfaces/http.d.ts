import express from 'express'

export interface Request extends express.Request {
  user?: any
  gatewayPayload?: Record<string, any>
  auth?: any
  swagger?: any
}

export type Response = express.Response

export type NextFunction = express.NextFunction
