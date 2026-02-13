import axios from "axios";
import { useEffect, useState } from "react";

export default function SummaryTiles({ start, end }) {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/summary?start=${start}&end=${end}`)
      .then(res => setData(res.data));
  }, [start, end]);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>Total Sales: {data?.totalSales}</div>
      <div>Ad Cost: {data?.totalAdCost}</div>
      <div>Impressions: {data?.totalImpressions}</div>
      <div>Clicks: {data?.totalClicks}</div>
    </div>
  );
}
