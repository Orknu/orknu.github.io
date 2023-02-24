function calculateOverProb(aGoals, bGoals, aMatches, bMatches) {
  const aAvgGoals = aGoals / aMatches;
  const bAvgGoals = bGoals / bMatches;
  const totalAvgGoals = (aGoals + bGoals) / (aMatches + bMatches);
  const poissonA = poisson(aAvgGoals, totalAvgGoals);
  const poissonB = poisson(bAvgGoals, totalAvgGoals);
  let overProb = 0;
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
      if (i + j > 2.5) {
        overProb += poissonA[i] * poissonB[j];
      }
    }
  }
  return overProb;
}

function poisson(avgGoals, x) {
  const poissonArr = [];
  for (let i = 0; i <= 10; i++) {
    poissonArr[i] = Math.pow(Math.E, -avgGoals) * Math.pow(avgGoals, i) / factorial(i);
  }
  return poissonArr;
}

function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Test etmek için örnek veriler kullanalım
const aGoals = 15;
const bGoals = 10;
const aMatches = 8;
const bMatches = 6;
const overProb = calculateOverProb(aGoals, bGoals, aMatches, bMatches);
console.log(overProb); // Örnek veriler için sonucu konsolda yazdırır

function calculate() {
  const aGoals = parseInt(document.getElementById("a-goals").value);
  const bGoals = parseInt(document.getElementById("b-goals").value);
  const aMatches = parseInt(document.getElementById("a-matches").value);
  const bMatches = parseInt(document.getElementById("b-matches").value);
  const overProb = calculateOverProb(aGoals, bGoals, aMatches, bMatches);
  document.getElementById("result").innerHTML = "Üst Bitme Olasılığı: " + overProb.toFixed(2);
  return false; // sayfa yenilenmesini engellemek için false döndürür
}
