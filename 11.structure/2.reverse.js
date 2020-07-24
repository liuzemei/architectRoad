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

  // 1. 用递归实现链表反转
  // reverse() {
  //   function reverse(head) {
  //     if (head === null || head.next === null) return head; // 不需要反转了
  //     // reverse 返回的是一个新头，递归到最后一个元素时 当前他的下一个就是空的
  //     let newHead = reverse(head.next)
  //     // 从这个链表的最后一个开始翻转，不停的让当前的下一个元素的 next 指向自己， 自己指向 null
  //     head.next.next = head
  //     head.next = null
  //     return newHead
  //   }
  //   reverse(this.head)
  // }

  //  2.
  // reverse() {
  //   let newHead = null
  //   while (this.head !== null) {
  //     let temp = this.head.next // 拿到头部的下一个元素，这个元素，要放到 newHead 中
  //     this.head.next = newHead
  //     newHead = this.head // 新的头 就是刚才取出来的头
  //     this.head = temp
  //   }
  //
  //   return newHead
  // }

  reverse() {
    let tmp = new LinkList()
    let current = this.head
    for (let i = 0; i < this.size - 1; i++) {
      current = current.next
      tmp.add(0, current.element)
    }
    this.head = tmp.head
  }
}

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

let ll = new LinkList()

ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)

console.dir(ll, { depth: 1000 })
ll.reverse()
console.dir(ll, { depth: 1000 })