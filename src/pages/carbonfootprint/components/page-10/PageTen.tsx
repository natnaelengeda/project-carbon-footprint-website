
// Components
import BlueBadge from './components/BlueBadge';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  return (
    <div
      className='w-full h-full'>
      <BlueBadge setPage={setPage} />
    </div>
  )
}
