
import Button from './button.vue'
import '../../style/button.scss'

// Button 组件是可以单独使用
// import {Button} from 'xxx'




Button.install = (app) => {
  app.component(Button.name, Button)
}
export default Button