import { createWindowMock } from ".";

describe("createWindowMock", () => {
  it("should work properly", () => {
    const windowScrollMock = createWindowMock("scrollTo");
    const coordinatesScrollTo = [0, 0];

    let result = window.scrollTo(...(coordinatesScrollTo as ScrollToOptions[]));

    expect(windowScrollMock).toHaveBeenCalledTimes(1);
    expect(windowScrollMock).toHaveBeenCalledWith(...coordinatesScrollTo);
    expect(result).toBeUndefined();

    const windowPostMessageImplementation = jest.fn(message => message);
    const windowPostMessageMock = createWindowMock(
      "postMessage",
      windowPostMessageImplementation
    );

    result = window.postMessage("some message", "*");

    expect(windowPostMessageMock).toHaveBeenCalledTimes(1);
    expect(windowPostMessageMock).toHaveBeenCalledWith("some message", "*");
    expect(result).toBe("some message");
  });
});
