// 接口声明
namespace a {
  interface PlainObject {
    x: number
    y: number
  }

  // 任意属性接口声明
  interface PlainObject {
    [propName: string]: number;
  }


  let obj: PlainObject = {
    x: 1,
    y: 2,
    z: 3,
    d: 4
  }

  // 接口的继承
  interface Speakable {
    speak(): void;
  }
  interface SpeakChinese extends Speakable {
    speakChinese(): void;
  }

  class Person implements SpeakChinese {
    speak() { }
    speakChinese() { }
  }

  // 接口的 readonly
  interface Circle {
    readonly PI: number; // 只读属性
    radius: number
  }
  let circle: Circle = {
    PI: 3.14,
    radius: 10
  }
  // circle.PI = 3.15; // Error

  // 接口还可以用来约束函数
  interface Discount {
    // 函数 (参数:类型): 返回值类型
    (price: number): number
  }
  let cost: Discount = (price: number): number => {
    return price * .8
  }

  // 可索引接口
  // 用来对数组和对象进行约束
  interface UserInterface {
    [index: number]: string
  }
  let arr: UserInterface = ['1', '2', '3']
  console.log(arr)
  let obj2: UserInterface = {
    1: '1',
    2: '2'
  }
  console.log(obj2)


  // 类接口 可以用接口来装饰类 学TS核心 要学会两个：接口+泛型
}
namespace b {
  interface Speakable {
    name: string;
    speak(words: string): void
  }
  class Dog implements Speakable {
    name: string = 'dog';
    speak() { }
  }

  // 约束构造类型 使用 new 来约束
  class Animal {
    constructor(public name: string) { }
  }
  interface WithNameClass {
    new(name: string): Animal
  }
  function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name)
  }
  let a = createAnimal(Animal, 'zhufeng')
  console.log(a)


  




}
