
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { getOperatorDistributionFromAllocations } from "../services/api";

Chart.register(ArcElement, Tooltip, Legend);

function OperatorDistributionChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getOperatorDistributionFromAllocations();
        // result = [{ operator: "Turkcell", count: 3 }, { operator: "Vodafone", count: 2 }]
        const labels = result.map((r) => r.operator);
        const counts = result.map((r) => r.count);

        setData({
          labels,
          datasets: [
            {
              label: "Hat Sayısı",
              data: counts,
              backgroundColor: [
                "#36A2EB",
                "#FF6384",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3>Operatör Bazlı Hat Dağılımı</h3>
      <Pie data={data} />
    </div>
  );
}

export default OperatorDistributionChart;
