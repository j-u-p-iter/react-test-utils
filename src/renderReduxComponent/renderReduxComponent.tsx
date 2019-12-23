import { render, RenderResult } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Middleware, Reducer } from "redux";

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

  return render(<Provider store={store}>{ui}</Provider>);
};
