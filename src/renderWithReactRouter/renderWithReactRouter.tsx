import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, RouteComponentProps } from "react-router-dom";

type PropsFromRouter = RouteComponentProps<any>;

export type RenderWithReactRouter = (
  ComponentToRender: ComponentType<RouteComponentProps<any>>
) => {
  propsFromRouter?: PropsFromRouter;
  goTo?: (pathName: string) => void;
};

export const renderWithReactRouter: RenderWithReactRouter = ComponentToRender => {
  const renderResults: ReturnType<RenderWithReactRouter> = {};

  ReactDOM.render(
    <MemoryRouter>
      <Route
        render={props => {
          const propsFromRouter = props;

          renderResults.propsFromRouter = propsFromRouter;
          renderResults.goTo = pathname => {
            return propsFromRouter.history.push(pathname);
          };

          return <ComponentToRender {...props} />;
        }}
      />
    </MemoryRouter>,
    document.createElement("div")
  );

  return renderResults;
};
