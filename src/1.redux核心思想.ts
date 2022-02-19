import { createStore } from './redux'
import type { Action } from './redux'

function reducer(count = 0, action: Action<'increase' | 'decrease'>) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

const store = createStore(reducer)

const obj = {
  count: 0
}

store.subscribe(() => {
  console.log('updated', store.getState())
})

store.dispatch({ type: 'increase' })      // updated 1
store.dispatch({ type: 'increase' })      // updated 2

// import { makeAutoObservable, action, autorun } from 'mobx'

// const mobxStore = makeAutoObservable({
//   count: 0,
//   increase() {
//     this.count++
//   },
//   decrease() {
//     this.count--
//   }
// })

// autorun(() => {
//   console.log('updated', mobxStore.count)
// })

// action(() => {
//   mobxStore.increase()
//   mobxStore.increase()
// })()