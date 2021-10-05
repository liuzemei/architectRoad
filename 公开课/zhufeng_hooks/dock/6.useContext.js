import React from 'react';
import ReactDOM from 'react-dom';


let CounterContext = React.createContext()
// 
const hookStates = [] // 保存状态的数组
let hookIndex = 0 // 保存状态的索引

function useContext(context) {
  return context._currentValue
}


function Counter() {
  // 这个函数的返回值，就是 value 里边传的值
  const { state, setState } = useContext(CounterContext)
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => setState({ number: state.number + 1 })}>+</button>
    </div>
  )
}
// function Counter2() {
//   // 这个函数的返回值，就是 value 里边传的值
//   const { state, setState } = React.useContext(CounterContext)
//   return (
//     <CounterContext.Consumer>
//       {value => (
//         <div>
//           <p>{value.state.number}</p>
//           <button onClick={() => value.setState({ number: value.state.number + 1 })}>+</button>
//         </div>
//       )}
//     </CounterContext.Consumer>
//   )
// }

function App() {
  const [state, setState] = React.useState({ number: 0 })

  return (
    <CounterContext.Provider value={{ state, setState }}>
      <Counter />
    </CounterContext.Provider>
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



