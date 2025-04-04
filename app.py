import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from io import StringIO

# Function to generate land geographical data
def generate_land_data():
    np.random.seed(42)
    
    locations = [
        "Alpine Forest", "Coastal Beach", "Desert", "Grassland Prairie", 
        "Tropical Rainforest", "Temperate Forest", "Arctic Tundra", 
        "Savanna", "Mountain Range", "Wetlands"
    ]
    
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
    
    return land_data

# Function to generate animal survival conditions data
def generate_animal_data():
    np.random.seed(43)
    
    animals = [
        "Snow Leopard", "Camel", "Jaguar", "Kangaroo", 
        "Polar Bear", "Tiger", "Eagle", "Gorilla", 
        "Fennec Fox", "Penguin", "Koala", "Llama"
    ]
    
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
    
    return animal_data

# Function to calculate survival match
def calculate_survival_match(land_data, animal_data, threshold=70):
    """
    Calculate if an animal can survive in a location based on geographical compatibility.
    Returns a DataFrame with match percentages and survival predictions.
    """
    # Create an empty list for results
    results = []
    
    # Define the criteria to check with weights
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
            criteria_results = {}
            total_weight = 0
            weighted_match_sum = 0
            
            for name, land_col, min_col, max_col, weight in criteria:
                if min_col is None:  # For predator density, only check max
                    matches[name] = 1 if location[land_col] <= animal[max_col] else 0
                    criteria_results[name] = {
                        "location_value": location[land_col],
                        "animal_max": animal[max_col],
                        "match": matches[name]
                    }
                else:
                    matches[name] = 1 if (animal[min_col] <= location[land_col] <= animal[max_col]) else 0
                    criteria_results[name] = {
                        "location_value": location[land_col],
                        "animal_min": animal[min_col],
                        "animal_max": animal[max_col],
                        "match": matches[name]
                    }
                
                weighted_match_sum += matches[name] * weight
                total_weight += weight
            
            # Calculate overall match percentage
            match_percentage = (weighted_match_sum / total_weight) * 100
            
            # Determine if the animal can survive based on the threshold
            can_survive = "Yes" if match_percentage >= threshold else "No"
            
            # Add to results
            results.append({
                "animal_id": animal["animal_id"],
                "animal_name": animal["animal_name"],
                "location_id": location["location_id"],
                "location_name": location["location_name"],
                "match_percentage": round(match_percentage, 2),
                "can_survive": can_survive,
                "criteria_details": criteria_results
            })
    
    # Create a DataFrame from the results
    results_df = pd.DataFrame(results)
    
    # Sort by animal and then by match percentage (descending)
    results_df = results_df.sort_values(by=["animal_name", "match_percentage"], ascending=[True, False])
    
    return results_df

# Function to create a radar chart for animal-location match
def create_radar_chart(animal_name, location_name, criteria_details):
    categories = list(criteria_details.keys())
    match_values = [criteria_details[cat]["match"] for cat in categories]
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
        r=match_values,
        theta=categories,
        fill='toself',
        name='Match'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 1]
            )
        ),
        showlegend=False,
        title=f"{animal_name} in {location_name} - Criteria Match"
    )
    
    return fig

# Function to create a heatmap of all animals vs all locations
def create_heatmap(survival_results):
    # Pivot the results to create a matrix of animals vs locations
    heatmap_data = survival_results.pivot_table(
        index='animal_name', 
        columns='location_name', 
        values='match_percentage'
    )
    
    fig = px.imshow(
        heatmap_data,
        text_auto='.1f',
        color_continuous_scale='viridis',
        title='Animal Survival Match Percentages by Location',
        labels={'color': 'Match %'}
    )
    
    fig.update_layout(height=600)
    return fig

