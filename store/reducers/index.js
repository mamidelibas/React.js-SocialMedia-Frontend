import  {combineReducers} from 'redux';
import userReducer from './userReducer';
import contentPingReducer from './contentPingReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    user: userReducer,
    contentPing: contentPingReducer,
    search: searchReducer,
});

export default rootReducer;