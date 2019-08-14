import { render, RenderResult } from "@testing-library/react";
import React, { ReactNode } from "react";
import { applyMiddleware, createStore, Middleware, Reducer } from "redux";
import { StoreContext } from "redux-react-hook";

interface Options<InitialState> {
  ui: ReactNode;
  initialState: InitialState;
  rootReducer: Reducer;
  middlewares?: Middleware[];
}

export type RenderReduxComponent = <InitialState>(
  options: Options<InitialState>
) => RenderResult;

export const renderReduxComponent: RenderReduxComponent = ({
  ui,
  initialState,
  middlewares = [],
  rootReducer
}) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return render(
    <StoreContext.Provider value={store}>{ui}</StoreContext.Provider>
  );
};
