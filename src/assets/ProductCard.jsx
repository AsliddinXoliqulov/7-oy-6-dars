// import React, { useEffect, useState } from "react";
// import { Heart } from "lucide-react";
// import { VscLoading } from "react-icons/vsc";
// import axios from "axios";
// import { MdOutlineAddShoppingCart } from "react-icons/md";

// const ZonCards = () => {
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const apiUrl = import.meta.env.VITE_API_URL;

//     // Ma'lumotlarni olish
//     axios
//       .get(`${apiUrl}/ZonCards`)
//       .then((res) => {
//         setCards(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Xatolik:", err);
//         setLoading(false);
//       });

//     // Savatni localStorage'dan olish
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(savedCart);
//   }, []);

//   const toggleLike = async (id, currentLiked) => {
//     try {
//       const updated = { liked: !currentLiked };
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/ZonCards/${id}`, updated);

//       setCards((prev) =>
//         prev.map((card) =>
//           card.id === id ? { ...card, liked: !currentLiked } : card
//         )
//       );
//     } catch (error) {
//       console.error("Like o'zgartirishda xatolik:", error);
//     }
//   };

//   const addToCart = (card) => {
//     const isAlreadyInCart = cartItems.some((item) => item.id === card.id);
//     if (!isAlreadyInCart) {
//       const updatedCart = [...cartItems, card];
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 relative">
//       {loading ? (
//         <div className="absolute right-[50%] top-10 transform translate-x-1/2">
//           <VscLoading className="animate-spin text-5xl text-blue-500" />
//         </div>
//       ) : (
//         cards.map((card) => {
//           const isInCart = cartItems.some((item) => item.id === card.id);
//           const isDisabled = isInCart || card.sale;

//           return (
//             <div
//               key={card.id}
//               className="bg-gray-50 shadow-md rounded-2xl p-3 relative hover:shadow-lg transition duration-300"
//             >
//               {card.sale && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                   Нет в наличии
//                 </span>
//               )}
//               <img
//                 src={card.img}
//                 alt={card.title}
//                 className="w-full h-48 rounded-t-2xl object-contain mb-2"
//               />
//               <h2 className="text-sm font-semibold mb-1 line-clamp-2">
//                 {card.title}
//               </h2>
//               <p className="text-base font-bold text-green-600">
//                 {card.price.toLocaleString("ru-RU")} so'm
//               </p>
//               <div className="flex justify-between items-center mt-2">
//                 <button
//                   className={`text-[#1bc5bd] bg-white text-2xl border border-gray-400 w-9 h-9 rounded-full flex items-center justify-center ${
//                     isDisabled
//                       ? "cursor-not-allowed text-gray-400"
//                       : "hover:bg-gray-100"
//                   }`}
//                   onClick={() => addToCart(card)}
//                   disabled={isDisabled}
//                 >
//                   <MdOutlineAddShoppingCart />
//                 </button>
//                 <button 
//                   className={`${card.liked ? "text-red-500" : "text-gray-400"} absolute top-2 right-2`}
//                   onClick={() => toggleLike(card.id, card.liked)}
//                 >
//                   <Heart fill={card.liked ? "red" : "none"} />
//                 </button>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default ZonCards;
