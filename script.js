let map;
let currentMarker;
let realData = null;
let chart = null;

// Initialize map
function initMap() {
    map = L.map('map').setView([48.8566, 2.3522], 10); // Paris default
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add default marker for Paris
    addMarker([48.8566, 2.3522], 'Paris');
}

// Add marker to map
function addMarker(coordinates, cityName) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    currentMarker = L.marker(coordinates)
        .addTo(map)
                        .bindPopup('<b>' + cityName + '</b><br>Click analysis buttons to view simulated data')
        .openPopup();
}

// Update map location for a city
function updateMapLocation(cityName) {
    if (!cityName) return;
    
    // Use OpenStreetMap Nominatim for geocoding
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(cityName))
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const coordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                const foundCityName = data[0].display_name.split(',')[0];
                
                map.setView(coordinates, 12);
                addMarker(coordinates, foundCityName);
                console.log('Map updated for:', foundCityName);
            } else {
                console.log('Could not find coordinates for:', cityName);
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
        });
}

        // Load simulated NO₂ data analysis
        function loadNO2Analysis() {
    const cityInput = document.getElementById('cityInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!cityInput || !startDate || !endDate) {
        showError('Please fill in all fields');
        return;
    }
    
    // Update map location for the city
    updateMapLocation(cityInput);
    
    const analysisContent = document.getElementById('analysisContent');
                analysisContent.innerHTML = '<div class="loading">Generating simulated NO₂ data...</div>';
    
    setTimeout(() => {
        try {
                                console.log('Starting simulated NO₂ analysis for:', cityInput);
                    
                    // Generate simulated NO₂ data based on city and time period
                    realData = generateRealisticNO2Data(cityInput, startDate, endDate);
                    console.log('Simulated NO₂ data generated successfully:', realData);
            
            displayRealDataAnalysis(realData);
        } catch (error) {
            console.error('Error loading NO₂ data:', error);
            showError('Error analyzing NO₂ data: ' + error.message);
        }
    }, 1500);
}

        // Load simulated CO₂ data analysis
        function loadCO2Analysis() {
    const cityInput = document.getElementById('cityInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!cityInput || !startDate || !endDate) {
        showError('Please fill in all fields');
        return;
    }
    
    // Update map location for the city
    updateMapLocation(cityInput);
    
    const analysisContent = document.getElementById('analysisContent');
                analysisContent.innerHTML = '<div class="loading">Generating simulated CO₂ data...</div>';
    
    setTimeout(() => {
        try {
                                console.log('Starting simulated CO₂ analysis for:', cityInput);
                    
                    // Generate simulated CO₂ data based on city and time period
                    realData = generateRealisticCO2Data(cityInput, startDate, endDate);
                    console.log('Simulated CO₂ data generated successfully:', realData);
            
            displayCO2Analysis(realData);
        } catch (error) {
            console.error('Error loading CO₂ data:', error);
            showError('Error analyzing CO₂ data: ' + error.message);
        }
    }, 1500);
}

        // Generate simulated CO₂ data based on city characteristics
        function generateRealisticCO2Data(city, startDate, endDate) {
    const daysDiff = Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    
                // Simulated city-specific CO₂ characteristics (in ppm - parts per million)
    const cityFactors = {
        // High CO₂ Cities
        'Delhi': { base: 450, traffic: 0.95, industrial: 0.9, pollution: 'Very High' },
        'Beijing': { base: 440, traffic: 0.9, industrial: 0.85, pollution: 'Very High' },
        'Mumbai': { base: 445, traffic: 0.95, industrial: 0.8, pollution: 'Very High' },
        'Jakarta': { base: 435, traffic: 0.9, industrial: 0.75, pollution: 'Very High' },
        
        // High CO₂ Cities
        'Cairo': { base: 430, traffic: 0.85, industrial: 0.8, pollution: 'High' },
        'Mexico City': { base: 425, traffic: 0.9, industrial: 0.7, pollution: 'High' },
        'Bangkok': { base: 420, traffic: 0.85, industrial: 0.65, pollution: 'High' },
        'Istanbul': { base: 415, traffic: 0.8, industrial: 0.7, pollution: 'High' },
        
        // Moderate CO₂ Cities
        'Paris': { base: 410, traffic: 0.8, industrial: 0.6, pollution: 'Moderate' },
        'London': { base: 405, traffic: 0.85, industrial: 0.5, pollution: 'Moderate' },
        'Tokyo': { base: 415, traffic: 0.9, industrial: 0.7, pollution: 'Moderate' },
        'New York': { base: 408, traffic: 0.85, industrial: 0.6, pollution: 'Moderate' },
        'Moscow': { base: 400, traffic: 0.7, industrial: 0.5, pollution: 'Moderate' },
        'Rome': { base: 402, traffic: 0.8, industrial: 0.4, pollution: 'Moderate' },
        
        // Low CO₂ Cities
        'Berlin': { base: 395, traffic: 0.75, industrial: 0.4, pollution: 'Low' },
        'Madrid': { base: 398, traffic: 0.8, industrial: 0.3, pollution: 'Low' },
        'Vienna': { base: 390, traffic: 0.7, industrial: 0.3, pollution: 'Low' },
        'Stockholm': { base: 385, traffic: 0.65, industrial: 0.2, pollution: 'Low' },
        'Oslo': { base: 380, traffic: 0.6, industrial: 0.2, pollution: 'Low' },
        'Zurich': { base: 375, traffic: 0.65, industrial: 0.15, pollution: 'Low' }
    };
    
    const cityFactor = cityFactors[city] || { base: 400, traffic: 0.8, industrial: 0.6, pollution: 'Moderate' };
    
    // Generate time series data
    const timeSeries = [];
    const baseDate = new Date(startDate);
    
    for (let i = 0; i < daysDiff; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i);
        
        // Add seasonal and weekly patterns
        const dayOfWeek = currentDate.getDay();
        const month = currentDate.getMonth();
        
        let dailyFactor = 1;
        if (dayOfWeek === 0 || dayOfWeek === 6) dailyFactor = 0.95; // Weekend
        if (dayOfWeek >= 1 && dayOfWeek <= 5) dailyFactor = 1.05; // Weekday
        
        // Seasonal factor (higher in winter due to heating)
        const seasonalFactor = 1 + 0.1 * Math.sin((month - 1) * Math.PI / 6);
        
        // Random variation
        const randomFactor = 0.95 + Math.random() * 0.1;
        
        const co2Value = cityFactor.base * dailyFactor * seasonalFactor * randomFactor;
        
        timeSeries.push({
            date: currentDate.toISOString().split('T')[0],
            co2: co2Value,
            quality: 85 + Math.random() * 15
        });
    }
    
    // Calculate statistics
    const co2Values = timeSeries.map(d => d.co2);
    const mean = co2Values.reduce((a, b) => a + b, 0) / co2Values.length;
    const max = Math.max(...co2Values);
    const min = Math.min(...co2Values);
    const stdDev = Math.sqrt(co2Values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / co2Values.length);
    
    return {
        city: city,
        startDate: startDate,
        endDate: endDate,
        timeSeries: timeSeries,
        pollutionLevel: cityFactor.pollution,
        baseCO2: cityFactor.base,
        statistics: {
            mean: mean,
            max: max,
            min: min,
            stdDev: stdDev,
            observations: timeSeries.length,
            qualityScore: timeSeries.reduce((sum, d) => sum + d.quality, 0) / timeSeries.length
        },
                        metadata: {
                    satellite: 'Sentinel-5P (Simulated)',
                    instrument: 'TROPOMI (Simulated)',
                    product: 'NRTI/L3_CO2 (Simulated)',
                    resolution: '5.5 x 3.5 km (Simulated)',
                    coverage: 'Global daily (Simulated)',
                    dataSource: 'Educational Simulator'
                }
    };
}

        // Generate simulated NO₂ data based on city characteristics
        function generateRealisticNO2Data(city, startDate, endDate) {
    const daysDiff = Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    
                // Simulated city-specific NO₂ characteristics with realistic pollution levels
    const cityFactors = {
        // High Pollution Cities
        'Delhi': { base: 0.00045, traffic: 0.95, industrial: 0.9, pollution: 'Very High' },
        'Beijing': { base: 0.00038, traffic: 0.9, industrial: 0.85, pollution: 'Very High' },
        'Mumbai': { base: 0.00042, traffic: 0.95, industrial: 0.8, pollution: 'Very High' },
        'Jakarta': { base: 0.00040, traffic: 0.9, industrial: 0.75, pollution: 'Very High' },
        
        // High Pollution Cities
        'Cairo': { base: 0.00032, traffic: 0.85, industrial: 0.8, pollution: 'High' },
        'Mexico City': { base: 0.00030, traffic: 0.9, industrial: 0.7, pollution: 'High' },
        'Bangkok': { base: 0.00028, traffic: 0.85, industrial: 0.65, pollution: 'High' },
        'Istanbul': { base: 0.00026, traffic: 0.8, industrial: 0.7, pollution: 'High' },
        
        // Moderate Pollution Cities
        'Paris': { base: 0.00018, traffic: 0.8, industrial: 0.6, pollution: 'Moderate' },
        'London': { base: 0.00016, traffic: 0.85, industrial: 0.5, pollution: 'Moderate' },
        'Tokyo': { base: 0.00020, traffic: 0.9, industrial: 0.7, pollution: 'Moderate' },
        'New York': { base: 0.00017, traffic: 0.85, industrial: 0.6, pollution: 'Moderate' },
        'Moscow': { base: 0.00015, traffic: 0.7, industrial: 0.5, pollution: 'Moderate' },
        'Rome': { base: 0.00016, traffic: 0.8, industrial: 0.4, pollution: 'Moderate' },
        
        // Low Pollution Cities
        'Berlin': { base: 0.00012, traffic: 0.75, industrial: 0.4, pollution: 'Low' },
        'Madrid': { base: 0.00013, traffic: 0.8, industrial: 0.3, pollution: 'Low' },
        'Vienna': { base: 0.00010, traffic: 0.7, industrial: 0.3, pollution: 'Low' },
        'Stockholm': { base: 0.00009, traffic: 0.65, industrial: 0.2, pollution: 'Low' },
        'Oslo': { base: 0.00008, traffic: 0.6, industrial: 0.2, pollution: 'Low' },
        'Zurich': { base: 0.00007, traffic: 0.65, industrial: 0.15, pollution: 'Low' }
    };
    
    const cityFactor = cityFactors[city] || { base: 0.00015, traffic: 0.8, industrial: 0.6, pollution: 'Moderate' };
    
    // Generate time series data
    const timeSeries = [];
    const baseDate = new Date(startDate);
    
    for (let i = 0; i < daysDiff; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i);
        
        // Add seasonal and weekly patterns
        const dayOfWeek = currentDate.getDay();
        const month = currentDate.getMonth();
        
        let dailyFactor = 1;
        if (dayOfWeek === 0 || dayOfWeek === 6) dailyFactor = 0.7; // Weekend
        if (dayOfWeek >= 1 && dayOfWeek <= 5) dailyFactor = 1.2; // Weekday
        
        // Seasonal factor (higher in winter due to heating)
        const seasonalFactor = 1 + 0.3 * Math.sin((month - 1) * Math.PI / 6);
        
        // Random variation
        const randomFactor = 0.8 + Math.random() * 0.4;
        
        const no2Value = cityFactor.base * dailyFactor * seasonalFactor * randomFactor;
        
        timeSeries.push({
            date: currentDate.toISOString().split('T')[0],
            no2: no2Value,
            quality: 85 + Math.random() * 15
        });
    }
    
    // Calculate statistics
    const no2Values = timeSeries.map(d => d.no2);
    const mean = no2Values.reduce((a, b) => a + b, 0) / no2Values.length;
    const max = Math.max(...no2Values);
    const min = Math.min(...no2Values);
    const stdDev = Math.sqrt(no2Values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / no2Values.length);
    
    return {
        city: city,
        startDate: startDate,
        endDate: endDate,
        timeSeries: timeSeries,
        pollutionLevel: cityFactor.pollution,
        baseNO2: cityFactor.base,
        statistics: {
            mean: mean,
            max: max,
            min: min,
            stdDev: stdDev,
            observations: timeSeries.length,
            qualityScore: timeSeries.reduce((sum, d) => sum + d.quality, 0) / timeSeries.length
        },
                        metadata: {
                    satellite: 'Sentinel-5P (Simulated)',
                    instrument: 'TROPOMI (Simulated)',
                    product: 'NRTI/L3_NO2 (Simulated)',
                    resolution: '5.5 x 3.5 km (Simulated)',
                    coverage: 'Global daily (Simulated)',
                    dataSource: 'Educational Simulator'
                }
    };
}

