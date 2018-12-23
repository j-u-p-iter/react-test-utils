import * as reactTestUtils from "../.";

describe("main entry point", () => {
  it("exports all utils", () => {
    expect(reactTestUtils.renderWithReactRouter).toBeDefined();
  });
});
