import { fireEvent } from "@testing-library/react";
import React, { FC } from "react";
import { Middleware, Reducer } from "redux";
import { useDispatch, useMappedState } from "redux-react-hook";
import { renderReduxComponent, RenderReduxComponent } from ".";

import createSagaMiddleware from "redux-saga";
import { put, take } from "redux-saga/effects";

const reducer: Reducer = (state, { type }) => {
  switch (type) {
    case "ADD":
      return { count: state.count + 1 };

    case "SUBSTRACT":
      return { count: state.count - 1 };

    default:
      return state;
  }
};

interface State {
  count: number;
}

describe("renderReduxComponent", () => {
  let render: (middlewares?: Middleware[]) => ReturnType<RenderReduxComponent>;

  beforeAll(() => {
    const ComponentToRender: FC = () => {
      const dispatch = useDispatch();

      const { count: countState } = useMappedState<State>(({ count }) => ({
        count
      }));

      return (
        <div>
          <button
            data-testid="addButton"
            onClick={() => dispatch({ type: "ADD" })}
          >
            Add
          </button>
          <button
            data-testid="substractButton"
            onClick={() => dispatch({ type: "SUBSTRACT_COUNTER" })}
          >
            Substract
          </button>
          <div data-testid="resultOfCalculations">{countState}</div>
        </div>
      );
    };

    render = middlewares => {
      return renderReduxComponent<State>({
        ui: <ComponentToRender />,
        initialState: { count: 0 },
        rootReducer: reducer,
        middlewares
      });
    };
  });

  describe("without middlewares", () => {
    it("works properly", () => {
      const { getByTestId } = render();

      const addButton = getByTestId("addButton");

      fireEvent.click(addButton);

      expect(Number(getByTestId("resultOfCalculations").textContent)).toBe(1);
    });
  });

  describe("with middlewares", () => {
    it("works properly", () => {
      const sagaMiddleware = createSagaMiddleware();

      function* substractCounterSaga() {
        yield take("SUBSTRACT_COUNTER");

        yield put({ type: "SUBSTRACT" });
      }
      const { getByTestId } = render([sagaMiddleware]);

      sagaMiddleware.run(substractCounterSaga);

      const substractButton = getByTestId("substractButton");

      fireEvent.click(substractButton);

      expect(Number(getByTestId("resultOfCalculations").textContent)).toBe(-1);
    });
  });
});
