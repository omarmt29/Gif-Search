import { useState, useEffect } from 'react';
import './App.css';
import { FaSistrix } from 'react-icons/fa6';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const Url = import.meta.env.VITE_API_URL;

  const [gifs, setGifs] = useState([]);
  const [gifData, setGifData] = useState({ url: Url, apiKey: apiKey, query: 'gatitos', limit: 3 });

  const handleFetchGifs = async (query, limit) => {
   
    try {
      const res = await fetch(`${Url}?api_key=${apiKey}&q=${query}&limit=${limit}`)
      const {data} = await res.json();
      setGifs(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchGifs(gifData.query, gifData.limit);
  }, [gifData.query, gifData.limit]);
 
  return (
    <div>
      <div className='m-auto flex w-56 gap-2 fixed top-0 mt-2'>
        <div className='relative w-56 '>
          <input
            onChange={(e) => setGifData({ ...gifData, query: e.target.value })}
            className='shadow-none outline-none rounded-2xl px-6 w-full py-1 text-sm'
            type='text'
            placeholder='Search'
          />
          <FaSistrix className='absolute ml-1 bottom-0 mb-[6px] text-black/20' />
        </div>
        <input
          onChange={(e) => setGifData({ ...gifData, limit: e.target.value })}
          type='number'
          className='w-16 rounded-xl text-center text-sm'
          placeholder='Limit'
        />
      </div>
      <div className='grid grid-cols-12 mt-6'>
        {gifs.length > 0 ? (
          gifs.map((gif) => (
            <div key={gif.id} className='col-span-4 sm:col-span-3'>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))
        ) : (
          <p>No gifs found</p>
        )}
      </div>
    </div>
  );
}

export default App;
