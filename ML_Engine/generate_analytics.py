"""
Generate analytics visualizations for the Car Accessories Recommendation System
"""
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pathlib import Path

# Set style matching the dark theme
plt.style.use('dark_background')
sns.set_palette("husl")

# Create output directory
output_dir = Path('../FRONTEND/public/images/analytics')
output_dir.mkdir(parents=True, exist_ok=True)

# Load data
print("📊 Loading data...")
df = pd.read_csv('../Dataset/processed/accessories_cleaned_final.csv')
print(f"✅ Loaded {len(df)} accessories")

# Color scheme matching the website (slate blue theme)
PRIMARY_COLOR = '#5b7c99'  # Slate blue
ACCENT_COLOR = '#7a9cc6'
BACKGROUND = '#1e293b'
GRID_COLOR = '#334155'

# Configure matplotlib
plt.rcParams['figure.facecolor'] = BACKGROUND
plt.rcParams['axes.facecolor'] = BACKGROUND
plt.rcParams['axes.edgecolor'] = GRID_COLOR
plt.rcParams['grid.color'] = GRID_COLOR
plt.rcParams['text.color'] = 'white'
plt.rcParams['axes.labelcolor'] = 'white'
plt.rcParams['xtick.color'] = 'white'
plt.rcParams['ytick.color'] = 'white'

# 1. Price Distribution
print("📈 Creating price distribution chart...")
fig, ax = plt.subplots(figsize=(12, 6))
prices = df['Accessory Price'].dropna()
ax.hist(prices, bins=50, color=PRIMARY_COLOR, edgecolor='white', alpha=0.8)
ax.set_xlabel('Price (₹)', fontsize=12, fontweight='bold')
ax.set_ylabel('Number of Accessories', fontsize=12, fontweight='bold')
ax.set_title('Accessory Price Distribution', fontsize=16, fontweight='bold', pad=20)
ax.grid(True, alpha=0.2)

# Add statistics
median_price = prices.median()
mean_price = prices.mean()
ax.axvline(median_price, color='yellow', linestyle='--', linewidth=2, label=f'Median: ₹{median_price:.0f}')
ax.axvline(mean_price, color='orange', linestyle='--', linewidth=2, label=f'Mean: ₹{mean_price:.0f}')
ax.legend(fontsize=10)

plt.tight_layout()
plt.savefig(output_dir / 'price_distribution.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved price_distribution.png")

# 2. Sentiment Analysis Breakdown
print("📈 Creating sentiment breakdown chart...")
sentiment_counts = df['Sentiment_Label'].value_counts()
fig, ax = plt.subplots(figsize=(10, 6))
colors = {'positive': '#22c55e', 'neutral': '#eab308', 'negative': '#ef4444'}
bars = ax.bar(sentiment_counts.index, sentiment_counts.values, 
              color=[colors.get(x.lower(), PRIMARY_COLOR) for x in sentiment_counts.index],
              edgecolor='white', linewidth=1.5)

ax.set_xlabel('Sentiment', fontsize=12, fontweight='bold')
ax.set_ylabel('Number of Accessories', fontsize=12, fontweight='bold')
ax.set_title('Customer Sentiment Distribution', fontsize=16, fontweight='bold', pad=20)
ax.grid(True, alpha=0.2, axis='y')

# Add value labels on bars
for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'{int(height)}',
            ha='center', va='bottom', fontsize=11, fontweight='bold')

