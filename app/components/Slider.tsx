import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

interface SliderProps {
  min?: number;
  max?: number;
  defaultValue: number;
  onChange: (value: number) => void;
  step?: number;
}
// Generate tick marks
function generateTicks(min: number, max: number, step: number) {
  const ticks = [min];
  for (let i = min + step; i < max; i += step) {
    ticks.push(i);
  }
  ticks.push(max);
  return ticks;
}

const sliderStyles = {
  container: css`
    width: 100%;
    padding: 10px 0;
    user-select: none;
  `,
  track: css`
    position: relative;
    height: 4px;
    background: #333;
    border-radius: 2px;
    cursor: pointer;
  `,
  progress: (percentage: number) => css`
    position: absolute;
    height: 100%;
    background: linear-gradient(to right, #ff5722, #ffc107);
    border-radius: 2px;
    width: ${percentage}%;
  `,
  thumb: css`
    width: 20px;
    height: 20px;
    background: var(--background);
    border: 5px solid #ffc107;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 0 0 8px rgba(255, 193, 7, 0.1);
    }

    &:active {
      cursor: grabbing;
      box-shadow: 0 0 0 12px rgba(255, 193, 7, 0.2);
    }
  `,
  labels: css`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    color: #666;
  `,
  label: css`
    text-align: center;
    font-size: 16px;
  `,
};

/**
 * @example
 * <Slider defaultValue={70} onChange={() => {}} />
 */
export const Slider = ({
  min = 0,
  max = 80,
  defaultValue = 20,
  onChange,
  step = 10,
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef(0);
  const dragStartRef = useRef({
    startX: 0,
    startValue: 0,
    trackWidth: 0,
  });

  const calculateNewValue = useCallback(
    (clientX: number, dragStart = false) => {
      if (!trackRef.current) return defaultValue;
      const rect = trackRef.current.getBoundingClientRect();

      if (dragStart) {
        dragStartRef.current = {
          startX: clientX,
          startValue: localValue,
          trackWidth: rect.width,
        };
        return localValue;
      }

      // Calculate the change in position relative to the drag start
      const deltaX = clientX - dragStartRef.current.startX;
      const deltaPercentage = (deltaX / dragStartRef.current.trackWidth) * 100;
      const valueDelta = (deltaPercentage / 100) * (max - min);

      // Calculate new value based on the starting value plus the change
      const rawValue = dragStartRef.current.startValue + valueDelta;
      const steppedValue = Math.round(rawValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [defaultValue, max, min, step, localValue]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateNewValue(e.clientX, true); // Initialize drag start values
    e.preventDefault();
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const now = Date.now();
        if (now - lastUpdateRef.current > 16) {
          const newValue = calculateNewValue(e.clientX);
          setLocalValue(newValue);
          onChange(newValue);
          lastUpdateRef.current = now;
        }
      }
    },
    [isDragging, calculateNewValue, onChange]
  );

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const rawValue = (percentage / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    const newValue = Math.max(min, Math.min(max, steppedValue));

    onChange(newValue);
    setLocalValue(newValue);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isDragging) {
      setLocalValue(localValue);
    }
  }, [localValue, isDragging]);

  const ticks = generateTicks(min, max, step);
  const percentage = ((localValue - min) / (max - min)) * 100;
  return (
    <div css={sliderStyles.container}>
      <div ref={trackRef} onClick={handleTrackClick} css={sliderStyles.track}>
        <div css={sliderStyles.progress(percentage)} />
        <div
          css={[
            sliderStyles.thumb,
            css`
              left: calc(${percentage}% - ${percentage / 100}px);
              will-change: left;
            `,
          ]}
          onMouseDown={handleMouseDown}
        />
      </div>
      <div css={sliderStyles.labels}>
        {ticks.map((tick, idx) => (
          <div
            key={idx}
            css={css`
              position: relative;
            `}
          >
            <span
              css={css`
                ${sliderStyles.label};
                position: absolute;
                left: ${idx ? -9 : 0}px;
              `}
            >
              {tick}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
