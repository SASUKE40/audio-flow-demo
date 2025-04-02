import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore, type StoreApi } from "../store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const selector = (store: StoreApi) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({ id, data }: { id: string; data: AudioNode }) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Button
        onClick={toggleAudio}
        className="flex justify-center items-center"
        variant="secondary"
      >
        {isRunning ? (
          <span role="img" aria-label="mute">
            🔇
          </span>
        ) : (
          <span role="img" aria-label="unmute">
            🔈
          </span>
        )}
      </Button>
    </div>
  );
}
