function calculateProbability() {
  // Formdan girdileri al
  var teamAPlayed = parseInt(document.getElementById("teamAPlayed").value);
  var teamBPlayed = parseInt(document.getElementById("teamBPlayed").value);
  var teamAGoals = parseInt(document.getElementById("teamAGoals").value);
  var teamBGoals = parseInt(document.getElementById("teamBGoals").value);
  var teamAShotsOnTarget = parseInt(document.getElementById("teamAShotsOnTarget").value);
  var teamBShotsOnTarget = parseInt(document.getElementById("teamBShotsOnTarget").value);
  var teamAShotsAccuracy = parseFloat(document.getElementById("teamAShotsAccuracy").value);
  var teamBShotsAccuracy = parseFloat(document.getElementById("teamBShotsAccuracy").value);
  var teamAGoalConversion = parseFloat(document.getElementById("teamAGoalConversion").value);
  var teamBGoalConversion = parseFloat(document.getElementById("teamBGoalConversion").value);
  var teamAHomePlayed = parseInt(document.getElementById("teamAHomePlayed").value);
  var teamBAwayPlayed = parseInt(document.getElementById("teamBAwayPlayed").value);
  var teamAGoalsHome = parseInt(document.getElementById("teamAGoalsHome").value);
  var teamBGoalsAway = parseInt(document.getElementById("teamBGoalsAway").value);

  // Takım A'ya göre ortalama gol sayısı
  var teamAGoalsAvg = teamAGoals / teamAPlayed;
  
  // Takım B'ye göre ortalama gol sayısı
  var teamBGoalsAvg = teamBGoals / teamBPlayed;

  // Toplam maç sayısı
  var totalMatches = teamAPlayed + teamBPlayed;

  // Toplam gol sayısı
  var totalGoals = teamAGoals + teamBGoals;

  // Takım A'nın toplam isabetli şut oranı
  var teamAShotsAccuracyTotal = teamAShotsOnTarget / (teamAPlayed * 10);
  
  // Takım B'nin toplam isabetli şut oranı
  var teamBShotsAccuracyTotal = teamBShotsOnTarget / (teamBPlayed * 10);

  // Takım A'nın toplam gol oluşturma oranı
  var teamAGoalConversionTotal = teamAGoals / (teamAPlayed * teamAShotsOnTarget);
  
  // Takım B'nin toplam gol oluşturma oranı
  var teamBGoalConversionTotal = teamBGoals / (teamBPlayed * teamBShotsOnTarget);

  // Takım A'nın iç sahada attığı gol ortalaması
  var teamAGoalsHomeAvg = teamAGoalsHome / teamAHomePlayed;
  
  // Takım B'nin dış sahada attığı gol ortalaması
  var teamBGoalsAwayAvg = teamBGoalsAway / teamBAwayPlayed;

  // Takım A'nın evindeki maçların toplam gol ortalaması
  var teamAHomeGoalsAvg = (teamAGoalsHome + teamBGoalsAway) / (teamAHomePlayed + teamBAwayPlayed);

  // Takım B'nin deplasmandaki maçların toplam gol ortalaması
  var teamBAwayGoalsAvg = (teamBGoalsAway + teamAGoalsHome) / (teamAHomePlayed + teamBAwayPlayed);

  // Maçın üst bitme olasılığı
  var probability = 1 - (0.5 * (poisson(teamAGoalsAvg + teamBGoalsAvg, totalGoals) + poisson(teamAShotsAccuracyTotal + teamBShotsAccuracyTotal, 10) + poisson(teamAGoalConversionTotal + teamBGoalConversionTotal, 0.3) + poisson(teamAHomeGoalsAvg + teamBAwayGoalsAvg, 2)));

  // Sonucu HTML sayfasına yaz
  document.getElementById("result").innerHTML = "Maçın üst bitme olasılığı: %" + (probability * 100).toFixed(2);
}

// Poisson dağılımını hesapla
function poisson(lambda, k) {
  return Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
}

// Faktöriyel hesapla
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
