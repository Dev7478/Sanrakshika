import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Creating land geographical data
locations = [
    "Alpine Forest", "Coastal Beach", "Desert", "Grassland Prairie", 
    "Tropical Rainforest", "Temperate Forest", "Arctic Tundra", 
    "Savanna", "Mountain Range", "Wetlands"
]

# Generate 10 locations with geographical features
land_data = pd.DataFrame({
    'location_id': range(1, 11),
    'location_name': locations,
    'avg_temperature_c': np.random.uniform(-30, 40, 10).round(1),
    'annual_rainfall_mm': np.random.uniform(50, 4000, 10).round(),
    'elevation_m': np.random.uniform(0, 5000, 10).round(),
    'humidity_percent': np.random.uniform(10, 95, 10).round(1),
    'vegetation_density': np.random.uniform(0, 1, 10).round(2),
    'water_availability': np.random.uniform(0, 1, 10).round(2),
    'soil_quality': np.random.uniform(0, 1, 10).round(2),
    'predator_density': np.random.uniform(0, 1, 10).round(2)
})

# Adjust values to match typical geographic regions
land_data.loc[land_data['location_name'] == 'Alpine Forest', 'avg_temperature_c'] = np.random.uniform(0, 15, 1)[0].round(1)
land_data.loc[land_data['location_name'] == 'Desert', 'annual_rainfall_mm'] = np.random.uniform(50, 200, 1)[0].round()
land_data.loc[land_data['location_name'] == 'Tropical Rainforest', 'annual_rainfall_mm'] = np.random.uniform(2000, 4000, 1)[0].round()
land_data.loc[land_data['location_name'] == 'Arctic Tundra', 'avg_temperature_c'] = np.random.uniform(-30, -5, 1)[0].round(1)
land_data.loc[land_data['location_name'] == 'Wetlands', 'water_availability'] = np.random.uniform(0.8, 1, 1)[0].round(2)

print("Land Geographical Data:")
print(land_data)

# Save to CSV
land_data.to_csv('land_geographical_data.csv', index=False)