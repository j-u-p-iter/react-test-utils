import cases from "jest-in-case";
import React from "react";
import waitForExpect from "wait-for-expect";
import { renderWithReactRouter, RenderWithReactRouter } from ".";

describe("renderWithReactRouter(ComponentToRender)", () => {
  let renderResults: ReturnType<RenderWithReactRouter>;

  beforeAll(() => {
    renderResults = renderWithReactRouter(() => <div>Hello</div>);
  });

  cases(
    "allows to test routing properly",
    async ({ pathToGo }) => {
      renderResults.goTo!(pathToGo);

      await waitForExpect(() => {
        const result = renderResults.propsFromRouter!.location.pathname;
        const expected = pathToGo;

        expect(result).toBe(expected);
      });
    },
    {
      "renders on new path properly": { pathToGo: "/some/path" },
      "renders on new path properly one more time": {
        pathToGo: "/some/new/path"
      }
    }
  );
});
