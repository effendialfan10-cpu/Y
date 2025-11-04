// Saran olahraga berdasarkan BMI
function getExerciseRecommendation(bmi) {
  if (bmi < 18.5) {
    return `
      <ul>
        <li>🏋️‍♂️ Latihan beban ringan 2–3x seminggu</li>
        <li>🚶 Jalan santai pagi/sore</li>
        <li>🧘 Yoga atau stretching untuk postur</li>
      </ul>`;
  } else if (bmi < 24.9) {
    return `
      <ul>
        <li>🏃 Jogging 3x seminggu (30 menit)</li>
        <li>🚴 Bersepeda ringan</li>
        <li>🏋️‍♀️ Latihan beban sedang untuk menjaga massa otot</li>
      </ul>`;
  } else if (bmi < 29.9) {
    return `
      <ul>
        <li>🏃 Jalan cepat atau treadmill 4–5x seminggu</li>
        <li>🚴 Sepeda statis atau outdoor</li>
        <li>🤸 Senam aerobik atau zumba</li>
      </ul>`;
  } else {
    return `
      <ul>
        <li>🚶 Jalan kaki 20–30 menit setiap hari</li>
        <li>🏊 Berenang (low impact & efektif)</li>
        <li>🧘 Yoga / Pilates untuk kelenturan dan kekuatan</li>
      </ul>`;
  }
}

// Saran aktivitas fisik berdasarkan tingkat aktivitas
function getActivityRecommendation(activity) {
  if (activity === "ringan") {
    return `
      <ul>
        <li>🚶 Jalan kaki 30 menit per hari</li>
        <li>🧘 Yoga atau peregangan ringan</li>
        <li>🪜 Naik-turun tangga 10 menit</li>
      </ul>`;
  } else if (activity === "sedang") {
    return `
      <ul>
        <li>🏃 Jogging 3–4x seminggu</li>
        <li>🚴 Sepeda santai</li>
        <li>🏋️ Latihan beban sedang</li>
      </ul>`;
  } else { // berat
    return `
      <ul>
        <li>🏋️ HIIT 3x seminggu</li>
        <li>🏊 Berenang 2x seminggu</li>
        <li>⚽ Aktivitas outdoor intens (futsal / hiking)</li>
      </ul>`;
  }
}
