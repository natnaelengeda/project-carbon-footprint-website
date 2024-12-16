
// Components
import BlueBadge from './components/BlueBadge';
import GreenBadge from './components/GreenBadge';
import MintBadge from './components/MintBadge';
import VioletBadge from './components/VioletBadge';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  function getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  if (getRandomNumber() >= 0 && getRandomNumber() <= 2) {
    return (
      <BlueBadge
        setPage={setPage} />
    );
  } else if (getRandomNumber() >= 3 && getRandomNumber() <= 5) {
    return (
      <GreenBadge
        setPage={setPage} />
    );
  } else if (getRandomNumber() >= 6 && getRandomNumber() <= 8) {
    return (
      <VioletBadge
        setPage={setPage} />
    );
  } else {
    return (
      <MintBadge
        setPage={setPage} />
    );
  }

}
