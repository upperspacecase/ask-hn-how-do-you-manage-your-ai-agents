import { Composition } from "remotion";
import { DEFAULT_CLIENTS, Demo, DEMO_DURATION, DEMO_FPS, DEMO_HEIGHT, DEMO_WIDTH } from "./Demo";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Demo"
    component={Demo}
    defaultProps={DEFAULT_CLIENTS}
    durationInFrames={DEMO_DURATION}
    fps={DEMO_FPS}
    width={DEMO_WIDTH}
    height={DEMO_HEIGHT}
  />
);
