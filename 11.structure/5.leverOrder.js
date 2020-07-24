// 二叉搜索树 的 层序遍历

class BST {
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
  }

  levelOrderTraversal(visitor) {
    if (this.root === null) return
    let stack = [this.root]
    let index = 0
    let currentNode;
    while (true) {
      if (!stack[index]) break
      currentNode = stack[index++]
      visitor.visit(currentNode.element)
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
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

let bst = new BST()

;[10, 8, 19, 6, 15, 22].forEach(item => {
  bst.add(item)
})

// traversal 是遍历的顺序 不会改变 左右节点
// 用队列来实现


bst.levelOrderTraversal({
  visit(element) {
    console.log(element)
  }
})
