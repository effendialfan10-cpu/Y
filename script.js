let userName = "";
let bmiChart, nutritionChart;

// Navigasi antar halaman
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (userName) {
    document.getElementById("greeting").innerText = `Halo, ${userName}!`;
    document.getElementById("greeting2").innerText = `Hai ${userName}, ayo atur pola makanmu!`;
  }
}

// Mulai aplikasi
function startApp() {
  const nameInput = document.getElementById("username");
  userName = nameInput.value.trim();
  if (!userName) {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }
  showPage("ideal");
}

// Berat Ideal
function calculateIdeal() {
  const gender = document.getElementById("gender").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const result = document.getElementById("idealResult");

  if (!gender || !height || !weight) {
    result.innerHTML = "<p style='color:red;'>Isi semua data terlebih dahulu.</p>";
    return;
  }

  const ideal = gender === "L"
    ? (height - 100) - ((height - 100) * 0.10)
    : (height - 100) - ((height - 100) * 0.15);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  let status = "";
  let tips = "";

  if (bmi < 18.5) {
    status = "Kurus";
    tips = "Tingkatkan asupan protein dan kalori sehat, olahraga beban ringan.";
  } else if (bmi < 24.9) {
    status = "Ideal";
    tips = "Pertahankan pola makan seimbang dan olahraga rutin.";
  } else if (bmi < 29.9) {
    status = "Gemuk";
    tips = "Kurangi gula dan gorengan, tambahkan aktivitas fisik.";
  } else {
    status = "Obesitas";
    tips = "Segera konsultasi ahli gizi, fokus pada pola makan sehat dan olahraga teratur.";
  }

  result.innerHTML = `
    <h3>Hasil Analisis</h3>
    <p><b>Berat Ideal:</b> ${ideal.toFixed(1)} kg</p>
    <p><b>BMI:</b> ${bmi} (${status})</p>
    <p><b>Saran:</b> ${tips}</p>
  `;

  // Grafik BMI
  if (bmiChart) bmiChart.destroy();
  const ctx = document.getElementById("bmiChart").getContext("2d");
  bmiChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["BMI Anda"],
      datasets: [{
        label: "BMI",
        data: [bmi],
        backgroundColor: bmi < 18.5 ? "#81c784" : bmi < 24.9 ? "#4caf50" : bmi < 29.9 ? "#ffb74d" : "#e57373"
      }]
    },
    options: { scales: { y: { beginAtZero: true, max: 40 } } }
  });
}

// Kalkulator Nutrisi
function calculateNutrition() {
  const bb = parseFloat(document.getElementById("nutriWeight").value);
  const aktivitas = document.getElementById("activity").value;
  const result = document.getElementById("nutritionResult");

  if (!bb || !aktivitas) {
    result.innerHTML = "<p style='color:red;'>Isi semua data terlebih dahulu.</p>";
    return;
  }

  const factor = aktivitas === "ringan" ? 30 : aktivitas === "sedang" ? 35 : 40;
  const kalori = bb * factor;
  const protein = bb * 1.2;
  const karbo = (kalori * 0.5) / 4;
  const lemak = (kalori * 0.25) / 9;
  const air = (bb * 35) / 1000;

  result.innerHTML = `
    <h3>Kebutuhan Nutrisi Harian</h3>
    <p>Kalori: <b>${kalori.toFixed(0)} kcal</b></p>
    <p>Protein: <b>${protein.toFixed(1)} g</b></p>
    <p>Karbohidrat: <b>${karbo.toFixed(1)} g</b></p>
    <p>Lemak: <b>${lemak.toFixed(1)} g</b></p>
    <p>Air: <b>${air.toFixed(1)} L</b></p>
  `;

  if (nutritionChart) nutritionChart.destroy();
  const ctx = document.getElementById("nutritionChart").getContext("2d");
  nutritionChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Karbohidrat", "Lemak"],
      datasets: [{
        data: [protein, karbo, lemak],
        backgroundColor: ["#81c784", "#aed581", "#4db6ac"]
      }]
    },
    options: { plugins: { legend: { position: "bottom" } } }
  });
}

// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});

// BMI Result
const olahraga = getExerciseRecommendation(bmi);
result.innerHTML = `
  <h3>Hasil Analisis</h3>
  <p><b>Berat Ideal:</b> ${ideal.toFixed(1)} kg</p>
  <p><b>BMI:</b> ${bmi} (${status})</p>
  <p><b>Saran Pola Makan:</b> ${tips}</p>
  <h4>🏋️‍♂️ Rekomendasi Olahraga:</h4>
  ${olahraga}
`;

// Nutrisi Result
const saranAktivitas = getActivityRecommendation(aktivitas);
result.innerHTML = `
  <h3>Kebutuhan Nutrisi Harian</h3>
  <p>Kalori: <b>${kalori.toFixed(0)} kcal</b></p>
  <p>Protein: <b>${protein.toFixed(1)} g</b></p>
  <p>Karbohidrat: <b>${karbo.toFixed(1)} g</b></p>
  <p>Lemak: <b>${lemak.toFixed(1)} g</b></p>
  <p>Air: <b>${air.toFixed(1)} L</b></p>
  <h4>🏃‍♂️ Rekomendasi Aktivitas Fisik:</h4>
  ${saranAktivitas}
`;