# Main Streamlit app
def main():
    st.set_page_config(layout="wide", page_title="Animal Survival Prediction")
    
    st.title("🦁 Animal Survival Prediction Tool")
    st.markdown("""
    This application predicts whether animals can survive in different geographic locations
    based on the match between environmental conditions and animal requirements.
    """)
    
    # Sidebar for controls
    st.sidebar.header("Controls")
    
    # Option to use default data or upload custom data
    data_option = st.sidebar.radio(
        "Choose data source:",
        ["Use default data", "Upload your own data"]
    )
    
    # Survival threshold selector
    threshold = st.sidebar.slider(
        "Survival match threshold (%)", 
        min_value=50, 
        max_value=90, 
        value=70, 
        step=5,
        help="Animals need at least this percentage match to survive in a location"
    )
    
    # Load data based on user selection
    if data_option == "Use default data":
        land_data = generate_land_data()
        animal_data = generate_animal_data()
        st.sidebar.success("Using default data")
    else:
        st.sidebar.info("Upload your CSV files:")
        land_file = st.sidebar.file_uploader("Upload land geographical data", type="csv")
        animal_file = st.sidebar.file_uploader("Upload animal requirements data", type="csv")
        
        if land_file is not None and animal_file is not None:
            try:
                land_data = pd.read_csv(land_file)
                animal_data = pd.read_csv(animal_file)
                st.sidebar.success("Files uploaded successfully!")
            except Exception as e:
                st.sidebar.error(f"Error: {e}")
                st.stop()
        else:
            # Use default data if files not uploaded
            land_data = generate_land_data()
            animal_data = generate_animal_data()
            st.sidebar.info("Using default data until both files are uploaded")
    
    # Calculate results
    survival_results = calculate_survival_match(land_data, animal_data, threshold)
    
    # Download buttons in sidebar
    st.sidebar.markdown("---")
    st.sidebar.header("Download Data")
    
    # Function to convert dataframe to CSV download link
    def get_download_link(df, filename):
        csv = df.to_csv(index=False)
        return csv
    
    land_csv = get_download_link(land_data, "land_data.csv")
    animal_csv = get_download_link(animal_data, "animal_data.csv")
    results_csv = get_download_link(survival_results[['animal_name', 'location_name', 'match_percentage', 'can_survive']], 
                                  "survival_results.csv")
    
    st.sidebar.download_button(
        label="Download Land Data",
        data=land_csv,
        file_name="land_geographical_data.csv",
        mime="text/csv"
    )
    
    st.sidebar.download_button(
        label="Download Animal Data",
        data=animal_csv,
        file_name="animal_survival_conditions.csv",
        mime="text/csv"
    )
    
    st.sidebar.download_button(
        label="Download Results",
        data=results_csv,
        file_name="animal_survival_predictions.csv",
        mime="text/csv"
    )
    
    # Main content area with tabs
    tab1, tab2, tab3, tab4 = st.tabs(["Overview", "Detailed Analysis", "Data Explorer", "About"])
    
    with tab1:
        # Summary metrics
        col1, col2, col3 = st.columns(3)
        total_matches = survival_results[survival_results['can_survive'] == 'Yes'].shape[0]
        
        col1.metric("Total Animal-Location Combinations", 
                   f"{survival_results.shape[0]}")
        
        col2.metric("Successful Matches", 
                   f"{total_matches} ({total_matches/survival_results.shape[0]*100:.1f}%)")
        
        col3.metric("Current Threshold", 
                   f"{threshold}%")
        
        # Create heatmap
        st.subheader("Survival Match Heatmap")
        st.plotly_chart(create_heatmap(survival_results), use_container_width=True)
        
        # Best habitats for each animal
        st.subheader("Best Habitat for Each Animal")
        
        best_matches = []
        for animal in survival_results['animal_name'].unique():
            animal_results = survival_results[survival_results['animal_name'] == animal]
            best_match = animal_results.iloc[0]
            best_matches.append({
                "Animal": animal,
                "Best Location": best_match['location_name'],
                "Match %": best_match['match_percentage'],
                "Can Survive": best_match['can_survive']
            })
        
        best_df = pd.DataFrame(best_matches)
        best_df['Match %'] = best_df['Match %'].round(1)
        
        # Color the dataframe
        def highlight_survival(val):
            if val == 'Yes':
                return 'background-color: #a8f0a8'
            else:
                return 'background-color: #f0a8a8'
        
        styled_df = best_df.style.applymap(highlight_survival, subset=['Can Survive'])
        st.dataframe(styled_df, use_container_width=True)
    
    with tab2:
        st.subheader("Animal-Location Analysis")
        
        # Animal and location selectors
        col1, col2 = st.columns(2)
        with col1:
            selected_animal = st.selectbox("Select Animal", options=sorted(animal_data['animal_name'].unique()))
        with col2:
            selected_location = st.selectbox("Select Location", options=sorted(land_data['location_name'].unique()))
        
        # Get match details
        match_row = survival_results[
            (survival_results['animal_name'] == selected_animal) & 
            (survival_results['location_name'] == selected_location)
        ].iloc[0]
        
        # Display match percentage and survival status
        col1, col2 = st.columns(2)
        
        match_color = "green" if match_row['can_survive'] == "Yes" else "red"
        col1.markdown(f"### Match Percentage: <span style='color:{match_color}'>{match_row['match_percentage']}%</span>", unsafe_allow_html=True)
        col2.markdown(f"### Survival: <span style='color:{match_color}'>{match_row['can_survive']}</span>", unsafe_allow_html=True)
        
        # Display radar chart
        st.plotly_chart(create_radar_chart(selected_animal, selected_location, match_row['criteria_details']), use_container_width=True)
        
        # Display detailed criteria matching
        st.subheader("Detailed Criteria Analysis")
        
        criteria_data = []
        for criterion, details in match_row['criteria_details'].items():
            if "animal_min" in details:
                criteria_data.append({
                    "Criterion": criterion,
                    "Location Value": details["location_value"],
                    "Animal Min": details["animal_min"],
                    "Animal Max": details["animal_max"],
                    "Match": "✓" if details["match"] == 1 else "✗"
                })
            else:
                criteria_data.append({
                    "Criterion": criterion,
                    "Location Value": details["location_value"],
                    "Animal Max": details["animal_max"],
                    "Match": "✓" if details["match"] == 1 else "✗"
                })
        
        criteria_df = pd.DataFrame(criteria_data)
        
        # Apply colors to the match column
        def highlight_match(val):
            if val == "✓":
                return 'background-color: #a8f0a8'
            else:
                return 'background-color: #f0a8a8'
        
        st.dataframe(criteria_df.style.applymap(highlight_match, subset=['Match']), use_container_width=True)
        
        # Explain results
        st.markdown("### Interpretation")
        if match_row['can_survive'] == "Yes":
            st.success(f"The {selected_animal} can survive in {selected_location} with a match of {match_row['match_percentage']}%, which is above the threshold of {threshold}%.")
        else:
            st.error(f"The {selected_animal} cannot survive in {selected_location} with a match of {match_row['match_percentage']}%, which is below the threshold of {threshold}%.")
            
            # Find mismatched criteria
            mismatches = [item["Criterion"] for item in criteria_data if item["Match"] == "✗"]
            if mismatches:
                st.markdown("**Mismatched criteria:**")
                for mismatch in mismatches:
                    st.markdown(f"- {mismatch}")
    
    with tab3:
        st.subheader("Raw Data Explorer")
        
        data_type = st.radio("Select data to view:", ["Land Geographic Data", "Animal Requirements", "Survival Predictions"])
        
        if data_type == "Land Geographic Data":
            st.dataframe(land_data, use_container_width=True)
        elif data_type == "Animal Requirements":
            st.dataframe(animal_data, use_container_width=True)
        else:
            view_data = survival_results.drop(columns=['criteria_details'])
            st.dataframe(view_data, use_container_width=True)
    
    with tab4:
        st.subheader("About This Project")
        st.markdown("""
        ### Animal Survival Prediction Tool
        
        This tool predicts whether various animal species can survive in different geographical locations based on matching environmental conditions with animal requirements.
        
        #### How It Works
        1. **Land Data**: Geographic and environmental characteristics of different locations
        2. **Animal Data**: Survival requirements and tolerance ranges for various animals
        3. **Matching Algorithm**: Compares each animal's requirements with location conditions
        4. **Prediction**: An animal can survive if the location matches at least 70% (adjustable) of its requirements
        
        #### Features
        - Interactive visualizations with heatmaps and radar charts
        - Detailed analysis of each animal-location combination
        - Custom data upload capabilities
        - Adjustable survival threshold
        
        #### Data Criteria
        The matching algorithm considers the following environmental factors:
        - Temperature (15%)
        - Annual rainfall (15%)
        - Elevation (10%)
        - Humidity (10%)
        - Vegetation density (15%)
        - Water availability (15%)
        - Soil quality (10%)
        - Predator density (10%)
        """)

if __name__ == "__main__":
    main()