import { useStore, type StoreApi, type AudioNode } from "@/store";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selector = (id: string) => (store: StoreApi) => ({
  setFrequency: (frequency: number[]) =>
    store.updateNode(id, { frequency: frequency[0] }),
  setType: (type: OscillatorType) => store.updateNode(id, { type }),
});

export default function Osc({ id, data }: { id: string; data: AudioNode }) {
  const { setFrequency, setType } = useStore(selector(id), shallow);
  return (
    <Card key={id} className="bg-blue-500 gap-0">
      <CardHeader className={"text-white pb-4"}>
        <CardTitle>Oscillator Node</CardTitle>
      </CardHeader>
      <CardContent className="bg-white py-4">
        <Label className="flex flex-col items-center justify-center">
          <div className="w-full text-left text-gray-700 font-semibold">
            Frequency
          </div>
          <Slider
            className="nodrag"
            min={10}
            max={1000}
            defaultValue={[data.frequency]}
            onValueChange={setFrequency}
          />
          <div className="w-full text-right text-gray-700">
            {data.frequency}Hz
          </div>
        </Label>
        <Label className="flex flex-col">
          <div className="w-full text-left text-gray-700 font-semibold">
            Waveform
          </div>
          <Select defaultValue={data.type} onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sine">sine</SelectItem>
              <SelectItem value="triangle">triangle</SelectItem>
              <SelectItem value="sawtooth">sawtooth</SelectItem>
              <SelectItem value="square">square</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Handle type="source" position={Position.Bottom} />
      </CardContent>
    </Card>
  );
}
