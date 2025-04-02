import { type AudioNode } from "@/store";
import { Node } from "@xyflow/react";

export type AudioNodeType = "osc" | "amp" | "out";

const context = new AudioContext();
const nodes = new Map();
context.suspend();
nodes.set("output", context.destination);
export function updateAudioNode(id: string, data: AudioNode) {
  const node = nodes.get(id);

  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = val;
    } else {
      node[key] = val;
    }
  }
}

export function removeAudioNode(id: string) {
  const node = nodes.get(id);

  node.disconnect();
  node.stop?.();

  nodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.connect(target);
}

export function isRunning() {
  return context.state === "running";
}

export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume();
}

type OscData = {
  frequency: number;
  type: OscillatorType;
};

type AmpData = {
  gain: number;
};

type AudioNodeData = {
  osc: OscData;
  amp: AmpData;
  out: Record<string, never>;
};

export function createAudioNode<T extends AudioNodeType>(
  id: string,
  type: T,
  data: AudioNodeData[T]
) {
  switch (type) {
    case "osc": {
      const node = context.createOscillator();
      const oscData = data as OscData;
      node.frequency.value = oscData.frequency;
      node.type = oscData.type;
      node.start();

      nodes.set(id, node);
      break;
    }

    case "amp": {
      const node = context.createGain();
      const ampData = data as AmpData;
      node.gain.value = ampData.gain;

      nodes.set(id, node);
      break;
    }

    case "out": {
      nodes.set(id, context.destination);
      break;
    }
  }
}
