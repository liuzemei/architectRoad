// 二叉搜索树 的遍历 和 翻转

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

  preOrderTraversal(visitor) {
    const traversal = node => {
      if (node === null) return
      visitor.visit(node.element)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }

  inOrderTraversal(visitor) {
    const traversal = node => {
      if (node === null) return
      traversal(node.left)
      visitor.visit(node.element)
      traversal(node.right)
    }
    traversal(this.root)
  }

  postOrderTraversal(visitor) {
    const traversal = node => {
      if (node === null) return
      traversal(node.left)
      traversal(node.right)
      visitor.visit(node.element)
    }
    traversal(this.root)
  }

  invertTree(visitor) { // 在任意一种遍历中，交换一下左右元素就实现了翻转
    const traversal = node => {
      if (node === null) return
      let temp = node.left
      node.left = node.right
      node.right = temp
      visitor.visit(node.element)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
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

let bst = new BST((a, b) => {
    return a - b
  })

;[10, 8, 19, 6, 15, 22].forEach(item => {
  bst.add(item)
})

console.log(bst.root)

// 深度（前序遍历 中序遍历 后序遍历）、 广度（层序遍历）  都可以拿到书中的节点


// 尝试用递归来实现（先序遍历 中序遍历 后序遍历） 实现一个深拷贝
// bst.preOrderTraversal()
// bst.inOrderTraversal()
// bst.postOrderTraversal()

bst.invertTree({
  visit(element) {
    console.log(element)
  }
})
console.log(bst.root)


// 反转二叉树



