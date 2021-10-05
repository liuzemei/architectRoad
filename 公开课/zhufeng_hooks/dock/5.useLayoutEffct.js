import React from 'react';
import ReactDOM from 'react-dom';


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


function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    //  说明不是第一次
    const lastDependencies = hookStates[hookIndex]
    let same = dependencies.every((item, idx) => item === lastDependencies[idx])
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      // 添加一个宏任务，在本次渲染之后执行
      setTimeout(callback)
    }
  } else {
    // 说明是第一次
    hookStates[hookIndex++] = dependencies
    setTimeout(callback)
  }
}
function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    //  说明不是第一次
    const lastDependencies = hookStates[hookIndex]
    let same = dependencies.every((item, idx) => item === lastDependencies[idx])
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      // 添加一个微任务，在浏览器渲染之前执行
      queueMicrotask(callback)
    }
  } else {
    // 说明是第一次
    hookStates[hookIndex++] = dependencies
    queueMicrotask(callback)
  }
}

function Animation() {
  const red = React.useRef() // {current: null}
  const green = React.useRef()// {current: null}
  let style = { width: '100px', height: '100px' }

  // 它会增加一个微任务 主栈结束后，要先清空微任务，再进行浏览器渲染
  useLayoutEffect(() => {
    red.current.style.transform = 'translate(500px)'
    red.current.style.transition = 'all 2s'
  })
  useEffect(() => {
    green.current.style.transform = 'translate(500px)'
    green.current.style.transition = 'all 2s'
  })


  return (
    <div>
      <div
        ref={red}
        style={{ ...style, backgroundColor: 'red' }}>
      </div>
      <div
        ref={green}
        style={{ ...style, backgroundColor: 'green' }}>
      </div>
    </div>
  )


}

function render() {
  hookIndex = 0
  ReactDOM.render(
    <Animation />,
    document.getElementById('root')
  );
}

render()



