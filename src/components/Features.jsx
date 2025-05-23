
import { Briefcase } from 'lucide-react';
import doczon from '../assets/docZon.png'
import copy from '../assets/copy.png'

function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="bg-gray-100 p-4 rounded shadow text-center">
        <h3 className="font-bold text-lg mb-2">Добро пожаловать!</h3>
        <p className="text-sm mb-4">
          Войдите, чтобы оставлять отзывы и пользоваться другими функциями авторизованных пользователей.
        </p>
        <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 text-sm">
          Войти в личный кабинет
        </button>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow flex flex-row-reverse items-center gap-5 justify-center">
        <Briefcase size={40} className="text-blue-800 mb-2" />
        <p className="text-blue-800 font-bold text-center">Покупать <br /> как юрлицо</p>
      </div>
      <div className="bg-indigo-100 p-4 rounded shadow text-center flex items-center justify-center flex-col gap-4">
        <img src={doczon} alt="doczon" className="mx-auto h-6 mb-2" />
        <p className="text-sm text-gray-900 font-semibold">Электронный документооборот</p>
      </div>
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-4 rounded shadow text-center flex items-center justify-center flex-col gap-5">
        <img src={copy} alt="" />
        <p className="text-sm font-bold">Онлайн меню для ресторанов и гостиниц</p>
      </div>
    </div>
  );
}

export default Features;
