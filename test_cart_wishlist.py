"""Test cart and wishlist operations with fixed type handling"""
import sys
sys.path.insert(0, 'ML_Engine')

from db_helpers import CartDB, WishlistDB

print("=" * 60)
print("Testing Cart and Wishlist Operations")
print("=" * 60)

user_id = 1

# Test 1: Get cart items
print("\n1. Testing get_cart_items:")
cart_items = CartDB.get_cart_items(user_id)
print(f"   Found {len(cart_items)} items in cart")
for item in cart_items:
    print(f"   - {item.get('accessory_name', 'N/A')} (ID: {item.get('accessory_id')}, Qty: {item.get('quantity')})")

# Test 2: Get cart total
print("\n2. Testing get_cart_total:")
total = CartDB.get_cart_total(user_id)
print(f"   Cart total: ₹{total:,.2f}")

# Test 3: Get cart count
print("\n3. Testing get_cart_count:")
count = CartDB.get_cart_count(user_id)
print(f"   Cart count: {count}")

# Test 4: Get wishlist items
print("\n4. Testing get_wishlist_items:")
wishlist_items = WishlistDB.get_wishlist_items(user_id)
print(f"   Found {len(wishlist_items)} items in wishlist")
for item in wishlist_items:
    print(f"   - {item.get('accessory_name', 'N/A')} (ID: {item.get('accessory_id')})")

# Test 5: Get wishlist count
print("\n5. Testing get_wishlist_count:")
wcount = WishlistDB.get_wishlist_count(user_id)
print(f"   Wishlist count: {wcount}")

print("\n" + "=" * 60)
print("✅ All tests completed!")
print("=" * 60)
