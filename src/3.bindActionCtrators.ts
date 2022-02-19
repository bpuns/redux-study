import { createStore, bindActionCreators } from './redux'
import type { Action } from './redux'

function reducer(count = 0, action: Action<'increase' | 'decrease'>) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

const store = createStore(reducer)

const actions = bindActionCreators(
  {
    increase: () => ({ type: 'increase' }),
    decrease: () => ({ type: 'decrease' })
  },
  store.dispatch
)

actions.increase()
actions.increase()