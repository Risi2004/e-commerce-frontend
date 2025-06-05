// // src/pages/CartPage.jsx
// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// function CartPage() {
//   const {
//     cartItems,
//     removeFromCart,
//     clearCart,
//     total,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useCart();

//   const navigate = useNavigate();

//   const goToPayment = () => {
//     if (cartItems.length > 0) {
//       navigate("/payment", {
//         state: {
//           selections: cartItems,
//           total,
//         },
//       });
//     } else {
//       alert("Your cart is empty. Add items before proceeding to payment.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">🛒 Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//             <table className="min-w-full text-sm text-left text-gray-700">
//               <thead className="text-xs uppercase bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="px-6 py-3">Image</th>
//                   <th className="px-6 py-3">Name</th>
//                   <th className="px-6 py-3">Brand</th>
//                   <th className="px-6 py-3">Quantity</th>
//                   <th className="px-6 py-3">Price</th>
//                   <th className="px-6 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item, index) => (
//                   <tr key={`${item.type}-${item.id}-${index}`} className="border-b hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-14 h-14 object-contain rounded border"
//                       />
//                     </td>
//                     <td className="px-6 py-4 font-medium">{item.name}</td>
//                     <td className="px-6 py-4">{item.brand}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() =>
//                             decreaseQuantity(item.id, item.type, item.name, item.brand)
//                           }
//                           className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
//                         >
//                           -
//                         </button>
//                         <span className="px-2">{item.quantity}</span>
//                         <button
//                           onClick={() =>
//                             increaseQuantity(item.id, item.type, item.name, item.brand)
//                           }
//                           className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 font-semibold text-green-700">
//                       ${item.price * item.quantity}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button
//                         onClick={() =>
//                           removeFromCart(item.id, item.type, item.name, item.brand)
//                         }
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-8 text-right space-y-4">
//             <h2 className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</h2>

//             <div className="flex flex-wrap justify-end gap-4">
//               <button
//                 onClick={clearCart}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded shadow"
//               >
//                 Clear Cart
//               </button>

//               <button
//                 onClick={goToPayment}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-semibold"
//               >
//                 Proceed to Payment 💳
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CartPage;




import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    total,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const goToPayment = () => {
    if (cartItems.length > 0) {
      navigate("/payment", {
        state: {
          selections: cartItems,
          total,
        },
      });
    } else {
      alert("Your cart is empty. Add items before proceeding to payment.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item._id || item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      category: item.category,
      imageUrl: item.image,
      brand: item.brand,
      specs: item.specs,
    }));

    const order = {
      userId: user?.uid || user?.email || "anonymous",
      type: "single_product",
      products,
      totalAmount: total,
      address: "N/A",
    };

    try {
      await axios.post("http://localhost:5000/api/orders", order);
      toast.success("✅ Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={`${item.type}-${item.id}-${index}`} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded border"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.brand}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id, item.type, item.name, item.brand)
                          }
                          className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(item.id, item.type, item.name, item.brand)
                          }
                          className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-700">
                      ${item.price * item.quantity}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.type, item.name, item.brand)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-right space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</h2>

            <div className="flex flex-wrap justify-end gap-4">
              <button
                onClick={clearCart}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded shadow"
              >
                Clear Cart
              </button>

              <button
                onClick={goToPayment}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-semibold"
              >
                Proceed to Payment 💳
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
