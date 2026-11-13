"use client";

import { Player } from "@remotion/player";
import { Demo, DEMO_DURATION, DEMO_FPS, DEMO_HEIGHT, DEMO_WIDTH, type DemoProps } from "@/remotion/Demo";

export function DemoPlayer(props: DemoProps) {
  return (
    <Player
      component={Demo}
      inputProps={props}
      durationInFrames={DEMO_DURATION}
      fps={DEMO_FPS}
      compositionWidth={DEMO_WIDTH}
      compositionHeight={DEMO_HEIGHT}
      autoPlay
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${DEMO_WIDTH} / ${DEMO_HEIGHT}` }}
    />
  );
}
