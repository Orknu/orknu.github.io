function calculate() {
	var totalMatchesA = document.getElementById('total-matches-a').value;
	var totalGoalsA = document.getElementById('total-goals-a').value;
	var totalShotsOnTargetA = document.getElementById('total-shots-on-target-a').value;
	var shotAccuracyA = document.getElementById('shot-accuracy-a').value;
	var conversionRateA = document.getElementById('conversion-rate-a').value;

	var totalMatchesB = document.getElementById('total-matches-b').value;
	var totalGoalsB = document.getElementById('total-goals-b').value;
	var totalShotsOnTargetB = document.getElementById('total-shots-on-target-b').value;
	var shotAccuracyB = document.getElementById('shot-accuracy-b').value;
	var conversionRateB = document.getElementById('conversion-rate-b').value;

	// Algoritmayı burada uygulayın
	var avgGoalsA = totalGoalsA / totalMatchesA;
	var avgGoalsB = totalGoalsB / totalMatchesB;
	var avgShotsOnTargetA = totalShotsOnTargetA / totalMatchesA;
	var avgShotsOnTargetB = totalShotsOnTargetB / totalMatchesB;
	var shotConversionRateA = conversionRateA / 100;
	var shotConversionRateB = conversionRateB / 100;
	var probability = (avgGoalsA * shotAccuracyA * shotConversionRateA + avgGoalsB * shotAccuracyB * shotConversionRateB) / (avgShotsOnTargetA + avgShotsOnTargetB);

// Eğer ihtimal 1'den büyükse, 1'e eşitle
if (probability > 1) {
  probability = 1;
}

// Sonucu HTML'de gösterin
document.getElementById('result').innerHTML = '<p>Maçın üst bitme ihtimali: ' + (probability * 100).toFixed(2) + '%</p>';

}
