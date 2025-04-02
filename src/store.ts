import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type NodeChange,
  type Edge,
  type EdgeChange,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";
import {
  type AudioNodeType,
  connect,
  createAudioNode,
  isRunning,
  removeAudioNode,
  toggleAudio,
  updateAudioNode,
} from "@/audio";

export interface StoreApi {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addEdge: (data: Omit<Edge, "id">) => void;
  updateNode: (id: string, data: Partial<AudioNode>) => void;
  isRunning: boolean;
  toggleAudio: () => void;
  removeNodes: (nodes: Node[]) => void;
  createNode: (type: AudioNodeType) => void;
}

export interface AudioNode extends Node {
  frequency: number;
  type: OscillatorType;
  gain: number;
}

export const useStore = createWithEqualityFn<StoreApi>((set, get) => ({
  nodes: [{ id: "output", type: "out", position: { x: 0, y: 0 }, data: {} }],
  edges: [],

  isRunning: isRunning(),

  toggleAudio: () => {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  addEdge(data: Omit<Edge, "id">) {
    const id = nanoid(6);
    const edge: Edge = { id, ...data };
    connect(edge.source, edge.target);
    set({ edges: [edge, ...get().edges] });
  },

  updateNode: (id: string, data: Partial<Node>) => {
    updateAudioNode(id, data as AudioNode);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  removeNodes(nodes: Node[]) {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  },

  createNode(type: AudioNodeType) {
    const id = nanoid();

    switch (type) {
      case "osc": {
        const data = { frequency: 440, type: "sine" as OscillatorType };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case "amp": {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },
}));
