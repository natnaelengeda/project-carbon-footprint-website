export interface FeedbackCardProps {
  icon: string;
  message: string;
}

export interface NameInputProps {
  placeholder: string;
  icon: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface ScoreDisplayProps {
  score: string;
  rank: string;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function FinishedPage({ setPage }: Props) {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-32 pb-64 bg-white max-md:px-5 max-md:py-24">
      <div className="flex flex-col items-center w-full max-w-[844px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/12f60cefd57c047360ce0e4f9f4ffe7dc4f91a8165bf1e281ae853005bd3baf4?placeholderIfAbsent=true&apiKey=3660c584904a4f1ba2f45407fc652aed"
          alt="Score achievement illustration"
          className="object-contain max-w-full aspect-[1.13] w-[478px]"
        />
        <ScoreDisplay score="86/100" rank="Top 10" />
        <FeedbackCard
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e2952fe080b06056b29e232a24c9c410477082b5cea70d57d58a4b8135ac6b84?placeholderIfAbsent=true&apiKey=3660c584904a4f1ba2f45407fc652aed"
          message="This is the feedback for the user lorem ipsum dolor sit amet consectetur. Consectetur ultricies vel massa pretium. Ornare sollicitudin"
        />
        <div className="shrink-0 self-stretch mt-28 h-px border border-solid border-stone-300 max-md:mt-10 max-md:max-w-full" />
        <NameInput
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c0a72960dcfdc9356eb65e447c185f4ca5ef6fe257066f3500c22b1d1cb2095d?placeholderIfAbsent=true&apiKey=3660c584904a4f1ba2f45407fc652aed"
          placeholder="E.g. John Doe"
          setPage={setPage}
        />
      </div>
    </div>
  )
}


export const FeedbackCard: React.FC<FeedbackCardProps> = ({ icon, message }) => {
  return (
    <div className="flex flex-col justify-center self-stretch p-8 mt-24 w-full text-4xl font-medium bg-white rounded-3xl leading-[53px] shadow-[0px_4px_100px_rgba(0,0,0,0.05)] text-zinc-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-7 justify-between items-start max-w-full w-[763px]">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 w-11 aspect-square"
        />
        <div className="w-[693px] max-md:max-w-full">{message}</div>
      </div>
    </div>
  );
};

export const NameInput: React.FC<NameInputProps> = ({ placeholder, icon, setPage }) => {
  return (
    <div className="flex flex-col items-center mt-24 max-w-full w-[649px] max-md:mt-10">
      <label htmlFor="nameInput" className="text-4xl font-medium leading-[58px] text-slate-900 max-md:max-w-full">
        Do you want to share your name to be on the leaderboard? (Optional)
      </label>
      <div
        className="flex overflow-hidden gap-2.5 items-center px-6 py-6 mt-14 w-full text-2xl rounded-xl border border-solid border-zinc-400 max-w-[649px] text-zinc-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-2.5 justify-center items-center self-stretch my-auto">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
          />
          <input
            type="text"
            id="nameInput"
            placeholder={placeholder}
            className="self-stretch my-auto bg-transparent border-none outline-none"
            aria-label="Enter your name"
          />
        </div>
      </div>
      <div 
      className="pt-10">
        <button
          onClick={() => {
            setPage(5);
          }}
          className="flex flex-row items-center justify-center md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
          <p className="text-xl md:text-[34px]">Continue</p>
        </button>
      </div>
    </div>
  );
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, rank }) => {
  return (
    <>
      <div className="mt-14 text-8xl font-bold text-center text-slate-900 max-md:mt-10 max-md:text-4xl">
        {score}
      </div>
      <div className="mt-14 text-4xl text-center leading-[58px] text-slate-900 w-[562px] max-md:mt-10 max-md:max-w-full">
        <span className="font-medium">Congrats! You're one of the</span>{" "}
        <span className="font-bold text-slate-900">{rank}</span>{" "}
        <span className="font-medium">Participants</span>
      </div>
    </>
  );
};