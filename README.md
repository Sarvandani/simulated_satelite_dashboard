# Sentinel-5P NO₂ & CO₂ Satellite Data Simulator

A clean, single HTML application for simulating and analyzing Sentinel-5P NO₂ and CO₂ satellite data with interactive maps and statistical analysis for educational purposes.

## 🌟 Features

### Simulated Data Generation
- **Simulated Sentinel-5P NO₂ measurements** based on real city characteristics
- **CO₂ analysis capabilities** for comprehensive air quality assessment
- **Realistic city-specific data patterns** based on traffic, industrial activity, and seasonal factors
- **Time series analysis** with interactive charts
- **Statistical analysis** including mean, max, min, and standard deviation

### Interactive Interface
- **Interactive map** using OpenStreetMap
- **City search** with geocoding
- **Date range selection** for custom analysis periods
- **Real-time data loading** with loading indicators
- **Dual analysis buttons** for NO₂ and CO₂ data

### Data Visualization
- **Time series charts** showing NO₂ and CO₂ trends over time
- **Statistical summaries** with pollution level indicators
- **Data quality metrics** for reliability assessment
- **City-specific interpretations** based on actual urban characteristics

## 🚀 Quick Start

1. **Open the application**: Open `index.html` in any modern web browser
2. **Search for a city**: Enter a city name (e.g., Paris, London, Tokyo, Beijing)
3. **Select date range**: Choose start and end dates for analysis
4. **Choose analysis type**: Click "📊 NO₂ Analysis" or "🌱 CO₂ Analysis"
5. **Analyze results**: View statistics, charts, and interpretations

## 📁 Project Structure

```
remote_sensing/
├── index.html          # Main application file (HTML, CSS, JS embedded)
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

## 📊 Data Sources

### Simulated Satellite Data
- **Satellite**: Sentinel-5P (Copernicus) - Simulated
- **Instrument**: TROPOMI - Simulated
- **Product**: NRTI/L3_NO2 (NO₂) and NRTI/L3_CO2 (CO₂) - Simulated
- **Resolution**: 5.5 x 3.5 km - Simulated
- **Coverage**: Global daily - Simulated
- **Data Type**: Realistic simulations based on city characteristics

### Map Data
- **Base Map**: OpenStreetMap
- **Geocoding**: Nominatim API
- **Coverage**: Global

## 🏙️ Supported Cities

The application includes realistic NO₂ and CO₂ characteristics for major cities:

| City | Base NO₂ Level | Base CO₂ Level | Traffic Factor | Industrial Factor |
|------|----------------|----------------|----------------|-------------------|
| Paris | 0.00018 | 410 | 0.8 | 0.6 |
| London | 0.00016 | 405 | 0.85 | 0.5 |
| Tokyo | 0.00020 | 415 | 0.9 | 0.7 |
| New York | 0.00017 | 408 | 0.85 | 0.6 |
| Beijing | 0.00038 | 440 | 0.9 | 0.85 |
| Delhi | 0.00045 | 450 | 0.95 | 0.9 |
| Moscow | 0.00015 | 400 | 0.7 | 0.5 |
| Berlin | 0.00012 | 395 | 0.75 | 0.4 |
| Madrid | 0.00013 | 398 | 0.8 | 0.3 |
| Rome | 0.00016 | 402 | 0.8 | 0.4 |

## 📈 Analysis Features

### Statistical Analysis
- **Mean NO₂/CO₂ levels** with pollution level classification
- **Maximum and minimum** values
- **Standard deviation** for variability assessment
- **Data quality scores** for reliability

### Time Series Analysis
- **Daily measurements** over selected period
- **Weekly patterns** (weekday vs weekend variations)
- **Seasonal trends** (winter heating effects)
- **Interactive charts** with zoom and hover

### Interpretation
- **City-specific analysis** based on urban characteristics
- **Pollution level assessment** (Low/Moderate/High/Very High)
- **Environmental recommendations** based on findings
- **Health risk evaluation**

## 🛠️ Technical Details

### Dependencies
- **Leaflet.js** - Interactive mapping
- **Chart.js** - Data visualization
- **OpenStreetMap** - Base map tiles

### File Structure
- **HTML**: `index.html` - Main application
- **CSS**: `styles.css` - Styling
- **JavaScript**: `script.js` - Functionality
- **All functionality** contained in separate files for easy maintenance

### Browser Compatibility
- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

### Data Processing
- **Realistic NO₂/CO₂ modeling** based on city characteristics
- **Seasonal and weekly patterns** simulation
- **Quality assessment** for data reliability
- **Statistical calculations** for comprehensive analysis

## 🌍 Educational Impact

This application helps users understand:
- **Air quality patterns** in urban areas
- **Seasonal variations** in NO₂ and CO₂ levels
- **City-specific pollution** characteristics
- **Environmental monitoring** concepts

## 📝 Usage Examples

### NO₂ Analysis
1. Search for "Paris"
2. Select date range: 2024-01-01 to 2024-01-31
3. Click "📊 NO₂ Analysis"
4. View statistics and time series chart

### CO₂ Analysis
1. Search for "Beijing"
2. Select date range for analysis
3. Click "🌱 CO₂ Analysis"
4. Compare with NO₂ patterns

### Advanced Analysis
1. Search for "Tokyo"
2. Select longer date range for trend analysis
3. Analyze both NO₂ and CO₂ patterns
4. Compare pollution levels across cities

## 🔒 Privacy & Data

- **No data storage** - all processing happens in browser
- **Open source** - transparent data handling
- **No registration required** - immediate access
- **Real-time processing** - no data retention

## 🆘 Troubleshooting

### Common Issues
- **Slow loading**: Check internet connection
- **Map not loading**: Refresh page or check browser compatibility
- **Data not loading**: Verify date range and city name
- **Analysis errors**: Ensure all fields are filled

### Browser Requirements
- **JavaScript enabled**
- **Modern browser** (2018+)
- **Internet connection** for map tiles and geocoding

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify all dependencies are loading
3. Ensure stable internet connection
4. Try different city names or date ranges

---

**Note**: This application provides realistic NO₂ and CO₂ data simulations based on city characteristics and seasonal patterns. The data is simulated for educational purposes and should not be used for official environmental analysis. For official air quality data, please consult local environmental agencies. For real satellite data analysis, visit Google Earth Engine at code.earthengine.google.com.

---

## **Option 1: Python HTTP Server (Recommended, No Install Needed)**

If you have Python installed, you can quickly serve the current directory:

### For Python 3.x:
```sh
python3 -m http.server 8000
```

Then open your browser and go to:  
[http://localhost:8000/index.html](http://localhost:8000/index.html)

---

## **Option 2: Node.js (if you prefer)**
If you have Node.js, you can use:
```sh
npx serve .
```
or
```sh
npx http-server .
```

---

Would you like me to start a Python HTTP server for you right now? If yes, I'll run the command in your project directory. 