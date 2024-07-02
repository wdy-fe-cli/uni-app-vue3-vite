import dev from './.env.dev.js'
import prod from './.env.prod.js'

const NODE_ENV = import.meta.env.MODE

let ENV_VAR = dev
if (NODE_ENV === 'development') {
  ENV_VAR = dev
} else if (NODE_ENV === 'production') {
  ENV_VAR = prod
}

export default ENV_VAR
