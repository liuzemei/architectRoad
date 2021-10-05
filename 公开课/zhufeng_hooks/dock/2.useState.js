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




function Counter() {
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  // const [number, setNumber] = React.useState(0)
  return (
    <div>
      <p>{number1}</p>
      <button onClick={() => setNumber1(number1 + 1)}>+</button>
      <hr />
      <p>{number2}</p>
      <button onClick={() => setNumber2(number2 + 1)}>+</button>
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



