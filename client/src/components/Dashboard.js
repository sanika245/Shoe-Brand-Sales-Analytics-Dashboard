import { useState } from "react";
import SummaryTiles from "./SummaryTiles";
import ChartSection from "./ChartSection";
import DataTable from "./DataTable";

export default function Dashboard() {
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState("2026-01-31");

  return (
    <div>
      <h1>Shoe Brand Dashboard</h1>

      <input type="date" onChange={e => setStart(e.target.value)} />
      <input type="date" onChange={e => setEnd(e.target.value)} />

      <SummaryTiles start={start} end={end} />
      <ChartSection start={start} end={end} />
      <DataTable start={start} end={end} />
    </div>
  );
}
