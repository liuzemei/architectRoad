import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 为了减少组件渲染，我们可以优化，设置组件的属性如果变了，才重新渲染，如果没变则不渲染
 * useMemo useCallback
 */

const hookStates = [] // 保存状态的数组
let hookIndex = 0 // 保存状态的索引
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIndex = hookIndex
  hookIndex++
  function setState(newState) {
    hookStates[currentIndex] = newState
    render()
  }
  return [hookStates[currentIndex], setState]
}

function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) {
    //  说明不是第一次
    let [lastCallback, lastDependencies] = hookStates[hookIndex]
    //  判断一下新的依赖数组中的每一项是否跟上次完全相等
    let same = dependencies.every((item, idx) => item === lastDependencies[idx])
    if (same) {
      hookIndex++
      return lastCallback
    } else {
      hookStates[hookIndex++] = [callback, dependencies]
      return callback
    }
  } else {
    // 说明是第一次
    hookStates[hookIndex++] = [callback, dependencies]
    return callback
  }
}

function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) {
    //  说明不是第一次
    let [lastMemo, lastDependencies] = hookStates[hookIndex]
    //  判断一下新的依赖数组中的每一项是否跟上次完全相等
    let same = dependencies.every((item, idx) => item === lastDependencies[idx])
    if (same) {
      hookIndex++
      return lastMemo
    } else {
      let newMemo = factory()
      hookStates[hookIndex++] = [newMemo, dependencies]
      return newMemo
    }
  } else {
    // 说明是第一次
    let newMemo = factory()
    hookStates[hookIndex++] = [newMemo, dependencies]
    return newMemo
  }
}

function memo(OldFunctionComponent) {
  return class extends React.PureComponent {
    render() {
      return <OldFunctionComponent {...this.props} />
    }
  }
}



let Child = ({ data, onButtonClick }) => {
  console.log('Child render')
  return <button onClick={onButtonClick}>{data.number}</button>
}

Child = memo(Child)

const App = () => {
  const [number, setNumber] = useState(0)
  const [name, setName] = useState("zhufeng")
  // let data = { number }
  // let addClick = () => setNumber(number + 1)

  // 第一次参数是生成对象的工程
  // 第二个参数是一个数组(依赖的变量)：当依赖的变量发生变化的时候，会重新生成
  let data = useMemo(() => ({ number }), [number])
  // 每次渲染 App 都要声明一个新的函数，进行优化，依赖变量发生改变才会重新执行得到新函数，否则使用使用上一次的函数。
  let addClick = useCallback(() => setNumber(number + 1), [number])
  return (
    <div>
      <input
        value={name}
        onChange={
          (e) => setName(e.target.value)
        } />
      <Child data={data} onButtonClick={addClick} />
    </div>
  )
}

function render() {
  hookIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render()



