
import ButtonGroup from './button-group.vue'
import '../../style/button-group.scss'

ButtonGroup.install = (app) => {
  app.component(ButtonGroup.name, ButtonGroup)
}
export default ButtonGroup