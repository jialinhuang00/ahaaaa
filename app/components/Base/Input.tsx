import { css } from "@emotion/react";

// Input Component
interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const inputStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    width: 100%;
  `,
  label: css`
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
  `,
  input: css`
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 3x solid #333;
    border-radius: 4px;
    color: var(--foreground);
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--primary);
    }
  `,
};

/**
 * @example
  <Input label="label" placeholder="Keyword" />
 */
export const Input = ({ placeholder, value, onChange, label }: InputProps) => {
  return (
    <div css={inputStyles.container}>
      <label css={inputStyles.label} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        css={inputStyles.input}
      />
    </div>
  );
};
