import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // Original imports
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { clearCart } from '../redux/cartslice';

// --- MOCKING EXTERNAL DEPENDENCIES & DATA FOR CANVAS ---
const MOCKED_CART_ITEMS = [
    { id: 'a1', title: 'Luxury Leather Wallet', price: '1200.00', quantity: 2, img: 'https://placehold.co/100x100/A0B9E1/000?text=Wallet' },
    { id: 'b2', title: 'Noise Cancelling Headphones', price: '7500.50', quantity: 1, img: 'https://placehold.co/100x100/F4D35E/000?text=Headphones' },
];

const useSelector = (selector) => MOCKED_CART_ITEMS;
const useDispatch = () => () => console.log('Mocked dispatch called');
const useNavigate = () => (path, options) => console.log(`Mock navigation to ${path}`, options);
const clearCart = () => ({ type: 'MOCKED_CLEAR_CART' });
const stripePromise = { load: () => Promise.resolve({ redirectToCheckout: () => console.log('Mock redirect to Stripe') }) };
// --------------------------------------------------------

// Helper function to safely parse the price string (to prevent NaN errors)
const parsePrice = (priceString) => {
    // Cleans the string to include only digits and decimal points
    const cleanedPrice = String(priceString).replace(/[^\d.]/g, '');
    const price = parseFloat(cleanedPrice);
    return isNaN(price) ? 0 : price;
};

const CheckoutPage = () => {
    // In your real app, this uses useSelector
    const cartItems = useSelector(state => state.cart.cartitems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // State for user input
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); // New state for phone number

    // Calculate Total Price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => 
            total + parsePrice(item.price) * item.quantity, 0
        );
    };
    
    const total = getTotalPrice();

    // Stripe Status Effect (checks for success/cancel after redirect back)
    useEffect(() => {
        // NOTE: This effect relies on the external libraries to be properly set up.
        // It's included here to demonstrate the full logic flow.
        const query = new URLSearchParams(window.location.search);
        
        if (query.get("success")) {
            console.log("Payment Successful ✅. Clearing cart and navigating.");
            // Assuming you want to navigate to a summary page after success
            navigate("/order-summary", { state: { items: cartItems, total: total } });
            dispatch(clearCart());
            window.history.replaceState(null, "", "/checkout"); // Clean URL
        }
        if (query.get("canceled")) {
            console.error("Payment Canceled ❌. User returned from Stripe.");
            window.history.replaceState(null, "", "/checkout"); // Clean URL
        }
    }, [dispatch, cartItems, navigate, total]);


    // Stripe Checkout Handler - Redirects to Stripe's Hosted Page
    const handleCheckout = async () => {
        if (cartItems.length === 0) return console.error("Your cart is empty");
        
        // Basic validation for required fields
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return console.error("Please enter a valid email address to proceed.");
        }
        
        // Optional: add validation for phone if needed
        // if (!phone) { return console.error("Please enter your phone number."); }

        const items = cartItems.map(item => ({
            name: item.title,
            // Pass the numerical price
            price: parsePrice(item.price), 
            quantity: item.quantity
        }));

        try {
            // Replace this mock with your actual fetch call:
            console.log('--- Mocking Stripe Checkout API Call ---');
            console.log('Sending items to backend:', items);
            console.log('Customer Email:', email);
            console.log('Customer Phone:', phone);
            
            /* // ----------------------------------------------------
            // UNCOMMENT THIS BLOCK IN YOUR REAL PROJECT
            // ----------------------------------------------------
            
            const res = await fetch("http://localhost:5055/create-checkout-session", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    items, 
                    customer_email: email,
                    customer_phone: phone // Pass phone number to backend
                }) 
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe's hosted checkout page
            } else {
                console.error("Failed to create Stripe session:", data.error || "Unknown error");
            }
            */

        } catch (error) {
            console.error("Checkout process failed:", error);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 font-['Inter']">
                <p className="text-xl text-gray-600">Your cart is empty. Please add items before checking out.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 sm:px-6 lg:px-8 font-['Inter']">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl p-8">
                <div className="flex flex-col md:flex-row gap-10">
                    
                    {/* LEFT COLUMN: Order Details / Summary (Order 2 on mobile) */}
                    <div className="flex-1 p-6 bg-indigo-50 border border-indigo-200 rounded-xl order-2 md:order-1">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b border-indigo-300 pb-3">Final Order Summary</h2>
                        
                        <div className="space-y-3 mb-8">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm text-gray-700">
                                    <div className="flex-grow pr-4">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-xs text-gray-500">Qty {item.quantity} @ ₹{parsePrice(item.price).toFixed(2)} ea</p>
                                    </div>
                                    <p className="font-bold text-gray-900">
                                        ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Total Summary */}
                        <div className="pt-4 border-t border-indigo-300">
                            <div className="flex justify-between text-xl font-extrabold text-indigo-700">
                                <span>Order Total:</span>
                                <span>
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact Information and Checkout (Order 1 on mobile) */}
                    <div className="flex-1 p-6 order-1 md:order-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Secure Checkout</h2>

                        {/* Email Input */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition duration-150"
                                required
                            />
                        </div>

                        {/* Phone Number Input (New Field) */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter your Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="(+91) 98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition duration-150"
                            />
                        </div>

                        {/* Complete Order Button */}
                        <button 
                            className={`w-full py-3 px-4 rounded-lg text-lg font-semibold transition-colors shadow-xl ${
                                total > 0 && email 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.01]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            onClick={handleCheckout}
                            disabled={total === 0 || !email}
                        >
                            💳 Pay with Stripe
                        </button>
                        
                        {/* Powered by Stripe text */}
                        <p className="text-center text-xs text-gray-500 mt-4">
                            Your payment is secured and processed by <span className="font-bold text-indigo-600">Stripe</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;