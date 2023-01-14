import Vue from 'vue'
import { isEmpty, checkInput, toast, timeFormat } from './validate'
import { yhToast } from './tools.js'

Vue.prototype.$yhToast = yhToast

Vue.prototype.$checkInput = checkInput
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$toast = toast
Vue.prototype.$timeFormat = timeFormat
