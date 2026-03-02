import sqlite3

conn = sqlite3.connect('ML_Engine/vehicle_accessories.db')
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Check sample accessory IDs
print("Sample accessory IDs:")
cur.execute('SELECT accessory_id, accessory_name FROM accessories LIMIT 5')
for row in cur.fetchall():
    print(f"  {row['accessory_id']} - {row['accessory_name']}")

# Check cart_items table
print("\nCart items (all users):")
cur.execute('SELECT * FROM cart_items')
cart_rows = cur.fetchall()
print(f"  Total rows: {len(cart_rows)}")
for row in cart_rows:
    print(f"  cart_id={row['cart_id']}, user_id={row['user_id']}, accessory_id={row['accessory_id']}, qty={row['quantity']}")

# Check wishlist table
print("\nWishlist items (all users):")
cur.execute('SELECT * FROM wishlist')
wishlist_rows = cur.fetchall()
print(f"  Total rows: {len(wishlist_rows)}")
for row in wishlist_rows:
    print(f"  wishlist_id={row['wishlist_id']}, user_id={row['user_id']}, accessory_id={row['accessory_id']}")

conn.close()
