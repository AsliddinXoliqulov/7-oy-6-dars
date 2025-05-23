import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const LOAD_STEP = 2; // Bir safar necha mahsulot ko‘rsatilishini belgilaymiz

const Cart = () => {
  const [allItems, setAllItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(LOAD_STEP);
  const [items, setItems] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // **Yangi loading state**

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const withCount = parsed.map((item) => ({
          ...item,
          count: item.count || 1,
        }));
        setAllItems(withCount);
        setItems(withCount.slice(0, LOAD_STEP));
      } catch (e) {
        console.error("Cart items could not be parsed:", e);
      }
    }
  }, []);

  const updateStorage = (updatedAllItems) => {
    setAllItems(updatedAllItems);
    localStorage.setItem("cart", JSON.stringify(updatedAllItems));
    setItems(updatedAllItems.slice(0, visibleCount));
  };

  const increment = (id) => {
    const updatedAll = allItems.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    updateStorage(updatedAll);
  };

  const decrement = (id) => {
    const updatedAll = allItems
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);
    updateStorage(updatedAll);
  };

  const removeItem = (id) => {
    const updatedAll = allItems.filter((item) => item.id !== id);
    updateStorage(updatedAll);
  };

  const loadMore = () => {
    setIsLoadingMore(true);  // Yuklanishni boshladik

    setTimeout(() => { // Simulyatsiya uchun biroz kechikish qo'yamiz
      const newCount = visibleCount + LOAD_STEP;
      setVisibleCount(newCount);
      setItems(allItems.slice(0, newCount));

      setIsLoadingMore(false); // Yuklash tugadi
    }, 1000); // 1 soniyadan keyin yuklash yakunlansin
  };

  const totalPrice = allItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex-1 border-2 border-gray-300 p-4 rounded-xl">
        {items.length === 0 ? (
          <div className=" flex items-center justify-center text-center w-full">
            <div className="max-w-[500px] w-full rounded px-5 py-5">
              <h1 className="text-2xl font-black text-gray-600">
                Корзина пустой
              </h1>
              <p className="my-5 font-bold text-xl text-gray-600">
                Нет выбранных продуктов
              </p>
              <Link to="/">
                <button className="bg-[#6682a9] rounded text-white w-full py-2 hover:bg-[#4f6c94]">
                  На главную
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="lg:grid grid-cols-[3fr_1fr] items-center gap-4 mb-4 border-b pb-4"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-lg font-bold mt-1">
                      {(item.price * item.count).toLocaleString()} сум
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-10 lg:mt-0 ml-10 lg:ml-0">
                  <button
                    onClick={() => decrement(item.id)}
                    disabled={item.count === 1}
                    className={`text-red-600 border rounded-full w-6 h-6 flex items-center justify-center ${
                      item.count === 1 ? "bg-gray-300  cursor-not-allowed" : ""
                    }`}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-medium">{item.count}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-green-600 border rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    className="text-red-600 ml-4"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}

            {/* Ko'proq yuklash tugmasi faqat elementlar to'liq emas bo'lsa ko'rsatiladi */}
            {visibleCount < allItems.length && (
              <div className="text-center mt-4">
                <Button onClick={loadMore} loading={isLoadingMore}>
                  Ko‘proq yuklash
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full md:w-1/3 border-2 border-gray-300 p-4 rounded-xl h-64">
        <div className="flex justify-between text-lg font-medium mb-2">
          <span>Итого</span>
          <span>{totalPrice.toLocaleString()} сум</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Доставка</span>
          <span className="text-green-600">бесплатно</span>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Для заказа товаров требуется регистрация. Если вы уже
          зарегистрированы, войдите в свою учетную запись.
        </p>
        <Link to="/" className="">
          <button
            onClick={() => localStorage.removeItem("cart")}
            className="bg-[#6682a9] text-white w-full py-2 rounded hover:bg-[#4f6c94] transition"
          >
            Заказать
          </button>
        </Link>
        <p className="text-xs text-gray-600 mt-2">
          ✓ Согласен с условиями{" "}
          <a href="#" className="underline">
            Правил пользования
          </a>{" "}
          и{" "}
          <a href="#" className="underline">
            правилами возврата
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cart;
