

function parseHTML(html) {

}





export function compileToFunctions(template) {
  // html 模板 => render 函数
  // 1. 需要将 html 代码转化成 ast 语法书
  // ast: 可以用 ast 数来描述语言本身

  // 虚拟dom 是用对象来描述节点的
  // <div id="a"></div>
  // {
  //   attr: [{ id: 'a' }],
  //   tag: 'div',
  //   children: []
  // }

  // ast 语法树 还可以来描述js语法
  // const a = 1;
  // {
  //   indentifier: const,
  //   name: a,
  //   value: 1
  // }

  // 虚拟dom 只能描述DOM，   ast语法树 是描述代码的 


  // 前端必须要掌握的数据结构（树）
  let ast = parseHTML(template)





  // 2. 通过ask语法树 重新的生成代码








}