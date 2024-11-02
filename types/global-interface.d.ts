/// <reference types="@emotion/react/types/css-prop" />
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    // 你可以在這裡定義主題的型別
    colors: {
      primary: string;
      secondary: string;
      // ...其他顏色
    };
    // ...其他主題屬性
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

/** 「ReactProps」的別名，但沒有「prop.children」取而代之「renderProps」模式 */
declare type ReactPropsRequiredComponent<
  PropsOfRender extends
    | Record<string | symbol, unknown>
    | undefined = PropsOfRender extends undefined ? void : PropsOfRender
> = {
  component: React.ElementType<ReactProps<PropsOfRender>>;
};

type CssPropAsClassName = {
  /** 當你為組件添加 `css={css``}` 時，在該組件的實作中，emotion 會將 `css` 轉為 `className` 作為 props 傳入 */
  className?: string;
};

declare module "*.txt";
