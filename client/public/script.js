let chart;

// 🔹 Replace this with fetch("/api/data") later
function getData() {
  return [
    { shoeName: "Adidas Ultraboost", sales: 130, advertisingCost: 35, impressions: 2600, clicks: 170, date: "2026-01-01" },
    { shoeName: "Adidas Ultraboost", sales: 180, advertisingCost: 50, impressions: 3400, clicks: 240, date: "2026-01-31" },
    { shoeName: "Puma Runner", sales: 90, advertisingCost: 20, impressions: 1800, clicks: 110, date: "2026-01-01" },
    { shoeName: "Puma Runner", sales: 140, advertisingCost: 30, impressions: 2500, clicks: 160, date: "2026-01-31" },
    { shoeName: "Reebok Classic", sales: 70, advertisingCost: 15, impressions: 1400, clicks: 90, date: "2026-01-01" },
    { shoeName: "Reebok Classic", sales: 120, advertisingCost: 25, impressions: 2100, clicks: 140, date: "2026-01-31" }
  ];
}

function loadDashboard() {

  let data = getData();

  let start = document.getElementById("startDate").value;
  let end = document.getElementById("endDate").value;

  if (start && end) {
    data = data.filter(d => d.date >= start && d.date <= end);
  }

  updateTiles(data);
  updateTable(data);
  updateChart(data);
  populateShoes(data);
}

function updateTiles(data) {

  let sales = 0, ad = 0, imp = 0, click = 0;

  data.forEach(d => {
    sales += d.sales;
    ad += d.advertisingCost;
    imp += d.impressions;
    click += d.clicks;
  });

  document.getElementById("tileSales").innerText = sales;
  document.getElementById("tileAd").innerText = ad;
  document.getElementById("tileImp").innerText = imp;
  document.getElementById("tileClick").innerText = click;
}

function populateShoes(data) {

  const select = document.getElementById("shoeSelect");
  const shoes = [...new Set(data.map(d => d.shoeName))];

  select.innerHTML = "";

  shoes.forEach(s => {
    select.innerHTML += `<option value="${s}">${s}</option>`;
  });
}

function updateChart(data) {

  const shoe = document.getElementById("shoeSelect").value;
  const m1 = document.getElementById("metric1").value;
  const m2 = document.getElementById("metric2").value;

  const filtered = data.filter(d => d.shoeName === shoe);

  const labels = filtered.map(d => d.date);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: m1,
          data: filtered.map(d => d[m1]),
          borderColor: "#2e86de"
        },
        {
          label: m2,
          data: filtered.map(d => d[m2]),
          borderColor: "#eb3b5a"
        }
      ]
    }
  });
}

function updateTable(data) {

  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  let grouped = {};

  data.forEach(d => {
    if (!grouped[d.shoeName]) {
      grouped[d.shoeName] = { sales: 0, ad: 0, imp: 0, click: 0 };
    }

    grouped[d.shoeName].sales += d.sales;
    grouped[d.shoeName].ad += d.advertisingCost;
    grouped[d.shoeName].imp += d.impressions;
    grouped[d.shoeName].click += d.clicks;
  });

  let gS = 0, gA = 0, gI = 0, gC = 0;

  for (let shoe in grouped) {

    body.innerHTML += `
      <tr>
        <td>${shoe}</td>
        <td>${grouped[shoe].sales}</td>
        <td>${grouped[shoe].ad}</td>
        <td>${grouped[shoe].imp}</td>
        <td>${grouped[shoe].click}</td>
      </tr>
    `;

    gS += grouped[shoe].sales;
    gA += grouped[shoe].ad;
    gI += grouped[shoe].imp;
    gC += grouped[shoe].click;
  }

  document.getElementById("gSales").innerText = gS;
  document.getElementById("gAd").innerText = gA;
  document.getElementById("gImp").innerText = gI;
  document.getElementById("gClick").innerText = gC;
}

window.onload = loadDashboard;
