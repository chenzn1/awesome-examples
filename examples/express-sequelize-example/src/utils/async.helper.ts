import { Request, Response } from 'interfaces/http'
const CODE_SUCCESS = 200

export default (fn: Function) => async (req: Request, res: Response, next: Function) =>
  fn(req, res)
    .then(result => res.status(CODE_SUCCESS).json(result))
    .catch(next)
