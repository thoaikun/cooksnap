import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileStore from "./reducers/profile";

const rootReducer = combineReducers({
  profileStore: profileStore.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;