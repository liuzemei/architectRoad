// 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为。
// 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
// 装饰器的写法分为普通装饰器和装饰器工厂


// 四种装饰器： 类装饰器 属性装饰器 方法装饰器 参数装饰器 

// 类装饰器的声明：用来监视、修改或替换类定义
// tsconfig.json experimentalDecorators 装饰器支持
namespace a {

  interface Person {
    xx: string;
    yy: string;
  }

  function enhancer(target: any) {
    // 1. 修改实例上的属性值
    target.prototype.xx = 'xx'

  }

  @enhancer
  class Person {
    constructor() {
    }
  }
  let p = new Person()
  // console.log(Person.xx)
  // console.log(p.name)
  console.log(p.xx)
}

// 属性装饰器
// 装饰属性
namespace b {
  // 如果装饰的是个普通属性的话，那么这个 target 指向类的原型
  // 如果装饰的是一个类的static，那么这个target指定类的定义
  console.log()
  function upperCase(target: any, propertyName: string) {
    let value = target[propertyName]
    const getter = () => value
    const setter = (newVal: string) => {
      value = newVal.toUpperCase()
    }
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }

  function propertyEnumerable(flag: boolean) {
    return (target: any, propertyName: string) => {
    }
  }

  function methodEenumerable(flag: boolean) {
    return function (target: any, methodName: string, PropertyDescriptor: PropertyDescriptor) {
      PropertyDescriptor.enumerable = flag
    }
  }

  function setAge(age: number) {
    return (target: any, methodName: string, propertyDescriptor: PropertyDescriptor) => {
      target.age = age
    }
  }

  function toNumber(target: any, methodName: string, PropertyDescriptor: PropertyDescriptor) {
    let oldMethod = PropertyDescriptor.value
    PropertyDescriptor.value = function (...args: any[]) {
      args = args.map(item => parseFloat(item))
      return oldMethod.apply(this, args)
    }
  }

  class Person {
    @upperCase
    @propertyEnumerable(false)
    name: string = 'zhufeng'

    @methodEenumerable(true)
    getName() {
      console.log('getName')
    }

    static age: number;
    @setAge(100)
    static getAge() {

    }

    @toNumber
    sum(...args: any[]) {
      return args.reduce((r, i) => r + i, '')
    }
  }

  let p = new Person()
  // p.name = 'jiagou'
  console.log(p.name)

  // console.log(p.getName)
  for (let key in p) {
    console.log(key)
  }

  console.log(Person.age)
  console.log(p.sum(1, '2', '3'))




}

// 参数装饰器
namespace c {
  console.log('cccccccccccccccccccccccccccccccccccccccccccccc')
  interface Person {
    age: number
  }

  // Person.prototype login 1
  function addAge(target: any, methodName: string, paramsIndex: number) {
    console.log(target, methodName, paramsIndex)
    target.age = 10

  }

  // 方法参数
  class Person {
    login(username: string, @addAge password: string) {
      console.log(username)
      console.log(password)
      console.log(this.age)
    }
  }

  const p = new Person()
  p.login('zhufeng', '234')
}

// 装饰器的执行顺序

// 总结1：
// 属性方法先执行，谁先写先执行谁
// 先参数再方法
// 最后是类
// 如果是同类型的，先执行后写的，(谁离得近先执行谁，执行完了之后，再传给上边的一个)
// 总结2
// 方法和属性装饰器 -> 类装饰器
// 方法和属性的装饰器谁在前谁先执行
// 如果方法中的参数有装饰器，要先于方法执行

