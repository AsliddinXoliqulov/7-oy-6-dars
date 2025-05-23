import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Like = lazy(() => import("./pages/Like"));
const Admin = lazy(() => import("./pages/admin"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div className="text-center mt-10 text-2xl font-bold">Yuklanmoqda...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/like" element={<Like />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
