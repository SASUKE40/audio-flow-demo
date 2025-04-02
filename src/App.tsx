import "@xyflow/react/dist/style.css";
import "./App.css";
import { Background, Panel, ReactFlow } from "@xyflow/react";
import { useStore, type StoreApi } from "@/store";
import { shallow } from "zustand/shallow";

import Osc from "@/nodes/Osc";
import Out from "@/nodes/Out";
import Amp from "@/nodes/Amp";
import { Button } from "@/components/ui/button";

const selector = (store: StoreApi) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes,
  createNode: store.createNode,
});

const nodeTypes = { osc: Osc, out: Out, amp: Amp };

function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      onNodesDelete={store.onNodesDelete}
      fitView
    >
      <Panel position="top-right">
        <Button className="mr-2" onClick={() => store.createNode("osc")}>
          OSC
        </Button>
        <Button onClick={() => store.createNode("amp")}>AMP</Button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}

export default App;
