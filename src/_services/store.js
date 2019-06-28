import { createStore, combineReducers } from 'redux'
import loggedUserReducer from './loggedUserReducer'

const reducers = combineReducers({
  loggedUserState: loggedUserReducer
})

const store = createStore(reducers)

export default store