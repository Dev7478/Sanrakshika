import streamlit as st
import pandas as pd
import requests
import io

st.title("CSV to PostgreSQL Importer")

uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    # Display the CSV content
    df = pd.read_csv(uploaded_file)
    st.write("Preview of your data:")
    st.dataframe(df.head())
    
    if st.button("Import to PostgreSQL"):
        try:
            # Send to FastAPI backend
            files = {"file": (uploaded_file.name, uploaded_file.getvalue())}
            response = requests.post(
                "http://localhost:8501/upload-csv/",
                files=files
            )
            
            if response.status_code == 200:
                st.success(response.json()["message"])
            else:
                st.error(f"Error: {response.text}")
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")