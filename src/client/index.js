import { goServer } from './js/goServer'
import { toEpoch } from './js/toEpoch'
import { updateUI } from './js/updateUI'
import { init } from './js/evtListener'

import './style/RWD.scss'

export { goServer,toEpoch,updateUI }
window.addEventListener('DOMContentLoaded', init);
