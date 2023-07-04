import Koder from '../data/koder';

interface Props {
  koder: Koder;
  onDelete: () => void;
}

export default function KoderItem(props: Props) {
  return (
    <li className='flex justify-between items-center gap-5 border rounded p-1 border-neutral-400 mb-2'>
      <p className='grow pl-3 rounded'>{`${props.koder.name} ${props.koder.lastName}`}</p>
      <button onClick={props.onDelete} className='bg-red-600 w-8 h-8 rounded'>
        x
      </button>
    </li>
  );
}
