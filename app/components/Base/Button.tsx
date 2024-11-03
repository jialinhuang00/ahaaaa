import { css } from "@emotion/react";

// Button Component
interface ButtonProps {
  variant?: "outlined" | "contained";
  size?: "small" | "large";
  children: React.ReactNode;
  fullwidth?: boolean;
  onClick?: () => void;
}

/**
 * @example
 * 
  <Button>Button</Button>
  <Button size="large">Button</Button>
  <Button size="large" fullwidth>
    Button
  </Button>
  <Button size="large" fullwidth variant="outlined">
    outline fullwidth fullwidthfullwidth
  </Button>
  <Button variant="outlined">Outlined Button</Button>
  <Button variant="contained">Contained Button</Button>
 * 
 */
export const Button = ({
  variant = "contained",
  size = "small",
  children,
  fullwidth,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${size === "small" ? 20 : 4}px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: ${size === "small" ? 12 : 14}px;
        padding: ${size === "small" ? "8px 10px" : "14px 12px"};
        height: ${size === "small" ? 28 : 40}px;
        font-weight: ${size === "small" ? 400 : 600};
        text-transform: uppercase;
        border: 1px solid transparent;
        background: var(--foreground);
        color: var(--background);
        ${fullwidth &&
        css`
          width: 100%;
        `}

        &:hover {
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--foreground);
        }

        ${variant === "outlined" &&
        css`
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--foreground);

          &:hover {
            background: var(--foreground);
            color: var(--background);
            border: 1px solid var(--background);
          }
        `}
      `}
    >
      {children}
    </button>
  );
};
