export function createStore(reducer, enhancer) {

  // 交给中间件创建Store
  if (enhancer) return enhancer(createStore, reducer)

  // 记录当前的state
  let currentState
  // 记录订阅的所有函数
  let currentListeners = new Set()

  const getState = () => currentState

  const subscribe = (listener) => {

    // 添加到散列表中
    currentListeners.add(listener)

    // 避免重复移除订阅
    let isSubscribed = true

    // 取消订阅
    return function unsubscribe() {
      if (!isSubscribed) return
      isSubscribed = false
      currentListeners.delete(listener)
    }

  }

  const dispatch = (action) => {

    // 获取新state
    currentState = reducer(currentState, action)

    // 触发订阅
    for (let listener of currentListeners) {
      listener()
    }

  }

  // 初始化调用一次reducer
  dispatch({ type: null })

  return { getState, subscribe, dispatch }

}

export function combineReducers(reducers) {

  return (state = {}, action) => {

    // 准备一个标识，判断数据是否发生变化
    let hasChanged = false
    // 存储下一次状态
    const nextState = {}

    // 遍历执行所有reducer
    for (let key in reducers) {
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      nextState[key] = reducer(previousStateForKey, action)

      if (!hasChanged && nextState[key] !== previousStateForKey) {
        hasChanged = true
      }

    }

    // 返回下一次状态
    return hasChanged ? nextState : state

  }

}

export function bindActionCreators(actions, dispatch) {

  const cb = {}

  for (let key in actions) {
    cb[key] = function () {
      dispatch(actions[key](...arguments))
    }
  }

  return cb
}

export function applyMiddleware(...middlewares) {
  return function (createStore, reducer) {

    const store = createStore(reducer)

    const middlewareAPI = {
      dispatch: () => { throw new Error('不要在初始化的时候调用dispatch') },
      getState: store.getState
    }

    const chain = middlewares.map(f => f(middlewareAPI))
    store.dispatch = compose(chain)(store.dispatch)

    return store

  }
}

function compose(funcs) {

  if (!funcs.length) return f => f

  if (funcs.length === 1) return funcs[0]

  return funcs.reduce((a, b) => {
    return function () {
      return a(b(...arguments))
    }
  })

}