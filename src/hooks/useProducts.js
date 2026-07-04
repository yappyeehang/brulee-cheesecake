import { useState, useEffect } from "react";

const SHEET_ID = "1GAOkBLngJcf2E87Zmz521-l_mFipc9edRCyMydQb2rc";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

function parseSheetData(json) {
  const rows = json.table.rows;
  return rows.map(row => ({
    id:          row.c[0]?.v?.toString() ?? "",
    name:        row.c[1]?.v ?? "",
    category:    row.c[2]?.v ?? "",
    price:       Number(row.c[3]?.v ?? 0),
    description: row.c[4]?.v ?? "",
    available:   row.c[5]?.v !== false && row.c[5]?.v !== "FALSE",
    image:       row.c[6]?.v ?? null,
  })).filter(p => p.available && p.name);
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then(r => r.text())
      .then(text => {
        // Google returns: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/)[1]);
        setProducts(parseSheetData(json));
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return { products, loading, error };
}
