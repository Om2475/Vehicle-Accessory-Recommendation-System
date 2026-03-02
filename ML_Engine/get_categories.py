import pandas as pd

def get_unique_categories(file_path):
    """
    Reads a CSV file, finds unique values in 'Category' and 'name' columns,
    and prints them.
    """
    try:
        df = pd.read_csv(file_path)

        # Ensure 'Category' and 'name' columns exist
        if 'Category' not in df.columns or 'name' not in df.columns:
            print("Error: 'Category' or 'name' column not found in the CSV.")
            return

        # Get unique categories
        unique_categories = df['Category'].unique()
        print("--- Unique Categories ---")
        for category in sorted(unique_categories):
            print(category)

        # Get unique names
        unique_names = df['name'].unique()
        print("\n--- Unique Accessory Names (Sample) ---")
        for name in sorted(unique_names)[:20]: # Print a sample of names
            print(name)

    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Path to the dataset
    csv_file_path = 'accessories_cleaned_final.csv'
    get_unique_categories(csv_file_path)