plt.tight_layout()
plt.savefig(output_dir / 'sentiment_breakdown.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved sentiment_breakdown.png")

# 3. Category Distribution (Top 10)
print("📈 Creating category distribution chart...")
category_counts = df['Category'].value_counts().head(10)
fig, ax = plt.subplots(figsize=(12, 8))
bars = ax.barh(category_counts.index[::-1], category_counts.values[::-1], 
               color=PRIMARY_COLOR, edgecolor='white', linewidth=1.5)

ax.set_xlabel('Number of Products', fontsize=12, fontweight='bold')
ax.set_ylabel('Category', fontsize=12, fontweight='bold')
ax.set_title('Top 10 Accessory Categories', fontsize=16, fontweight='bold', pad=20)
ax.grid(True, alpha=0.2, axis='x')

# Add value labels
for i, bar in enumerate(bars):
    width = bar.get_width()
    ax.text(width, bar.get_y() + bar.get_height()/2.,
            f' {int(width)}',
            ha='left', va='center', fontsize=10, fontweight='bold')

plt.tight_layout()
plt.savefig(output_dir / 'category_distribution.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved category_distribution.png")

# 4. Top 10 Brands
print("📈 Creating brand distribution chart...")
brand_counts = df['Car Brand'].value_counts().head(10)
fig, ax = plt.subplots(figsize=(12, 8))
bars = ax.barh(brand_counts.index[::-1], brand_counts.values[::-1], 
               color=ACCENT_COLOR, edgecolor='white', linewidth=1.5)

ax.set_xlabel('Number of Accessories', fontsize=12, fontweight='bold')
ax.set_ylabel('Brand', fontsize=12, fontweight='bold')
ax.set_title('Top 10 Car Brands (by Accessory Count)', fontsize=16, fontweight='bold', pad=20)
ax.grid(True, alpha=0.2, axis='x')

# Add value labels
for i, bar in enumerate(bars):
    width = bar.get_width()
    ax.text(width, bar.get_y() + bar.get_height()/2.,
            f' {int(width)}',
            ha='left', va='center', fontsize=10, fontweight='bold')

plt.tight_layout()
plt.savefig(output_dir / 'brand_distribution.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved brand_distribution.png")

# 5. Quality Score Distribution
print("📈 Creating quality score distribution...")
quality_scores = df['Overall_Quality_Score'].dropna()
fig, ax = plt.subplots(figsize=(12, 6))
ax.hist(quality_scores, bins=30, color='#8b5cf6', edgecolor='white', alpha=0.8)
ax.set_xlabel('Quality Score', fontsize=12, fontweight='bold')
ax.set_ylabel('Number of Accessories', fontsize=12, fontweight='bold')
ax.set_title('Product Quality Score Distribution', fontsize=16, fontweight='bold', pad=20)
ax.grid(True, alpha=0.2)

# Add statistics
median_quality = quality_scores.median()
mean_quality = quality_scores.mean()
ax.axvline(median_quality, color='yellow', linestyle='--', linewidth=2, label=f'Median: {median_quality:.2f}')
ax.axvline(mean_quality, color='orange', linestyle='--', linewidth=2, label=f'Mean: {mean_quality:.2f}')
ax.legend(fontsize=10)

plt.tight_layout()
plt.savefig(output_dir / 'quality_distribution.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved quality_distribution.png")

# 6. Sentiment vs Price (Scatter)
print("📈 Creating sentiment vs price correlation...")
fig, ax = plt.subplots(figsize=(12, 6))
sentiment_map = {'positive': 1, 'neutral': 0, 'negative': -1}
df['sentiment_numeric'] = df['Sentiment_Label'].str.lower().map(sentiment_map)

for sentiment, color in [('positive', '#22c55e'), ('neutral', '#eab308'), ('negative', '#ef4444')]:
    mask = df['Sentiment_Label'].str.lower() == sentiment
    ax.scatter(df[mask]['Accessory Price'], df[mask]['sentiment_numeric'], 
              alpha=0.5, s=30, color=color, label=sentiment.capitalize(), edgecolors='white', linewidth=0.5)

ax.set_xlabel('Price (₹)', fontsize=12, fontweight='bold')
ax.set_ylabel('Sentiment', fontsize=12, fontweight='bold')
ax.set_yticks([-1, 0, 1])
ax.set_yticklabels(['Negative', 'Neutral', 'Positive'])
ax.set_title('Sentiment vs Price Analysis', fontsize=16, fontweight='bold', pad=20)
ax.legend(fontsize=10)
ax.grid(True, alpha=0.2)

plt.tight_layout()
plt.savefig(output_dir / 'sentiment_price_correlation.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved sentiment_price_correlation.png")

# 7. Summary Statistics Card
print("📈 Creating summary statistics...")
fig, ax = plt.subplots(figsize=(10, 6))
ax.axis('off')

stats = {
    'Total Accessories': f"{len(df):,}",
    'Average Price': f"₹{df['Accessory Price'].mean():.2f}",
    'Price Range': f"₹{df['Accessory Price'].min():.0f} - ₹{df['Accessory Price'].max():.0f}",
    'Positive Reviews': f"{(df['Sentiment_Label'].str.lower() == 'positive').sum()} ({(df['Sentiment_Label'].str.lower() == 'positive').sum()/len(df)*100:.1f}%)",
    'Average Quality': f"{df['Overall_Quality_Score'].mean():.2f}/1.0",
    'Total Brands': f"{df['Car Brand'].nunique()}",
    'Total Categories': f"{df['Category'].nunique()}",
    'Top Category': f"{df['Category'].mode()[0]}"
}

y_pos = 0.9
for key, value in stats.items():
    ax.text(0.1, y_pos, f'{key}:', fontsize=14, fontweight='bold', color='white')
    ax.text(0.6, y_pos, value, fontsize=14, color=ACCENT_COLOR, fontweight='bold')
    y_pos -= 0.1

ax.set_title('System Overview Statistics', fontsize=18, fontweight='bold', pad=20, color='white')

plt.tight_layout()
plt.savefig(output_dir / 'summary_stats.png', dpi=150, bbox_inches='tight', facecolor=BACKGROUND)
plt.close()
print("✅ Saved summary_stats.png")

print(f"\n🎉 All analytics charts generated successfully!")
print(f"📁 Output directory: {output_dir.absolute()}")
