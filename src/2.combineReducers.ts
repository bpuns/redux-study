import { createStore, combineReducers } from './redux'
import type { Action } from './redux'

function reducer1(count = 0, action: Action<'increase' | 'decrease'>) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

function reducer2(count = 1, action: Action<'increase' | 'decrease'>) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

const store = createStore(combineReducers({
  count1: reducer1,
  count2: reducer2
}))

console.log(store.getState())         // {count1: 0, count2: 1}
store.dispatch({ type: 'increase' })
console.log(store.getState())         // {count1: 1, count2: 2}