/// <reference types="@emotion/react/types/css-prop" />
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

declare type ReactProps<
  P extends Record<string | symbol, unknown> = CssPropAsClassName
> = React.PropsWithChildren<P & CssPropAsClassName>;

declare type ReactPropsRequiredChildren<
  P extends Record<string | symbol, unknown> = CssPropAsClassName
> = import("type-fest").SetRequired<
  React.PropsWithChildren<P & CssPropAsClassName>,
  "children"
>;

declare type ReactPropsRequiredComponent<
  PropsOfRender extends
    | Record<string | symbol, unknown>
    | undefined = PropsOfRender extends undefined ? void : PropsOfRender
> = {
  component: React.ElementType<ReactProps<PropsOfRender>>;
};

type CssPropAsClassName = {
  className?: string;
};

declare module "*.txt";