// Display CO₂ analysis results
function displayCO2Analysis(data) {
    const analysisContent = document.getElementById('analysisContent');
    
    // Create chart
    createCO2Chart(data);
    
    // Display statistics
    const stats = data.statistics;
    const pollutionColor = data.pollutionLevel === 'Very High' ? '#d32f2f' : 
                          data.pollutionLevel === 'High' ? '#f57c00' : 
                          data.pollutionLevel === 'Moderate' ? '#fbc02d' : '#388e3c';
    
    analysisContent.innerHTML = `
        <div class="data-info">
            <h4>📊 Simulated CO₂ Analysis Results for ${data.city}</h4>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Mean CO₂:</strong> ${stats.mean.toFixed(1)} ppm
                </div>
                <div class="info-item">
                    <strong>Max CO₂:</strong> ${stats.max.toFixed(1)} ppm
                </div>
                <div class="info-item">
                    <strong>Min CO₂:</strong> ${stats.min.toFixed(1)} ppm
                </div>
                <div class="info-item">
                    <strong>Std Dev:</strong> ${stats.stdDev.toFixed(1)} ppm
                </div>
                <div class="info-item">
                    <strong>Observations:</strong> ${stats.observations} days
                </div>
                <div class="info-item">
                    <strong>Quality Score:</strong> ${stats.qualityScore.toFixed(1)}%
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: ${pollutionColor}; color: white; border-radius: 6px; text-align: center;">
                <strong>Pollution Level: ${data.pollutionLevel}</strong>
            </div>
        </div>
        
        <div style="margin-top: 0px; background: #f8f9fa; border-radius: 10px; padding: 5px;">
            <h4 style="margin: 0 0 3px 0;">💡 Interpretation</h4>
            <p style="margin: 0 0 3px 0;">${data.pollutionLevel} CO₂ levels detected in ${data.city}. This is typical for urban areas with normal traffic and industrial activity. Consider monitoring for potential air quality improvements.</p>
            <p style="margin: 0;"><strong>Pollution Level: ${data.pollutionLevel}</strong> | <strong>Base CO₂: ${data.baseCO2} ppm</strong></p>
        </div>
        <div class="chart-container" style="margin-top: 0px;">
            <canvas id="co2Chart"></canvas>
        </div>
        <div id="mlContent"></div>
        <div style="margin-top: 0px; padding: 5px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; color: #856404;">
            <strong>📚 Educational Note:</strong> This analysis uses simulated data based on realistic city characteristics. For official air quality data, please consult local environmental agencies.
        </div>
    `;
    
    // Run statistical analysis
    runCO2Analysis(data);
}

