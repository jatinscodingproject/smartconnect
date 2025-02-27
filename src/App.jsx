import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Enterprises from "./pages/Enterprise";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Shop2 from "./pages/shop2";
import About from "./pages/About";
import CardDetails from "./pages/CardDetails";
import EditCard from "./pages/EditCard";
import AllCards from "./pages/AllCards";
import Checkout from "./pages/Checkout";
import PaymentSucces from "./pages/PaymentSucces";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Enterprises" element={<Enterprises />} />
            <Route path="/Artist" element={<Artist />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shops" element={<Shop2 />} />
            <Route path="/all-cards/:id?" element={<AllCards />} />
            <Route path="/all-cards" element={<AllCards />} />
            <Route path="/card-details/:cardId?" element={<CardDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSucces />} />

          </Route>
          <Route path="/profile/:username?" element={<Profile />} />
          <Route path="/edit-card/:id?" element={<EditCard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}