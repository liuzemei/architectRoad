// 类型保护
// 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域变量的类型
// 类型保护就是能够通过关键字判断出分支中的类型
namespace a {
  function double(input: string | number | boolean) {
    if (typeof input === 'string') {
      return input + input
    }
    if (typeof input === 'number') {
      return input * 2
    }
    if (typeof input === 'boolean') {
      return !input
    }
  }

  console.log(double(10))
  console.log(double('20'))
  console.log(double(true))
}

namespace b {
  class Animal {
    name: string = 'zhufeng'
  }
  class Bird extends Animal {
    swing: number = 2
  }

  function getName(a: Animal) {
    if (a instanceof Bird) {
      a.swing
    } else {
      a.name
    }
  }
  // null 保护
  function getFirstLetter(s: string | null) {
    // 1. if (s === null) s = ''
    // 2. if(s === null) return 
    // 3. s =  s || ''
    function ensure() {
      s = s || ''
    }
    ensure()
    return s!.charAt(0) // 非空断言
  }

  // 链式判断运算符
  let a = { b: 1, c: 2 }
  // -> a && a.b
  console.log(a?.b)


}

namespace c {

  // 联合类型
  // 利用联合类型中的共有字段进行类型保护的一种技巧
  // 相同字段的同步取值就是可辨识
  interface WarningButton {
    class: 'warning'
    text1: '修改'
  }
  interface DangerButton {
    class: 'danger'
    text2: '删除'
  }
  type Button = WarningButton | DangerButton

  function getButton(button: Button) {
    if (button.class === 'warning') {
      button.text1
    } else {
      button.text2
    }
  }

  interface Bird {
    swing: number
  }
  interface Dog {
    leg: number
  }
  function getNumber(x: Bird | Dog) {
    if ('swing' in x) {
      x.swing
    } else {
      x.leg
    }
  }

  // 自定义的类型保护
  interface Bird1 {
    name1: 'Bird'
    legs: number
  }
  interface Dog1 {
    name2: 'Dog'
    legs: number
  }
  // x is Bird1 => 返回一个类型是否是 Bird1 的 Boolean 值
  function isBird(x: Bird1 | Dog1): x is Bird1 {
    return x.legs === 2
  }
  function getAnimal(x: Bird1 | Dog1) {
    if (isBird(x)) {
      console.log(x.name1)    // x就是一个鸟
    } else {
      x.name2
    }
  }
  let x: Bird1 = { name1: 'Bird', legs: 2 }
  getAnimal(x)



}

namespace d {
  // 交叉类型：表示将多个类型合并为一个类型 并集
  interface Bird {
    name: string,
    fly: () => void
  }
  interface Person {
    name: string,
    eat(): void
  }
  type BirdMan = Bird & Person
  let p: BirdMan = {
    name: 'zhufeng',
    fly() { },
    eat() { }
  }

  // typeof 可以获取一个变量的类型
  let p1 = { name: 'lzm', age: 10 }
  // type 是来用来定义类型的 let const 只能定义变量
  type Person1 = typeof p1
  let p2: Person1 = { name: 'lzm1', age: 20 }


  // 我们可以通过 [] 来获取一个类型的子类型
  interface Person2 {
    name: string,
    age: number,
    job: { name: string },
    interests: { name: string, level: number }[]
  }
  let myname: Person2['job'] = {
    name: 'fe'
  }
  let mylevel: Person2['interests'][0]['level'] = 10


  // keyof 索引访问操作符 
  interface Person3 {
    name: string
    age: number
    gender: 'male' | 'female'
  }
  function getValueByKey(val: Person3, key: keyof Person3): any {
    return val[key]
  }


  interface Person4 {
    name: string
    age: number
    gender: 'male' | 'female'
  }
  type ParialPerson = {  // 将固定参数全部变为可选参数
    [key in keyof Person4]?: Person4[key]
  }
  let p4: ParialPerson = {
    name: '',
    age: 0
  }

  // 内置工具类型
  // 1. Partial: 可以将传入的属性由非可选变成可选
  // 实现原理：
  // type Partial = {  // 将固定参数全部变为可选参数
  //   [key in keyof Person4]?: Person4[key]
  // }
  type ParaialPerson2 = Partial<Person4>
  let p42: ParaialPerson2 = {
    name: ''
  }
  // 2. Required: 可以将传入的属性由可选变成非可选
  // 实现原理：
  // type Required<T> = {
  //   [key in keyof T]-?: T[key]
  // }
  type RequirePerson = Required<ParaialPerson2>
  let p5: RequirePerson = {
    name: '',
    age: 1,
    gender: 'male'
  }

  // 3. ReadOnly: 将所有参数变为只读的
  // 实现原理：
  // type Readonly<T> = {
  //   readonly [key in keyof T]: T[key]
  // }
  type ReadonlyPerson = Readonly<ParaialPerson2>
  let p6: ReadonlyPerson = {
    name: '123'
  }
  console.log(p6)
  // p6.name = '234' // error
  // p6.age = 10 // error

  // 4. Pick: 从一个大类型中，选择一个小类型
  // 实现原理
  // type Pick<T, K extends keyof T> = {
  //   [key in K]: T[key]
  // }
  type PickPerson = Pick<Person4, 'name'>
  let p7: PickPerson = {
    name: '123'
  }

  console.log(1)

}

namespace e {
  // 条件类型初识
  interface Fish {
    name1: string
  }
  interface Test {
    name1: string
  }
  interface Water {
    name2: string
  }
  interface Bird {
    name3: string
  }
  interface Sky {
    name4: string
  }
  // Test -> Fish: 只要有需要的属性就可以。
  type Condition<T> = T extends Fish ? Water : Sky
  let condition: Condition<Test> = {
    name2: 'water'
  }
  let condition2: Condition<Bird> = {
    name4: 'sky'
  }

  // 条件类型的分发
  type Condition2<T> = T extends Fish ? Water : Sky

  let c1: Condition2<Fish | Bird> = { name2: '123' }
  let c2: Condition2<Fish | Bird> = { name4: '123' }
  let c3: Water | Sky = { name2: '123' }
  let c4: Water | Sky = { name4: '123' }
  let c5: Water | Sky = { name2: '2', name4: '4' }

  // 内置条件类型
  // 1. 排除一些类型（从前者中排除掉后者）
  type E = Exclude<string | number | boolean, string | boolean>
  let e: E = 1

  // 2. 选择一些类型（从前者中选择后者） -> 交集
  type E2 = Extract<string | number | null, string | boolean>;
  let e2: E2 = '123'

  // 3. 非空类型
  type E3 = NonNullable<string | number | undefined | null>
  let e3: E3 = '123'

  // 4. 获取返回值类型
  function getUserInfo() {
    return { name: 'lzm', age: 25 }
  }
  type UserInfo = ReturnType<typeof getUserInfo>
  let user: UserInfo = { name: 'lzm1', age: 26 }

  // 5. 获取构造函数的实例类型 instanceType
  class Person5 {
    constructor(public name: string) {
      this.name = name
    }
  }
  type P = InstanceType<typeof Person5>
  let p: P = new Person5('珠峰')





}