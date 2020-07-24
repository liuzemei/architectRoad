// 链表 从头、尾删除 或 增加 性能是比较好的

// 链表分为很多类（单向链表）

// 增 删 改 查

class LinkList {
  constructor(props) {
    this.head = null  // 默认应该指向第一个节点
    this.size = 0 // 通过这个长度 可以遍历这个链表
  }

  add(index, element) {
    if (arguments.length === 1) { // 就是向末尾添加
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) throw  new Error('添加的索引不正常')
    if (index === 0) { // 在头部添加元素
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 先获取前一个
      let current = this.head
      // 不停的遍历， 找到最后一项
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      // 让创建的元素指向上一个元素的下一个
      current.next = new Node(element, current.next)
    }
    this.size++
  }

  remove(index) {
    if (index < 0 || index >= this.size) throw new Error('删除的索引不正常')
    let removeItem
    this.size--
    if (index === 0) {
      removeItem = this.head
      this.head = this.head.next
    } else {
      let current = this.head
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      removeItem = current.next
      current.next = current.next.next
    }
    return removeItem
  }

  get(index) {
    if (index < 0 || index >= this.size) throw new Error('删除的索引不正常')
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next()
    }
    return current
  }
}


class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

let ll = new LinkList()


ll.add(0, 100)
ll.add(0, 200)
ll.add(300) // 没有给索引，就是末尾添加
// ll.remove(0)

console.log(ll)

ll.reverse()
console.log(ll)

class Queue { // 实现一个队列  FIFO
  constructor() {
    this.ll = new LinkList()
  }

  offer(element) { // 向队列中添加
    this.ll.add(element)
  }

  peek() { // 返回队列头部元素
    return this.ll.get(0)
  }

  remove() {
    return this.ll.remove(0)
  }
}

let queue = new Queue()
queue.offer(1)
console.log(queue.peek())
let t = queue.remove()
console.log(queue)


// 用链表来模拟默认使用数组来模拟的队列结构，性能更高