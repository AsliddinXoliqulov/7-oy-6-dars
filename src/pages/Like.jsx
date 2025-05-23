import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const LIMIT = 5;

const Like = () => {
  const [likedCards, setLikedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/ZonCards`);
        const likedOnly = res.data.filter((card) => card.liked === true);
        setLikedCards(likedOnly);

        localStorage.setItem("likes", JSON.stringify(likedOnly));
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const addToCart = (card) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === card.id);
    if (!isAlreadyInCart) {
      const updatedCart = [...cartItems, card];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const toggleLike = async (id, currentLiked) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(`${apiUrl}/ZonCards/${id}`, { liked: !currentLiked });

      const updatedLikedCards = likedCards.filter((card) => card.id !== id);
      setLikedCards(updatedLikedCards);

      localStorage.setItem("likes", JSON.stringify(updatedLikedCards));

      // Agar o'chirilgan like sahifada oxirgi bo'lsa va sahifa bo'sh qolsa, sahifani 1ga tushiramiz
      const maxPage = Math.ceil(updatedLikedCards.length / LIMIT);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage || 1);
      }
    } catch (error) {
      console.error("Like o'zgartirishda xatolik:", error);
    }
  };

  // Sahifadagi kartalarni kesib olish
  const startIndex = (currentPage - 1) * LIMIT;
  const pagedCards = likedCards.slice(startIndex, startIndex + LIMIT);

  return (
    <div className="px-4 py-6">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <VscLoading className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : likedCards.length === 0 ? (
        <div className=" flex items-center justify-center text-center w-full">
          <div className="max-w-[500px] w-full rounded px-5 border-2 py-5 border-gray-500">
            <h1 className="text-2xl font-black text-gray-600">Избранные товары</h1>
            <p className="my-5 font-bold text-xl text-gray-600">Нет выбранных продуктов</p>
            <Link to="/">
              <button className="bg-[#6682a9] rounded text-white w-full py-2 hover:bg-[#4f6c94]">На главную</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Yoqtirilgan mahsulotlar soni: {likedCards.length}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pagedCards.map((card) => {
              const isInCart = cartItems.some((item) => item.id === card.id);
              const isDisabled = isInCart || card.sale;

              return (
                <div
                  key={card.id}
                  className="shadow-md rounded-2xl p-3 relative hover:shadow-lg transition duration-300 sm:max-w-60"
                >
                  {card.sale && (
                    <span className="absolute bottom-16 left-2 bg-red-200 text-red-500 text-xs px-2 py-0.5 rounded-2xl font-bold">
                      Нет в наличии
                    </span>
                  )}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-48 rounded-t-2xl object-contain mb-2"
                  />
                  <h2 className="text-sm font-medium text-gray-500 mb-1 line-clamp-2 h-5">
                    {card.title}
                  </h2>
                  <div className="w-full h-5" />
                  <div className="flex justify-between items-center">
                    <span className="mt-5">
                      <p className="text-base font-bold">
                        {card.price.toLocaleString("ru-RU")} so'm
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        250 000
                      </p>
                    </span>
                    <button
                      className={`text-[#1bc5bd] bg-white text-2xl border border-gray-400 w-9 h-9 rounded-full flex items-center justify-center ${
                        isDisabled ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-100"
                      }`}
                      onClick={() => addToCart(card)}
                      disabled={isDisabled}
                    >
                      <MdOutlineAddShoppingCart />
                    </button>
                  </div>
                  <button
                    className={`${card.liked ? "text-red-500" : "text-[#f1f1f1]"} absolute top-2 right-2`}
                    onClick={() => toggleLike(card.id, card.liked)}
                  >
                    <Heart fill={card.liked ? "red" : "#f1f1f1"} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={LIMIT}
              total={likedCards.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
              locale={{
                prev_page: "Orqaga",
                next_page: "Oldinga",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Like;
