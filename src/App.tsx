import { useState } from 'react';
import KoderItem from './components/KoderItem';

function App() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullNames, setFullName] = useState<string[]>([]);

  function onAddItem() {
    setFullName([`${name} ${lastName}`, ...fullNames]);
    setName('');
    setLastName('');
  }

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') onAddItem();
  }

  function onDelete(indexToDelete: number) {
    fullNames.splice(indexToDelete, 1);
    setFullName([...fullNames]);
  }

  return (
    <>
      <div className='min-h-screen font-sans bg-neutral-900 text-white'>
        <div className='flex flex-wrap justify-center pt-5'>
          <div className='border border-slate-200 p-20'>
            <h1 className='text-center text-5xl pb-5'>KODER LIST 📝</h1>
            <div className='flex justify-between gap-5 py-5'>
              <input
                type='text'
                placeholder='First Name'
                className='border border-slate-800 grow rounded text-black'
                onChange={(event) => setName(event.target.value)}
                onKeyUp={onEnter}
                value={name}
              />
              <input
                type='text'
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
              {fullNames.map((fullName, index) => {
                return (
                  <KoderItem
                    key={`item-${index}`}
                    fullName={fullName}
                    onDelete={() => onDelete(index)}
                  />
                );
              })}
            </ul>
            <div className='flex'>
              <button
                className='bg-indigo-500 h-10 rounded grow'
                onClick={() => setFullName([])}
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
