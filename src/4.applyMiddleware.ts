import { createStore, bindActionCreators, applyMiddleware } from './redux'
import type { Middleware, Action } from './redux'

type MyAction = Action<'increase' | 'decrease'>
type StoreState = number

const middleware1: Middleware<MyAction, StoreState> = function a(api) {
  console.log('middleware1 a', api)
  return function b(next) {
    console.log('middleware1 b', next)
    return function c(action) {
      console.log('middleware1 a', action, api.dispatch)
    }
  }
}

const middleware2: Middleware<MyAction, StoreState> = function a(api) {
  console.log('middleware2 a', api)
  return function b(next) {
    console.log('middleware2 b', next)
    return function c(action) {
      console.log('middleware2 a', action)
    }
  }
}

function reducer(count = 0, action: MyAction) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    middleware1,
    middleware2
  )
)

const actions = bindActionCreators(
  {
    increase: () => ({ type: 'increase' }),
    decrease: () => ({ type: 'decrease' })
  },
  store.dispatch
)

const btn = document.createElement('button')
btn.innerText = 'update'
btn.onclick = function () {
  actions.increase()
}
document.body.appendChild(btn)
