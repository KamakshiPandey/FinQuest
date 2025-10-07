import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
// Import other reducers here if you have them

const rootReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
});

export default rootReducer;