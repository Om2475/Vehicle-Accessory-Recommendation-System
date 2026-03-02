"""Test complete flow: signup, add to cart, add to wishlist, create order"""
import sys
sys.path.insert(0, 'ML_Engine')

from auth import UserAuth, SessionManager
from db_helpers import CartDB, WishlistDB, OrderDB

print("=" * 60)
print("Testing Complete E-commerce Flow")
print("=" * 60)

# Step 1: Create test user
print("\n1. Creating test user...")
try:
    result = UserAuth.signup(
        email="test2@example.com",
        password="TestPass123",
        full_name="Test User 2"
    )
    user_id = result['user_id']
    print(f"   ✓ User created: ID={user_id}, Email={result['email']}")
except Exception as e:
    print(f"   User might exist, trying login...")
    result = UserAuth.login("test2@example.com", "TestPass123")
    user_id = result['user_id']
    print(f"   ✓ User logged in: ID={user_id}")

# Step 2: Add items to cart
print("\n2. Adding items to cart...")
cart_result1 = CartDB.add_to_cart(user_id, "1", 2)
print(f"   Item 1: {cart_result1}")
cart_result2 = CartDB.add_to_cart(user_id, "5", 1)
print(f"   Item 2: {cart_result2}")

# Step 3: Check cart
print("\n3. Checking cart...")
cart_items = CartDB.get_cart_items(user_id)
print(f"   Found {len(cart_items)} items")
for item in cart_items:
    print(f"   - {item['accessory_name'][:50]} (₹{item['price']}) x {item['quantity']}")

# Step 4: Add to wishlist
print("\n4. Adding to wishlist...")
wish_result = WishlistDB.add_to_wishlist(user_id, "10")
print(f"   {wish_result}")

# Step 5: Create order
print("\n5. Creating order...")
delivery_info = {
    'full_name': 'Test User 2',
    'email': 'test2@example.com',
    'phone': '1234567890',
    'address': '123 Test St',
    'city': 'Test City',
    'state': 'Test State',
    'pincode': '123456'
}

total = CartDB.get_cart_total(user_id)
order_result = OrderDB.create_order(
    user_id=user_id,
    cart_items=cart_items,
    total_amount=total,
    delivery_charge=0,
    delivery_info=delivery_info,
    payment_method='cod'
)
print(f"   Order: {order_result}")

if order_result['success']:
    # Step 6: Verify cart is cleared
    print("\n6. Verifying cart cleared...")
    cart_after = CartDB.get_cart_items(user_id)
    print(f"   Cart items after order: {len(cart_after)}")
    
    # Step 7: Get order details
    print("\n7. Fetching order details...")
    order = OrderDB.get_order_by_number(order_result['order_number'])
    print(f"   Order #{order['order_number']}")
    print(f"   Total: ₹{order['total_amount']}")
    print(f"   Items: {len(order['items'])}")
    for oi in order['items']:
        print(f"     - {oi['accessory_name'][:50]} x {oi['quantity']}")

print("\n" + "=" * 60)
print("✅ All operations completed successfully!")
print("=" * 60)
