import { useState } from "react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { Background, ReactFlow } from "@xyflow/react";
import { useStore, type StoreApi } from "@/store";
import { shallow } from "zustand/shallow";

import Osc from "@/nodes/Osc";

const selector = (store: StoreApi) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

const nodeTypes = { osc: Osc };

function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
    >
      <Background />
    </ReactFlow>
  );
}

export default App;
