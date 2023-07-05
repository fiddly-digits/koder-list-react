import { useState } from 'react';
import { useForm } from 'react-hook-form';
import KoderItem from './components/KoderItem';
import Koder from './data/koder';
import clsx from 'clsx';

function App() {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors }
  } = useForm<Koder>();
  const [koders, setKoders] = useState<Koder[]>([]);

  function onSubmit(data: Koder) {
    console.log(data);
    setKoders([data, ...koders]);
    reset();
    resetField('name');
  }

  function onDelete(koderToDelete: Koder) {
    setKoders(koders.filter((koder) => koder !== koderToDelete));
  }

  return (
    <>
      <div className='min-h-screen font-sans bg-neutral-900 text-white'>
        <div className='flex flex-wrap justify-center pt-5'>
          <div className='border border-slate-200 p-20'>
            <h1 className='text-center text-5xl pb-5'>KODER LIST 📝</h1>
            <form
              className='flex justify-between gap-5 py-5'
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type='text'
                placeholder='First Name'
                className={clsx(
                  'border border-slate-800 grow rounded text-black',
                  { 'border-red-500': errors.name }
                )}
                {...register('name', {
                  required: { value: true, message: 'Name is Required' },
                  minLength: { value: 3, message: 'Min Length Required is 3' }
                })}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='border border-slate-800 grow rounded text-black'
                {...register('lastName', {
                  required: { value: true, message: 'Name is Required' },
                  minLength: { value: 3, message: 'Min Length Required is 3' }
                })}
              />
              <button
                type='submit'
                className='bg-slate-200 w-8 h-8 text-black rounded'
              >
                +
              </button>
            </form>
            {errors.lastName && (
              <p className='text-center pb-5'>{errors.name?.message}</p>
            )}

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
