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
      callback()
    }
  } else {
    // 说明是第一次
    hookStates[hookIndex++] = dependencies
    callback()
  }
}


function Counter(params) {
  const [number, setNumber] = useState(0)
  const [name, setName] = useState("zhufeng")


  useEffect(() => {
    document.title = number
    console.log(number)
  }, [number])


  return (
    <div>
      <p>number:{number}</p>
      <p>name{name}</p>
      <input
        value={name}
        onChange={
          (e) => setName(e.target.value)
        } />
      <button onClick={() => setNumber(number + 1)}>+</button>
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