// Display simulated data analysis results
function displayRealDataAnalysis(data) {
    const analysisContent = document.getElementById('analysisContent');
    
    // Create chart
    createTimeSeriesChart(data);
    
    // Display statistics
    const stats = data.statistics;
    const pollutionColor = data.pollutionLevel === 'Very High' ? '#d32f2f' : 
                          data.pollutionLevel === 'High' ? '#f57c00' : 
                          data.pollutionLevel === 'Moderate' ? '#fbc02d' : '#388e3c';
    
    analysisContent.innerHTML = `
        <div class="data-info">
            <h4>📊 Simulated NO₂ Analysis Results for ${data.city}</h4>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Mean NO₂:</strong> ${(stats.mean * 1000000).toFixed(2)} mol/m²
                </div>
                <div class="info-item">
                    <strong>Max NO₂:</strong> ${(stats.max * 1000000).toFixed(2)} mol/m²
                </div>
                <div class="info-item">
                    <strong>Min NO₂:</strong> ${(stats.min * 1000000).toFixed(2)} mol/m²
                </div>
                <div class="info-item">
                    <strong>Std Dev:</strong> ${(stats.stdDev * 1000000).toFixed(2)} mol/m²
                </div>
                <div class="info-item">
                    <strong>Observations:</strong> ${stats.observations} days
                </div>
                <div class="info-item">
                    <strong>Quality Score:</strong> ${stats.qualityScore.toFixed(1)}%
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: ${pollutionColor}; color: white; border-radius: 6px; text-align: center;">
                <strong>Pollution Level: ${data.pollutionLevel}</strong>
            </div>
        </div>
        
        <div style="margin-top: 0px; background: #f8f9fa; border-radius: 10px; padding: 5px;">
            <h4 style="margin: 0 0 3px 0;">💡 Interpretation</h4>
            <p style="margin: 0 0 3px 0;">${data.pollutionLevel} NO₂ levels detected in ${data.city}. This is typical for urban areas with normal traffic and industrial activity. Consider monitoring for potential air quality improvements.</p>
            <p style="margin: 0;"><strong>Pollution Level: ${data.pollutionLevel}</strong> | <strong>Base NO₂: ${(data.baseNO2 * 1000000).toFixed(2)} mol/m²</strong></p>
        </div>
        <div class="chart-container" style="margin-top: 0px;">
            <canvas id="timeSeriesChart"></canvas>
        </div>
        <div id="mlContent"></div>
        <div style="margin-top: 0px; padding: 5px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; color: #856404;">
            <strong>📚 Educational Note:</strong> This analysis uses simulated data based on realistic city characteristics. For official air quality data, please consult local environmental agencies.
        </div>
    `;
    
    // Run statistical analysis
    runMLAnalysis(data);
}

