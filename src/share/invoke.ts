// 执行可选链函数
const def = () => {}
export function invoke<F extends (...args: any) => any, P extends Parameters<F>>(service: F = def as F, ...opts: P) {
  if (!service) return opts
  if (!(service instanceof Function)) throw new Error(`The argument must be a Function, but we get ${typeof service}`)
  return service.apply(service, opts)
}

export default invoke
