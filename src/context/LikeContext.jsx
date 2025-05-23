import React, { createContext, useState, useContext } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (productId) => {
    setLikedItems((prevItems) =>
      prevItems.includes(productId)
        ? prevItems.filter(item => item !== productId)
        : [...prevItems, productId]
    );
  };

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
