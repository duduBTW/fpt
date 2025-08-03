import styled from "styled-components";
import * as variables from "../variables/_variables.js";
import { typography } from "../typography.js";

type ProgressBarVariant = "linear" | "circular";
type SharedProgressBarProps = {
  label?: string;
  // number in betwee 0 - 1.
  progress: number;
};
type ProgressBarProps = {
  variant: ProgressBarVariant;
} & SharedProgressBarProps;

export function ProgressBar(props: ProgressBarProps) {
  const { variant, ...rest } = props;
  switch (variant) {
    case "circular":
      return <Circular {...rest} />;
    case "linear":
      return <Linear {...rest} />;
    default:
      throw new Error("Invalid progress indicator variant.");
  }
}

function Circular(props: SharedProgressBarProps) {
  const progressColor = variables.ProgressBarColorProgress;
  const backgroundColor = variables.ProgressBarColorBackground;
  const strokeSize = variables.ProgressBarSpacingCircularStrokeSize;
  const size = variables.ProgressBarSpacingCircularSize;
  const halfSize = size / 2;
  const radius = halfSize - strokeSize;
  const circumference = 3.14 * radius * 2;
  const percentage = Math.round(circumference * (1 - props.progress));

  return (
    <styles.circleWrapper>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle
          cx={halfSize}
          cy={halfSize}
          r={radius}
          stroke={backgroundColor}
          stroke-width={strokeSize}
          fill="transparent"
        />
        <circle
          cx={halfSize}
          cy={halfSize}
          r={radius}
          stroke={progressColor}
          stroke-width={strokeSize}
          fill="transparent"
          stroke-linecap="round"
          stroke-dasharray={circumference}
          stroke-dashoffset={percentage}
        />
      </svg>

      {props.label ? (
        <styles.circleProgressText>{props.label}</styles.circleProgressText>
      ) : null}
    </styles.circleWrapper>
  );
}

function Linear(props: SharedProgressBarProps) {
  return <div></div>;
}

const styles = {
  circleWrapper: styled.div`
    position: relative;
  `,
  circleProgressText: styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    ${typography.sm}
    color: var(--progress-bar-color-content);
  `,
} as const;
