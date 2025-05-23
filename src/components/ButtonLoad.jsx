// import React from "react";
// import axios from "axios";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Pagination, Skeleton, Alert, Button } from "antd";
// import { MdOutlineAddShoppingCart } from "react-icons/md";
// import { Heart } from "lucide-react";

// const LIMIT = 10;

// const ZonCards = () => {
//   const [cartItems, setCartItems] = React.useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   const getCards = async ({ pageParam = 1 }) => {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const res = await axios.get(`${apiUrl}/ZonCards?page=${pageParam}&limit=${LIMIT}`);
//     return {
//       data: res.data,
//       nextPage: res.data.length === LIMIT ? pageParam + 1 : undefined,
//     };
//   };

//   const {
//     data,
//     isLoading,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["zon-cards"],
//     queryFn: getCards,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   const allCards = data?.pages.flatMap((page) => page.data) || [];

//   const addToCart = (card) => {
//     const isAlreadyInCart = cartItems.some((item) => item.id === card.id);
//     if (!isAlreadyInCart) {
//       const newCard = { ...card, count: 1 };
//       const updatedCart = [...cartItems, newCard];
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   const toggleLike = async (id, currentLiked) => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/ZonCards/${id}`, { liked: !currentLiked });

//       // local o'zgarishlar uchun
//       data.pages.forEach((page) => {
//         page.data.forEach((card) => {
//           if (card.id === id) {
//             card.liked = !currentLiked;
//           }
//         });
//       });
//     } catch (err) {
//       console.error("Like xatoligi:", err);
//     }
//   };

//   const renderSkeletons = () =>
//     Array.from({ length: LIMIT }).map((_, i) => (
//       <Skeleton.Input key={i} active className="!h-[250px] !w-full rounded-xl" />
//     ));

//   return (
//     <div className="w-[90%] m-auto p-4 border border-gray-300 rounded-lg mb-10">
//       <h2 className="text-xl font-bold mb-4">Mahsulotlar</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//         {allCards.map((card) => {
//           const isInCart = cartItems.some((item) => item.id === card.id);
//           const isDisabled = isInCart || card.sale;

//           return (
//             <div
//               key={card.id}
//               className="shadow-md rounded-2xl p-3 relative hover:shadow-lg transition duration-300 sm:max-w-60 bg-white"
//             >
//               {card.sale && (
//                 <span className="absolute bottom-16 left-2 bg-red-200 text-red-500 text-xs px-2 py-0.5 rounded-2xl font-bold">
//                   Нет в наличии
//                 </span>
//               )}
//               <img
//                 src={card.img}
//                 alt={card.title}
//                 className="w-full h-40 object-contain mb-2 rounded-t-xl"
//               />
//               <h2 className="text-sm font-medium text-gray-700 mb-1 line-clamp-2">
//                 {card.title}
//               </h2>
//               <div className="flex justify-between items-center">
//                 <span className="mt-1">
//                   <p className="text-base font-bold">
//                     {card.price.toLocaleString("ru-RU")} so'm
//                   </p>
//                   <p className="text-sm text-gray-400 line-through">250 000</p>
//                 </span>
//                 <button
//                   className={`text-[#1bc5bd] text-2xl border border-gray-300 w-9 h-9 rounded-full flex items-center justify-center ${
//                     isDisabled
//                       ? "cursor-not-allowed text-gray-400"
//                       : "hover:bg-gray-100"
//                   }`}
//                   onClick={() => addToCart(card)}
//                   disabled={isDisabled}
//                 >
//                   <MdOutlineAddShoppingCart />
//                 </button>
//               </div>
//               <button
//                 className={`${
//                   card.liked ? "text-red-500" : "text-gray-300"
//                 } absolute top-2 right-2`}
//                 onClick={() => toggleLike(card.id, card.liked)}
//               >
//                 <Heart fill={card.liked ? "red" : "#f1f1f1"} />
//               </button>
//             </div>
//           );
//         })}

//         {isLoading || isFetchingNextPage ? renderSkeletons() : null}
//       </div>

//       {hasNextPage && (
//         <div className="text-center mt-6">
//           <Button onClick={fetchNextPage} loading={isFetchingNextPage}>
//             {isFetchingNextPage ? "Yuklanmoqda..." : "Yana yuklash"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ZonCards;
