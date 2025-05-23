import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Skeleton, Alert } from "antd";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 10;

const ZonCardsScroll = () => {
  const targetRef = useRef();
  const [cartItems, setCartItems] = useState([]);

  const fetchCards = async ({ pageParam = 1 }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${apiUrl}/ZonCards?page=${pageParam}&limit=${LIMIT}`);
    return {
      data: res.data,
      nextPage: res.data.length === LIMIT ? pageParam + 1 : undefined,
    };
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["zoncards-infinite"],
    queryFn: fetchCards,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const addToCart = (card) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === card.id);
    if (!isAlreadyInCart) {
      const newCard = { ...card, count: 1 };
      const updatedCart = [...cartItems, newCard];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const toggleLike = async (id, currentLiked) => {
    try {
      const updated = { liked: !currentLiked };
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(`${apiUrl}/ZonCards/${id}`, updated);

      const allCards = data?.pages.flatMap((page) => page.data) || [];
      const updatedCards = allCards.map((card) =>
        card.id === id ? { ...card, liked: !currentLiked } : card
      );

    } catch (error) {
      console.error("Like o'zgartirishda xatolik:", error);
    }
  };

  const allCards = data?.pages.flatMap((page) => page.data) || [];

  const skeleton = () =>
  Array.from({ length: 10 }).map((_, idx) => (
    <Skeleton.Input
      key={idx}
      active
      className="!h-[300px] !w-64 !m-10 max-w-[200px]"
    />
  ));


  if (error) {
    return <Alert message="Xatolik yuz berdi" type="error" />;
  }

  return (
    <div className="w-[90%] m-auto p-4 border border-gray-300 rounded-lg max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Mahsulotlar</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {(isLoading && !data) ? (
          skeleton()
        ) : (
          allCards.map((card) => {
            const isInCart = cartItems.some((item) => item.id === card.id);
            const isDisabled = isInCart || card.sale;

            return (
              <div
                key={card.id}
                className="shadow-md rounded-2xl p-3 relative hover:shadow-lg transition duration-300 sm:max-w-60 bg-white"
              >
                {card.sale && (
                  <span className="absolute bottom-15 left-2 bg-red-200 text-red-500 text-xs px-2 py-0.5 rounded-2xl font-bold">
                    Нет в наличии
                  </span>
                )}
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-40 object-contain mb-2 rounded-t-xl"
                />
                <h2 className="text-sm font-medium text-gray-700 mb-2 line-clamp-2 h-5">
                  {card.title}
                </h2>
                <div className="flex justify-between items-center mt-5">
                  <span className="mt-1">
                    <p className="text-base font-bold">
                      {card.price.toLocaleString("ru-RU")} so'm
                    </p>
                    <p className="text-sm text-gray-400 line-through">250 000</p>
                  </span>
                  <button
                    className={`text-[#1bc5bd] text-2xl border border-gray-300 w-9 h-9 rounded-full flex items-center justify-center ${
                      isDisabled
                        ? "cursor-not-allowed text-gray-400"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => addToCart(card)}
                    disabled={isDisabled}
                  >
                    <MdOutlineAddShoppingCart />
                  </button>
                </div>
                <button
                  className={`${
                    card.liked ? "text-red-500" : "text-gray-300"
                  } absolute top-2 right-2`}
                  onClick={() => toggleLike(card.id, card.liked)}
                >
                  <Heart fill={card.liked ? "red" : "#f1f1f1"} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {(isFetchingNextPage) && (
        <div className="mt-4">{skeleton()}</div>
      )}

      <div ref={targetRef} className="h-[1px]"></div>
    </div>
  );
};

export default ZonCardsScroll;
