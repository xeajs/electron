/**
 * @Author yejiang1015
 * @Date 2020-01-20 12:39:11
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-01-20 12:40:04
 *
 * @Message [@observable] 的使用
 * @Url [https://mobx.js.org/refguide/modifiers.html]
 * @Message 实例化时定义是否转化为可观察的对象
 * @observable === @observable.deep
 * @observable.deep 这是默认的修饰符 转换为其可观察的对象
 * @observable.ref 禁用自动可观察的转换，而只是创建一个可观察的引用。
 * @observable.shallow 只能与集合一起使用。将任何已分配的集合转换为可观察的，但是该集合的值将被原样处理
 * @observable.struct 与相似ref，但会忽略结构上等于当前值的新值
 * @了解更多 --> @Url
 *
 * @toJS 拷贝一份 store 数据
 *
 */

export { GlobalStore } from './GlobalStore';
export { RecorderStore } from './RecorderStore';
