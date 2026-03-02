import sqlite3

conn = sqlite3.connect('ML_Engine/vehicle_accessories.db')
cur = conn.cursor()

# Check accessories table schema
print("Accessories table schema:")
cur.execute('PRAGMA table_info(accessories)')
for row in cur.fetchall():
    if 'accessory_id' in row[1].lower():
        print(f"  {row[1]}: {row[2]} (pk={row[5]})")

# Check order_items table schema
print("\nOrder_items table schema:")
cur.execute('PRAGMA table_info(order_items)')
for row in cur.fetchall():
    if 'accessory_id' in row[1].lower():
        print(f"  {row[1]}: {row[2]} (fk constraint)")

# Check cart_items table schema
print("\nCart_items table schema:")
cur.execute('PRAGMA table_info(cart_items)')
for row in cur.fetchall():
    if 'accessory_id' in row[1].lower():
        print(f"  {row[1]}: {row[2]}")

conn.close()
