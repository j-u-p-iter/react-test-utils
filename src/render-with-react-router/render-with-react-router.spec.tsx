import cases from "jest-in-case";
import React from "react";
import waitForExpect from "wait-for-expect";
import { renderWithReactRouter, RenderWithReactRouter } from ".";

describe("renderWithReactRouter(ComponentToRender)", () => {
  let renderResults: ReturnType<RenderWithReactRouter>;

  beforeAll(() => {
    const ComponentToRender = () => <div>Hello</div>;

    renderResults = renderWithReactRouter(ComponentToRender);
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
    [{ pathToGo: "/some/path" }, { pathToGo: "/some/new/path" }]
  );
});
