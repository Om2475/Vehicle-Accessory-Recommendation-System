import pandas as pd

df = pd.read_csv('Dataset/processed/accessories_cleaned_final.csv')
print('Sample accessories by category:\n')
for cat in sorted(df['Category'].unique()):
    print(f'{cat}:')
    samples = df[df['Category']==cat]['Accessory Name'].head(3).tolist()
    for s in samples:
        print(f'  - {s[:100]}')
    print()
