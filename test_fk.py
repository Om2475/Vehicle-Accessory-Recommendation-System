import sqlite3

conn = sqlite3.connect('ML_Engine/vehicle_accessories.db')
conn.execute("PRAGMA foreign_keys = ON")
cur = conn.cursor()

# Check foreign key status
cur.execute("PRAGMA foreign_keys")
fk_status = cur.fetchone()[0]
print(f"Foreign keys enabled: {fk_status == 1}")

# Check cart_items foreign key definition
cur.execute("PRAGMA foreign_key_list(cart_items)")
print("\nCart_items foreign keys:")
for row in cur.fetchall():
    print(f"  {row}")

# Create a test user first
print("\nCreating test user...")
try:
    cur.execute("INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)",
                ("testfk@test.com", "hash123", "Test FK User"))
    conn.commit()
    user_id = cur.lastrowid
    print(f"  ✓ User created: ID={user_id}")
except Exception as e:
    # User might exist, get ID
    cur.execute("SELECT user_id FROM users WHERE email = ?", ("testfk@test.com",))
    user_id = cur.fetchone()[0]
    print(f"  User already exists: ID={user_id}")

# Try a manual insert
print("\nAttempting manual insert...")
accessory_id = 1
quantity = 1

try:
    # First verify accessory exists
    cur.execute("SELECT accessory_id, typeof(accessory_id) FROM accessories WHERE accessory_id = ?", (accessory_id,))
    acc = cur.fetchone()
    print(f"  Accessory {accessory_id} exists: {acc is not None}, type: {acc[1] if acc else 'N/A'}")
    
    # Try insert
    cur.execute("INSERT INTO cart_items (user_id, accessory_id, quantity) VALUES (?, ?, ?)",
                (user_id, accessory_id, quantity))
    conn.commit()
    print(f"  ✓ Insert successful!")
    
    # Verify
    cur.execute("SELECT cart_id, user_id, accessory_id, quantity FROM cart_items WHERE user_id = ?", (user_id,))
    row = cur.fetchone()
    if row:
        print(f"  Cart row: cart_id={row[0]}, user_id={row[1]}, accessory_id={row[2]}, qty={row[3]}")
    else:
        print(f"  Cart row: Not found")
    
except Exception as e:
    print(f"  ✗ Insert failed: {e}")

conn.close()
