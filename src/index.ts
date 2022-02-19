import { createStore, combineReducers, bindActionCreators, applyMiddleware } from './myRedux'

function reducer1(count = 0, action) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

function reducer2(count = 1, action) {
  switch (action.type) {
    case 'increase': return ++count
    case 'decrease': return --count
    default: return count
  }
}

const middleware1 = function () {
  return function b(next) {
    return function c(action) {
      console.log('middleware1')
      next(action)
    }
  }
}

const middleware2 = function () {
  return function b(next) {
    return function c(action) {
      console.log('middleware2')
      next(action)
    }
  }
}

const store = createStore(
  combineReducers({
    count1: reducer1,
    count2: reducer2
  }),
  applyMiddleware(
    middleware1,
    middleware2
  )
)

store.subscribe(() => {
  console.log('updated')
})

const actions = bindActionCreators(
  {
    increase: () => ({ type: 'increase' }),
    decrease: () => ({ type: 'decrease' })
  },
  store.dispatch
)


console.log(store.getState())
actions.increase()
actions.increase()
console.log(store.getState())