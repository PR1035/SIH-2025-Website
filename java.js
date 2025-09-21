const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');
const resultDiv = document.getElementById('result');

let rainfallData = {};
fetch('rainfall_data.json')
  .then(response => {
    console.log('Fetch response:', response);
    return response.json();
  })
  .then(data => {
    console.log('Loaded data:', data);
    rainfallData = data;
    // rest of your code...
  })
  .catch(error => {
    console.error('Fetch or parsing error:', error);
  });



fetch('./rainfall_data.json')
  .then(response => response.json())
  .then(data => {
    rainfallData = data;
    Object.keys(rainfallData).forEach(state => {
      const opt = document.createElement('option');
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });
  })
  .catch(error => {
    console.error('Error loading rainfall data:', error);
  });

stateSelect.addEventListener('change', () => {
  citySelect.innerHTML = '<option value="" disabled selected>Choose Option</option>';
  const cities = rainfallData[stateSelect.value];
  if (cities) {
    Object.keys(cities).forEach(city => {
      if(city.trim() !== '') {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      }
    });
  }
});

document.getElementById('rainForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const area = parseFloat(document.getElementById('roofArea').value);
  const state = stateSelect.value;
  const city = citySelect.value;
  const rainfall = rainfallData[state][city] || 0;

  const waterSaved = area * rainfall * 0.0929;
  resultDiv.textContent = `Annually, you can save approx. ${Math.round(waterSaved)} liters of water.`;
});
