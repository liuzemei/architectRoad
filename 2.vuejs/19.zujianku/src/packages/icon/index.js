
import Icon from './icon.vue'
import '../../style/icon.scss'

Icon.install = (app) => {
  app.component(Icon.name, Icon)
}
export default Icon