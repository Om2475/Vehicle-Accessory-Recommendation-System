import sqlite3

conn = sqlite3.connect('ML_Engine/vehicle_accessories.db')
cur = conn.cursor()

print("Accessories table info:")
cur.execute('PRAGMA table_info(accessories)')
for row in cur.fetchall():
    if 'accessory_id' in row[1]:
        print(f"  {row[1]}: type={row[2]}, pk={row[5]}, notnull={row[3]}")

print("\nTable creation SQL:")
cur.execute('SELECT sql FROM sqlite_master WHERE name="accessories"')
sql = cur.fetchone()[0]
# Print first 800 chars
print(sql[:800])

conn.close()
