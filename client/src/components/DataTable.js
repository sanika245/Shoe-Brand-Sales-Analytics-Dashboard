//import axios from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DataTable({ start, end }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/table?start=${start}&end=${end}`)
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [start, end]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead style={{ background: "#f4f6f8" }}>
          <tr>
            <th style={thStyle}>Shoe</th>
            <th style={thStyle}>Sales</th>
            <th style={thStyle}>Ad Cost</th>
            <th style={thStyle}>Impressions</th>
            <th style={thStyle}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No data available
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r._id}>
                <td style={tdStyle}>{r._id}</td>
                <td style={tdStyle}>{r.sales}</td>
                <td style={tdStyle}>₹{r.advertisingCost}</td>
                <td style={tdStyle}>{r.impressions}</td>
                <td style={tdStyle}>{r.clicks}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};
