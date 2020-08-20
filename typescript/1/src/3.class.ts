// 类的定义
// 属性“name”没有初始化表达式，且未在构造函数中明确赋值。
// 命名空间
namespace a {

  class Person {
    // 这是实例的属性，
    // 必须传参
    // 两种传参方式
    name: string = 'namespace';
    age: number;
    constructor() {
      this.age = 10
    }
  }

  let p1 = new Person()
  console.log(p1.name)
  console.log(p1.age)
}

class Person {
  name: string = 'global'
  age: number
  constructor() {
    this.age = 20
  }
}


// 属性修饰符
namespace b {
  class Person {
    myname: string;
    constructor(name: string) {
      this.myname = name
    }
    get name() {
      return this.myname
    }
    set name(val: string) {
      this.myname = val.toUpperCase()
    }
  }

  let p = new Person('liu')
  console.log(p.name)
  p.name = '123'
  console.log(p.myname)
}

// 公共属性 public
// 只读属性 readonly
namespace c {
  class Person {
    constructor(public name: string, public readonly age: number) {
      this.name = name
      this.age = age
    }
  }
  let p = new Person('public', 10)
  console.log(p.name)
  p.name = 'jiagou'
  console.log(p.name)
  // p.age = 12 // Error
}

// 继承 
/**
 * 子类继承父类后 子类的实例上就拥有了父类中的属性和方法
 * 访问修饰符  public protected private
 * public : 自己 自己的子类 和类外部都可以访问
 * protected: 自己 自己的子类 可以访问   类的外部无法访问
 * private: 只能自己访问    自己的子类 和 类的外部 无法访问
 */

//  tsconfig.json -> strictPropertyInitialization = true 后 ，就可以不强制属性初始化了
namespace d {
  class Person {
    public name: string; // 自己 自己的子类 和其他类都可以访问
    protected age: number;
    private amount: number;
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
      this.amount = 100
    }
    getName(): string {
      return this.name
    }
    setName(newName: string): void {
      this.name = newName
    }
  }
  class Student extends Person {
    stuNo: number;
    constructor(name: string, age: number, stuNo: number) {
      super(name, age)
      this.stuNo = stuNo
    }
    getStuNo() {
      return this.stuNo
    }
    setStuNo(newStuNo: any) {
      this.stuNo = newStuNo
    }
  }

  let s = new Student('lzm', 10, 1)

}

// 静态属性、静态方法

namespace statis {
  class Person {
    static type = 'Person'
    static getType() {
      return this.type
    }
  }
  console.log(Person.type)
  console.log(Person.getType())
}


