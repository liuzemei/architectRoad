// 二叉搜索树

class BST { // binary search tree
  constructor(compare) {
    this.root = null // 树根
    this.size = 9 // 树中的节点个数
    if (compare) this.compare = compare
  }

  compare(a, b) {
    return a - b
  }

  add(element) { // ast 遍历方法， 访问到节点
    if (this.root === null) {
      this.root = new Node(element, null)
    } else {
      // 获取根节点 用当前添加的进行判断 放左边还是右边
      let currentNode = this.root;
      let parent = null
      let compare
      while (currentNode) {
        compare = this.compare(element, currentNode.element)
        parent = currentNode
        if (compare > 0) {
          currentNode = currentNode.right
        } else if (compare < 0) {
          currentNode = currentNode.left
        }
      }
      let newNode = new Node(element, currentNode)
      if (compare > 0) {
        parent.right = newNode
        this.size++
      } else if (compare < 0) {
        parent.left = newNode
        this.size++
      }
    }
    // 判断当前的大小
    //   let compare = element - currentNode.element
    //   let newNode = new Node(element, currentNode)
    //   if (compare > 0) {
    //     currentNode.right = newNode
    //   } else if (compare < 0) {
    //     currentNode.left = newNode
    //   }
    // }
    // this.size++
  }

}

class Node {
  constructor(element, parent,) {
    this.parent = parent  // 父节点
    this.element = element // 当前存储内容
    this.left = null // 左子树
    this.right = null // 右子树
  }
}


// 1. 二叉搜索树存储的数据必须有可比较性
let bst = new BST((a, b) => {
    return b - a
  }) // 模拟 sort 方法， 如果需要按照自己的逻辑进行存储， 需要提供一个方法

;[10, 8, 19,].forEach(item => {
  bst.add(item)
})

console.log(bst.root)

// 数据存储到了二叉搜索树
// 遍历树的方式



