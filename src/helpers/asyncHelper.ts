export default (fn: Function) => async (req, res, next) =>
  Promise.resolve()
    .then(() => fn(req, res, next))
    .catch(next)
