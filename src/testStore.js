import { compose, legacy_createStore as createStore, } from "redux";
import rootReducer from "./reducers/rootReducer";

export const testStore = createStore(rootReducer, compose);
