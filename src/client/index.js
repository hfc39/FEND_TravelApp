import { goServer } from './js/goServer'
import { toEpoch } from './js/toEpoch'
import { updateUIP } from './js/updateUIP'
import { updateUIF } from './js/updateUIF'
import { init } from './js/evtListener'

import './style/RWD.scss'

export { goServer,toEpoch,updateUIF,updateUIP }
window.addEventListener('DOMContentLoaded', init);
