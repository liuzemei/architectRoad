import React from 'react';
import ReactDOM from 'react-dom';


let CounterContext = React.createContext()
const hookStates = [] // 保存状态的数组
let hookIndex = 0 // 保存状态的索引
// useReducer 类似 useState

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

function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIndex = hookIndex
  function dispatch(action) {
    hookStates[currentIndex] = reducer(hookStates[currentIndex], action)
    render()
  }
  return [hookStates[hookIndex++], dispatch]
}

const couterReducer = function (state, action) {
  switch (action.type) {
    case 'add':
      return state++
    default:
      return state
  }
}



function Counter() {
  // 这个函数的返回值，就是 value 里边传的值

  // reducer 初始状态
  let [state, dispatch] = React.useReducer(couterReducer, 0)

  return (
    <div>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: 'add' })}>+</button>
    </div>
  )
}
function render() {
  hookIndex = 0
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}

render()



