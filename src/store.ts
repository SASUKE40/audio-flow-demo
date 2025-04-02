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

export interface StoreApi {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addEdge: (data: Omit<Edge, "id">) => void;
  updateNode: (id: string, data: Partial<AudioNode>) => void;
  isRunning: boolean;
  toggleAudio: () => void;
}

export interface AudioNode extends Node {
  frequency: number;
  type: string;
}

export const useStore = createWithEqualityFn<StoreApi>((set, get) => ({
  nodes: [
    {
      type: "osc",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },
    { id: "c", type: "out", position: { x: 100, y: 500 }, data: {} },
  ],
  edges: [],

  isRunning: false,

  toggleAudio: () => {
    set({ isRunning: !get().isRunning });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  addEdge(data: Omit<Edge, "id">) {
    const id = nanoid(16);
    const edge: Edge = { id, ...data };
    set({ edges: [edge, ...get().edges] });
  },

  updateNode: (id: string, data: Partial<Node>) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
}));