// Create CO₂ chart
function createCO2Chart(data) {
    const ctx = document.getElementById('co2Chart');
    if (chart) {
        chart.destroy();
    }
    
    const labels = data.timeSeries.map(d => d.date);
    const values = data.timeSeries.map(d => d.co2);
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'CO₂ (ppm)',
                data: values,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'CO₂ Time Series - ' + data.city
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'CO₂ (ppm)'
                    }
                }
            }
        }
    });
}

// Create time series chart
function createTimeSeriesChart(data) {
    const ctx = document.getElementById('timeSeriesChart');
    if (chart) {
        chart.destroy();
    }
    
    const labels = data.timeSeries.map(d => d.date);
    const values = data.timeSeries.map(d => d.no2 * 1000000); // Convert to mol/m² for display
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'NO₂ (mol/m²)',
                data: values,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'NO₂ Time Series - ' + data.city
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'NO₂ (mol/m²)'
                    }
                }
            }
        }
    });
}

// Show GEE code
function showGEECode() {
    const cityInput = document.getElementById('cityInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!cityInput || !startDate || !endDate) {
        showError('Please fill in all fields first');
        return;
    }
    
    const geeCode = `
// Google Earth Engine Code for ${cityInput}
// Date Range: ${startDate} to ${endDate}

// Define the region of interest
var region = ee.Geometry.Point([0, 0]); // Replace with actual coordinates for ${cityInput}

// Load Sentinel-5P NO2 data
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .filterDate('${startDate}', '${endDate}')
  .filterBounds(region);

// Calculate mean NO2
var meanNO2 = collection.select('NO2_column_number_density').mean();

// Display the result
Map.centerObject(region, 10);
Map.addLayer(meanNO2, {min: 0, max: 0.0002, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']}, 'NO2 Mean');

// Print statistics
print('NO2 Statistics for ${cityInput}:', meanNO2.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: region,
  scale: 1000
}));
`;
    
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head><title>Google Earth Engine Code</title></head>
        <body style="font-family: monospace; padding: 20px; background: #f5f5f5;">
            <h2>Google Earth Engine Code for ${cityInput}</h2>
            <p>Copy this code to <a href="https://code.earthengine.google.com/" target="_blank">Google Earth Engine Code Editor</a>:</p>
            <pre style="background: #2d3748; color: #e2e8f0; padding: 20px; border-radius: 8px; overflow-x: auto;">${geeCode}</pre>
        </body>
        </html>
    `);
}

// Open GEE Editor
function openGEEEditor() {
    window.open('https://code.earthengine.google.com/', '_blank');
}

// Show error message
function showError(message) {
    const analysisContent = document.getElementById('analysisContent');
    analysisContent.innerHTML = '<div class="error">❌ ' + message + '</div>';
}

// Show success message
function showSuccess(message) {
    const analysisContent = document.getElementById('analysisContent');
    analysisContent.innerHTML = '<div class="success">✅ ' + message + '</div>';
}

// CO₂ statistical analysis: trend, anomaly, prediction
function runCO2Analysis(data) {
    console.log('=== CO₂ STATISTICAL ANALYSIS START ===');
    console.log('Running CO₂ statistical analysis for:', data.city);
    
    const mlContent = document.getElementById('mlContent');
    console.log('ML content element found:', !!mlContent);
    
    if (!mlContent) {
        console.error('ML content div not found');
        return;
    }
    
    // First, let's just show that we're working
    mlContent.innerHTML = '<div style="color: green;">Processing CO₂ statistical analysis...</div>';
    
    // Simple test - just show basic info
    setTimeout(() => {
        try {
            console.log('CO₂ data received:', data);
            console.log('CO₂ time series length:', data.timeSeries.length);
            
            if (!data.timeSeries || data.timeSeries.length === 0) {
                mlContent.innerHTML = '<div style="color: red;">No CO₂ time series data available</div>';
                return;
            }
            
            // Get the values
            const values = data.timeSeries.map(d => d.co2);
            console.log('CO₂ values extracted:', values.length);
            
            // Simple calculations
            const firstValue = values[0];
            const lastValue = values[values.length - 1];
            const trend = lastValue > firstValue ? 'Increasing' : lastValue < firstValue ? 'Decreasing' : 'Stable';
            
            // Calculate mean and std for anomaly
            const sum = values.reduce((a, b) => a + b, 0);
            const mean = sum / values.length;
            const variance = values.reduce((sq, v) => sq + Math.pow(v - mean, 2), 0) / values.length;
            const std = Math.sqrt(variance);
            const zScore = (lastValue - mean) / std;
            const anomaly = Math.abs(zScore) > 2 ? 'Yes' : 'No';
            
            // Simple prediction
            const prediction = lastValue + (lastValue - firstValue) / values.length;
            
            console.log('All CO₂ calculations completed');
            
            // Update ML content
            mlContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-bottom: 0px;">
                    <div style="background: #e3f2fd; padding: 4px; border-radius: 6px;">
                        <strong>📈 CO₂ Trend Analysis:</strong><br>
                        ${trend} (${((lastValue - firstValue)).toFixed(1)} ppm change)
                    </div>
                    <div style="background: #fff3e0; padding: 4px; border-radius: 6px;">
                        <strong>🚨 CO₂ Anomaly Detection:</strong><br>
                        ${anomaly} (z-score: ${zScore.toFixed(2)})
                    </div>
                </div>
                <div style="background: #e8f5e8; padding: 4px; border-radius: 6px; margin-top: 0px;">
                    <strong>🔮 CO₂ Prediction (Next Day):</strong><br>
                    ${prediction.toFixed(1)} ppm<br>
                    <small style="color: #666;">Linear extrapolation: assumes current trend continues</small>
                </div>
                <div style="margin-top: 0px; font-size: 12px; color: #666;">
                    <strong>Analysis Methods:</strong> Statistical Trend Analysis, Z-Score Anomaly Detection, Linear Extrapolation
                </div>
            `;
            
            console.log('=== CO₂ STATISTICAL ANALYSIS COMPLETED ===');
        } catch (error) {
            console.error('Error in CO₂ statistical analysis:', error);
            mlContent.innerHTML = '<div style="color: red;">Error in CO₂ statistical analysis: ' + error.message + '</div>';
        }
    }, 100); // Small delay to ensure DOM is ready
}

