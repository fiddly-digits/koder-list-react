import { useState, useRef } from 'react';
import KoderItem from './components/KoderItem';
import Koder from './data/koder';

function App() {
  const nameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [koders, setKoders] = useState<Koder[]>([]);

  function onAddItem() {
    if (name && lastName) {
      setKoders([{ name, lastName }, ...koders]);
      setName('');
      setLastName('');
      lastNameInput.current?.blur();
      nameInput.current?.focus();
    } else {
      alert('One or more of the inputs are empty');
    }
  }

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') onAddItem();
  }

  function onDelete(koderToDelete: Koder) {
    setKoders(koders.filter((koder) => koder !== koderToDelete));
  }

  return (
    <>
      <div className='min-h-screen font-sans bg-neutral-900 text-white'>
        <div className='flex flex-wrap justify-center pt-5'>
          <div className='border border-slate-200 sm:p-20 p-5'>
            <h1 className='text-center text-5xl pb-5'>KODER LIST 📝</h1>
            <div className='flex justify-between gap-5 py-5'>
              <input
                type='text'
                ref={nameInput}
                placeholder='First Name'
                className='border border-slate-800 grow rounded text-black'
                onChange={(event) => setName(event.target.value)}
                onKeyUp={onEnter}
                value={name}
              />
              <input
                type='text'
                ref={lastNameInput}
                placeholder='Last Name'
                className='border border-slate-800 grow rounded text-black'
                onChange={(event) => setLastName(event.target.value)}
                onKeyUp={onEnter}
                value={lastName}
              />
              <button
                type='submit'
                className='bg-slate-200 w-8 h-8 text-black rounded'
                onClick={onAddItem}
              >
                +
              </button>
            </div>
            <ul className='pb-5'>
              {koders.map((koder, index) => {
                console.log(koder);
                return (
                  <KoderItem
                    key={`item-${index}`}
                    koder={koder}
                    onDelete={() => onDelete(koder)}
                  />
                );
              })}
            </ul>
            <div className='flex'>
              <button
                className='bg-sky-500 h-10 rounded grow'
                onClick={() => setKoders([])}
              >
                🗑️ Delete Everything 🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
