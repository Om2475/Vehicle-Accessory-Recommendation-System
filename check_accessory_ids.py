import sqlite3

conn = sqlite3.connect('ML_Engine/vehicle_accessories.db')
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Check if accessory 985 exists
print("Checking if accessory_id '985' exists:")
cur.execute("SELECT * FROM accessories WHERE accessory_id = '985'")
result = cur.fetchone()
print(f"  Found: {result is not None}")

# Check what accessory IDs actually look like
print("\nFirst 10 accessory IDs in database:")
cur.execute('SELECT accessory_id, accessory_name FROM accessories LIMIT 10')
for row in cur.fetchall():
    print(f"  ID='{row['accessory_id']}' (type: {type(row['accessory_id'])}) - {row['accessory_name']}")

# Check total accessories
cur.execute('SELECT COUNT(*) as count FROM accessories')
total = cur.fetchone()['count']
print(f"\nTotal accessories in DB: {total}")

conn.close()
