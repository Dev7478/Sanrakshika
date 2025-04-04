import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(43)

# Creating animal survival geographical conditions
animals = [
    "Snow Leopard", "Camel", "Jaguar", "Kangaroo", 
    "Polar Bear", "Tiger", "Eagle", "Gorilla", 
    "Fennec Fox", "Penguin", "Koala", "Llama"
]

# Generate survival conditions for 12 animals
animal_data = pd.DataFrame({
    'animal_id': range(1, 13),
    'animal_name': animals,
    'min_temperature_c': np.random.uniform(-50, 10, 12).round(1),
    'max_temperature_c': np.random.uniform(10, 50, 12).round(1),
    'min_rainfall_mm': np.random.uniform(0, 1000, 12).round(),
    'max_rainfall_mm': np.random.uniform(1000, 5000, 12).round(),
    'min_elevation_m': np.random.uniform(0, 1000, 12).round(),
    'max_elevation_m': np.random.uniform(1000, 6000, 12).round(),
    'min_humidity_percent': np.random.uniform(5, 40, 12).round(1),
    'max_humidity_percent': np.random.uniform(40, 100, 12).round(1),
    'min_vegetation_density': np.random.uniform(0, 0.3, 12).round(2),
    'max_vegetation_density': np.random.uniform(0.3, 1, 12).round(2),
    'min_water_availability': np.random.uniform(0, 0.3, 12).round(2),
    'max_water_availability': np.random.uniform(0.3, 1, 12).round(2),
    'min_soil_quality': np.random.uniform(0, 0.3, 12).round(2),
    'max_soil_quality': np.random.uniform(0.3, 1, 12).round(2),
    'max_predator_density': np.random.uniform(0, 1, 12).round(2)
})

# Ensure max values are greater than min values
for col in animal_data.columns:
    if col.startswith('min_') and f'max_{col[4:]}' in animal_data.columns:
        for idx in animal_data.index:
            if animal_data.loc[idx, col] > animal_data.loc[idx, f'max_{col[4:]}']:
                animal_data.loc[idx, [col, f'max_{col[4:]}']] = animal_data.loc[idx, [f'max_{col[4:]}', col]].values

# Adjust values to match typical animal requirements
animal_data.loc[animal_data['animal_name'] == 'Snow Leopard', 'max_temperature_c'] = np.random.uniform(15, 25, 1)[0].round(1)
animal_data.loc[animal_data['animal_name'] == 'Camel', 'min_temperature_c'] = np.random.uniform(5, 15, 1)[0].round(1)
animal_data.loc[animal_data['animal_name'] == 'Polar Bear', 'max_temperature_c'] = np.random.uniform(0, 10, 1)[0].round(1)
animal_data.loc[animal_data['animal_name'] == 'Penguin', 'max_temperature_c'] = np.random.uniform(0, 10, 1)[0].round(1)

print("\nAnimal Survival Geographical Conditions:")
print(animal_data)

# Save to CSV
animal_data.to_csv('animal_survival_conditions.csv', index=False)