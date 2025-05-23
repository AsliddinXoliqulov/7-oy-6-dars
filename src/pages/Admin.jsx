import { useState } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const Admin = () => {
  const [form, setForm] = useState({
    img: '',
    title: '',
    price: '',
    sale: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ZonCards`, form);
      setSuccess(true);
      setForm({
        img: '',
        title: '',
        price: '',
        sale: false,
        liked: false,
      });
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-[90%] mx-auto mt-10 p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Card qo‘shish</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="img"
          placeholder="Rasm URL"
          value={form.img}
          onChange={handleChange}
          className="border p-2 rounded text-sm"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Mahsulot nomi"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded text-sm"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Narxi (so‘m)"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded text-sm"
          required
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="sale"
            checked={form.sale}
            onChange={handleChange}
          />
          Aksiyadami?
        </label>
      

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            borderRadius: '8px',
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          Qo‘shish
        </LoadingButton>
        {success && (
          <p className="text-green-600 text-center text-sm">Card muvaffaqiyatli qo‘shildi!</p>
        )}
      </form>
    </div>
  );
};

export default Admin;