// Statistical analysis: trend, anomaly, prediction
function runMLAnalysis(data) {
    console.log('=== STATISTICAL ANALYSIS START ===');
    console.log('Running statistical analysis for:', data.city);
    
    const mlContent = document.getElementById('mlContent');
    console.log('ML content element found:', !!mlContent);
    
    if (!mlContent) {
        console.error('ML content div not found');
        return;
    }
    
    // First, let's just show that we're working
    mlContent.innerHTML = '<div style="color: green;">Processing statistical analysis...</div>';
    
    // Simple test - just show basic info
    setTimeout(() => {
        try {
            console.log('Data received:', data);
            console.log('Time series length:', data.timeSeries.length);
            
            if (!data.timeSeries || data.timeSeries.length === 0) {
                mlContent.innerHTML = '<div style="color: red;">No time series data available</div>';
                return;
            }
            
            // Get the values
            const values = data.timeSeries.map(d => d.no2);
            console.log('Values extracted:', values.length);
            
            // Simple calculations
            const firstValue = values[0];
            const lastValue = values[values.length - 1];
            const trend = lastValue > firstValue ? 'Increasing' : lastValue < firstValue ? 'Decreasing' : 'Stable';
            
            // Calculate mean and std for anomaly
            const sum = values.reduce((a, b) => a + b, 0);
            const mean = sum / values.length;
            const variance = values.reduce((sq, v) => sq + Math.pow(v - mean, 2), 0) / values.length;
            const std = Math.sqrt(variance);
            const zScore = (lastValue - mean) / std;
            const anomaly = Math.abs(zScore) > 2 ? 'Yes' : 'No';
            
            // Simple prediction using linear extrapolation
            // Formula: next_value = last_value + (last_value - first_value) / number_of_days
            // This assumes the trend continues linearly
            const prediction = lastValue + (lastValue - firstValue) / values.length;
            
            console.log('All calculations completed');
            
            // Update ML content
            mlContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-bottom: 0px;">
                    <div style="background: #e3f2fd; padding: 4px; border-radius: 6px;">
                        <strong>📈 Trend Analysis:</strong><br>
                        ${trend} (${((lastValue - firstValue) * 1000000).toFixed(2)} change)
                    </div>
                    <div style="background: #fff3e0; padding: 4px; border-radius: 6px;">
                        <strong>🚨 Anomaly Detection:</strong><br>
                        ${anomaly} (z-score: ${zScore.toFixed(2)})
                    </div>
                </div>
                <div style="background: #e8f5e8; padding: 4px; border-radius: 6px; margin-top: 0px;">
                    <strong>🔮 Prediction (Next Day):</strong><br>
                    ${prediction.toFixed(6)} mol/m²<br>
                    <small style="color: #666;">Linear extrapolation: assumes current trend continues</small>
                </div>
                <div style="margin-top: 0px; font-size: 12px; color: #666;">
                    <strong>Analysis Methods:</strong> Statistical Trend Analysis, Z-Score Anomaly Detection, Linear Extrapolation
                </div>
            `;
            
            console.log('=== STATISTICAL ANALYSIS COMPLETED ===');
        } catch (error) {
            console.error('Error in statistical analysis:', error);
            mlContent.innerHTML = '<div style="color: red;">Error in statistical analysis: ' + error.message + '</div>';
        }
    }, 100); // Small delay to ensure DOM is ready
}

// Initialize when page loads
window.onload = function() {
    initMap();
}; 