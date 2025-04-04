import pandas as pd
import numpy as np

def calculate_survival_match(land_data, animal_data):
    """
    Calculate if an animal can survive in a location based on geographical compatibility.
    Returns a DataFrame with match percentages and survival predictions.
    
    Parameters:
    land_data (DataFrame): Land geographical data
    animal_data (DataFrame): Animal survival condition data
    
    Returns:
    DataFrame: Match results with survival predictions
    """
    # Load the data
    # land_data = pd.read_csv('land_geographical_data.csv')
    # animal_data = pd.read_csv('animal_survival_conditions.csv')
    
    # Create an empty DataFrame for results
    results = []
    
    # Define the criteria to check
    criteria = [
        # Criterion name, land column, animal min column, animal max column, weight
        ("Temperature", "avg_temperature_c", "min_temperature_c", "max_temperature_c", 0.15),
        ("Rainfall", "annual_rainfall_mm", "min_rainfall_mm", "max_rainfall_mm", 0.15),
        ("Elevation", "elevation_m", "min_elevation_m", "max_elevation_m", 0.10),
        ("Humidity", "humidity_percent", "min_humidity_percent", "max_humidity_percent", 0.10),
        ("Vegetation", "vegetation_density", "min_vegetation_density", "max_vegetation_density", 0.15),
        ("Water", "water_availability", "min_water_availability", "max_water_availability", 0.15),
        ("Soil", "soil_quality", "min_soil_quality", "max_soil_quality", 0.10),
        ("Predators", "predator_density", None, "max_predator_density", 0.10)
    ]
    
    # For each animal and each location, calculate the compatibility
    for _, animal in animal_data.iterrows():
        for _, location in land_data.iterrows():
            matches = {}
            total_weight = 0
            weighted_match_sum = 0
            
            for name, land_col, min_col, max_col, weight in criteria:
                if min_col is None:  # For predator density, only check max
                    matches[name] = 1 if location[land_col] <= animal[max_col] else 0
                else:
                    matches[name] = 1 if (animal[min_col] <= location[land_col] <= animal[max_col]) else 0
                
                weighted_match_sum += matches[name] * weight
                total_weight += weight
            
            # Calculate overall match percentage
            match_percentage = (weighted_match_sum / total_weight) * 100
            
            # Determine if the animal can survive based on the 70% threshold
            can_survive = "Yes" if match_percentage >= 70 else "No"
            
            # Add to results
            results.append({
                "animal_id": animal["animal_id"],
                "animal_name": animal["animal_name"],
                "location_id": location["location_id"],
                "location_name": location["location_name"],
                "match_percentage": round(match_percentage, 2),
                "can_survive": can_survive
            })
    
    # Create a DataFrame from the results
    results_df = pd.DataFrame(results)
    
    # Sort by animal and then by match percentage (descending)
    results_df = results_df.sort_values(by=["animal_name", "match_percentage"], ascending=[True, False])
    
    return results_df

# Example usage:
if __name__ == "__main__":
    # Load the datasets
    land_data = pd.read_csv('land_geographical_data.csv')
    animal_data = pd.read_csv('animal_survival_conditions.csv')
    
    # Calculate survival matches
    survival_results = calculate_survival_match(land_data, animal_data)
    
    # Print and save results
    print("\nSurvival Prediction Results:")
    
    # Show a summary of results
    print("\nBest habitat match for each animal:")
    for animal in survival_results['animal_name'].unique():
        animal_results = survival_results[survival_results['animal_name'] == animal]
        best_match = animal_results.iloc[0]
        print(f"{animal}: {best_match['location_name']} - {best_match['match_percentage']}% match ({best_match['can_survive']})")
    
    # Save to CSV
    survival_results.to_csv('animal_survival_predictions.csv', index=False)