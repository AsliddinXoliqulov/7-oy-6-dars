import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import payme from "../assets/payme.png";
import clik from "../assets/clik.png";
import pop1 from "../assets/popular/popular1.png";
import pop2 from "../assets/popular/popular2.png";
import pop3 from "../assets/popular/popular3.png";
import pop4 from "../assets/popular/popular4.png";

const Footer = () => {
  return (
    <div>
      <h1 className="text-center font-black text-lg my-10">Popular</h1>
      <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-5 px-[6%]">
        <div className="rounded-xl sm:w-52 h-96">
          <img className="rounded-2xl w-full pb-3" src={pop1} alt="" />
          <h4 className="text-blue-400 text-sm my-1 px-4">12.05.2024</h4>
          <p className="px-3 pb-3">Виброметры для двигателей имеханизмов</p>
        </div>
        <div className="rounded-xl sm:w-52 h-96">
          <img className="rounded-2xl w-full pb-3" src={pop2} alt="" />
          <h4 className="text-blue-400 text-sm my-1 px-4">15.02.2025</h4>
          <p className="px-3 pb-3">
            Частотный преобразователь — что такое и для чего он нужен
          </p>
        </div>
        <div className="rounded-xl sm:w-52 h-96">
          <img className="rounded-2xl w-full pb-3" src={pop3} alt="" />
          <h4 className="text-blue-400 text-sm my-1 px-4">13.06.2023</h4>
          <p className="px-3 pb-3">
            Зачем нужен такой прибор, как лазерный тахометр?
          </p>
        </div>
        <div className="rounded-xl sm:w-52 h-96">
          <img className="rounded-2xl w-full pb-3" src={pop4} alt="" />
          <h4 className="text-blue-950 text-sm my-1 px-4">14.16.2022</h4>
          <p className="px-3 pb-3">
            Люксометр - Измеритель яркости и освещённости
          </p>
        </div>
      </div>
      <footer className="flex border-t-2 py-5 gap-5 w-full bg-white border-gray-100 items-center justify-center md:justify-between flex-wrap px-[6%]">
        <div>
          <b>Мы в социальных сетях</b>
          <div className="flex items-center gap-5 text-3xl mt-2">
            <a href="https://web.telegram.org">
              <FaTelegram className="text-blue-400"/>
            </a>
            <a href="https://www.youtube.com/">
              <FaYoutube className="text-red-500"/>
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram className="text-red-400"/>
            </a>
            <a href="https://www.facebook.com/">
              <FaFacebook className="text-blue-500"/>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ul className="text-end">
            <b>Контакты</b>
            <li>Эл. почта</li>
            <li>
              <a href="mailto:info@zon.uz">info@zon.uz</a>
            </li>
          </ul>
          <ul>
            <b>В будние</b>
            <li>с 09:00 до 18:00</li>
            <li>
              <a href="tel:+998 88 120 60 40">+ 998 88 120 60 40</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <a href="https://payme.uz/home/main">
              <img
                className="w-20 border-r-2 border-gray-300 pr-1"
                src={payme}
                alt=""
              />
            </a>
            <a href="https://click.uz">
              <img className="w-20" src={clik} alt="" />
            </a>
          </div>
          <div className="mt-1 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Zon.uz. Barcha <br /> huquqlar
              himoyalangan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
