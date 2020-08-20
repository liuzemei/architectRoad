export { }
// 声明文件怎么写
/**
 * 1. 用 ts 重写一遍
 * 2. 给它配上声明文件
 * 3.
 */

//  简单的类型声明
declare const $: (selector: string) => {
  click(): void
  width(length: number): void
}
// $('#root').click

declare let name: string
declare let age: number
declare function getName(): string
declare class Animal { name: string }

interface Person6 {
  name: string
}
type Student = Person6 | string
declare const enum Seasons {
  Spring, Summber, Autumn, Winter
}
let sessons: Seasons[] = [
  Seasons.Spring,
  Seasons.Summber,
  Seasons.Autumn,
  Seasons.Winter,
]


// 复杂类型的声明
declare namespace jQuery {
  function ajax(url: string, config: any): void;
  let name: string;
  namespace fn {
    function extend(object: any): void
  }
}
jQuery.ajax('/api/users', {})
jQuery.name
jQuery.fn.extend({})


