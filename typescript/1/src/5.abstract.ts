// 二. 抽象类
namespace a {
  abstract class Animal {
    name: string = '';
    abstract getName(): string;
  }
  class Cat extends Animal {
    constructor() {
      super()
    }
    getName(): string {
      return this.name
    }
  }
  let cat = new Cat()
  cat.name = '猫'
  console.log(cat.getName())
}
// 二. 接口
// 1. 可以用来描述对象，指的是对象有哪些属性，属性是什么类型
// 接口定义
namespace b {
  interface Point {
    x: number // 分号、逗号、或者不加都行
    y: number
  }
  // 实例化接口
  let point: Point = { x: 0, y: 0 }

  // 2. 还可以用来描述行为的抽象
  interface Speakable {
    speak(): void // 因为接口里不能实现，只能定义，所有的方法都是抽象的
  }
  interface Eatable {
    eat(): void
  }
  // 类可以实现多个接口，但只能继承一个父类
  class Person implements Speakable, Eatable {
    speak(): void {
    }
    eat(): void {
    }
  }
}

// 抽象类 和 接口的区别
// 1. 不同类之间共有的属性或方法，可以抽象成一个接口
// 2. 抽象类是供其他类继承的基类，所有的抽象方法必须在紫烈中被实现。
// 3. 抽象类本质是一个无法被实例化的类，其中只能够实现方法和初始化属性。
//    而接口仅能够用于描述，既不提供方法的实现，也不能为属性进行初始化。


// 三、重写 和 重载
namespace c {
  // 重写 子类重新实现并覆盖父类中的方法
  // 重载 同一名称函数，传入不同类型(个数)参数时，执行不同的逻辑。
}
// 静态方法跟继承没有关系。

// 四、继承 和 多态


