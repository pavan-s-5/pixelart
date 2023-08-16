import {combineReducers} from 'redux'
import userReducer from './reducer/userReducer';
import feedReducer from './reducer/feedReducer'


const myReducer = combineReducers ({
    user : userReducer,
    feeds : feedReducer,
})

export default myReducer;