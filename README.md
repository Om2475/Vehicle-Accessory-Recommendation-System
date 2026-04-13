# Vehicle Accessories Recommendation & E-Commerce System

A full-stack application that combines a vehicle accessory recommendation system with a complete e-commerce workflow. The system generates relevant accessory suggestions based on user input and allows users to move through the entire shopping process from discovery to checkout.

---

## Overview

This project focuses on building a practical recommendation system integrated with an e-commerce platform. Users can enter their vehicle details and preferences to receive suitable accessory recommendations. The system also provides a complete shopping experience including product viewing, cart management, checkout, and order confirmation.

The project demonstrates end-to-end development including data processing, feature engineering, recommendation logic, backend API development, and frontend integration.

---

## Key Features

### Recommendation System
- Personalized accessory recommendations based on vehicle brand, model, budget, and categories
- Compatibility-based filtering for accurate suggestions
- Content-based similarity using TF-IDF
- Ranking and scoring logic for relevant results
- Explanation of recommendations for better transparency
- Diversity mechanism to avoid repetitive suggestions

### E-Commerce Functionality
- Add to cart, remove items, and update quantities
- Wishlist for saving products
- Product detail pages with compatibility information
- Checkout system with delivery and payment options
- Order confirmation with summary
- Persistent cart and wishlist using localStorage

### System Features
- REST API built with FastAPI
- React frontend with TypeScript
- Structured data pipeline for preprocessing
- Modular and scalable architecture
- Responsive UI for desktop and mobile

---

## System Architecture

The system is divided into four main layers:

### 1. Frontend
- Built using React, TypeScript, and Tailwind CSS
- Handles user input, results display, cart, wishlist, and checkout pages

### 2. Backend API
- Developed using FastAPI
- Provides endpoints for recommendations and data handling
- Includes request validation and routing

### 3. Recommendation Engine
- Processes cleaned dataset
- Applies filtering, similarity calculations, and ranking
- Returns top recommendations

### 4. Data Layer
- Uses CSV files for dataset storage
- SQLite database for user, cart, wishlist, and order data

---

## Tech Stack

### Backend
- Python 3.9+
- FastAPI
- Pandas
- NumPy
- Scikit-learn
- Uvicorn

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router

### Data & Development
- Jupyter Notebook
- Matplotlib
- Seaborn
- Git

---

## Project Structure

```text
TY System/
├── README.md
├── DATABASE_RECOMMENDATION.md
├── scripts/
│   ├── analyze_data.py
│   ├── data_cleaning.py
│   ├── setup_phase1.ps1
│   └── start_jupyter.ps1
├── Dataset/
│   ├── Cars Dataset.csv
│   └── processed/
│       ├── accessories_cleaned_final.csv
│       ├── cars_cleaned.csv
│       ├── tfidf_vectorizer.pkl
│       └── label_encoders.pkl
├── ML_Engine/
│   ├── api.py
│   ├── recommendation_engine.py
│   ├── requirements.txt
│   ├── notebooks/
│   │   ├── 01_data_exploration.ipynb
│   │   ├── 02_data_cleaning.ipynb
│   │   └── 03_feature_engineering.ipynb
│   └── models/
└── FRONTEND/
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.cjs
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── Pages/
        ├── components/
        ├── context/
        ├── hooks/
        ├── lib/
        └── data/
```

---

## Dataset Information

### Overview
- Original dataset: 242 cars, 1,954 accessories  
- Cleaned dataset: 205 cars, 1,739 accessories  

### Data Composition
- 1,739 accessories  
- 205 vehicles  
- 64 car brands  
- 11 accessory categories  
- 43 features per accessory  
- TF-IDF based text features  

### Data Processing Steps

1. Data Exploration  
   - Understanding distributions and structure  

2. Data Cleaning  
   - Removed duplicates  
   - Handled missing values  
   - Standardized formats  

3. Feature Engineering  
   - Category encoding  
   - Price segmentation  
   - TF-IDF vectorization  
   - Text normalization  

### Data Quality
- No missing values after processing  
- No duplicate entries  
- Consistent naming conventions  
- Valid price ranges  

---

## Database Implementation

### Current Setup
- CSV-based dataset storage  
- SQLite database for application data  

### Recommended Upgrade
PostgreSQL can be used for:
- Faster queries  
- Better scalability  
- Improved filtering and indexing  

### Tables Used
- accessories  
- users  
- cart_items  
- wishlist  
- orders  
- order_items  
- sessions  

---

## Development Status

### Completed
- Data preprocessing and cleaning  
- Feature engineering  
- Recommendation logic  
- Backend API  
- Frontend UI  
- Cart and wishlist system  
- Checkout and order flow  
- Database integration  

### Current State
The system is fully functional and can be used as a complete demonstration of a recommendation-based e-commerce platform.

---

## User Flow

1. User opens the application  
2. Enters vehicle details and preferences  
3. Receives recommended accessories  
4. Views product details  
5. Adds items to cart or wishlist  
6. Proceeds to checkout  
7. Places order and receives confirmation  
8. Returns to browsing  

---

## Setup Instructions

### Backend

```bash
cd ML_Engine
python api.py
```

### Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

### Access

- Frontend: http://localhost:5173  
- API Docs: http://localhost:8000/docs  
- Health Check: http://localhost:8000/health  

---

## API Endpoints

- GET / → API info  
- GET /health → system status  
- POST /recommend → get recommendations  
- GET /brands → list brands  
- GET /categories → list categories  
- GET /stats → system stats  
- POST /filter → filter data  
- GET /accessory/{id} → accessory details  

### Example Request

```json
{
  "car_brand": "Toyota",
  "car_model": "Camry",
  "budget_min": 500,
  "budget_max": 3000,
  "preferred_categories": ["Interior"],
  "search_query": "floor mats"
}
```

---

## Testing

### Backend

```bash
cd ML_Engine
python test_compatibility_fix.py
python verify_api.py
python verify_setup.py
```

### Manual Testing
- Verify recommendations for different vehicles  
- Test cart and wishlist functionality  
- Check checkout and order flow  

---

## Configuration

### Backend Environment

```
APP_ENV=development
DEBUG=True
JWT_SECRET=your-secret-key
```

### Frontend Environment

```
VITE_API_BASE_URL=http://localhost:8000
```

---

## Future Improvements

- Migration to PostgreSQL  
- Enhanced authentication system  
- Payment gateway integration  
- Order tracking  
- User profiles and history  
- Advanced filtering and search  
- Admin dashboard  
- Mobile application  

---

## Contributing

1. Fork the repository  
2. Create a new branch  
3. Make changes  
4. Test the application  
5. Submit a pull request  

---

## License

This project is intended for educational and personal use.

---

## Acknowledgment

This project makes use of open-source tools and libraries including FastAPI, React, Tailwind CSS, and Scikit-learn.

---

Built using Python, FastAPI, React, TypeScript, and SQLite
