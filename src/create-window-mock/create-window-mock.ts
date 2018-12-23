type CreateWindowMock = (
  methodNameToMock: any,
  mockImplementation?: (...args: any[]) => any
) => any;

export const createWindowMock: CreateWindowMock = (
  methodNameToMock,
  mockImplementation = () => {}
) =>
  jest.spyOn(window, methodNameToMock).mockImplementation(mockImplementation);
