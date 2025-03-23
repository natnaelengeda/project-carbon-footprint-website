import { useEffect, useState } from "react";

// Axios
import axios from "@/utils/axios";
import { generateRandomName } from "@/utils/randomNameGenerator";
import AppAsset from "@/core/AppAsset";

// Translation
import { useTranslation } from "react-i18next";
import QABackground from "../QABackground";

export interface FeedbackCardProps {
  icon: string;
  message: string;
}

export interface NameInputProps {
  placeholder: string;
  icon: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  addData: () => void;
}

export interface ScoreDisplayProps {
  score: string;
  rank: string;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  answers: { [key: number]: number };
  questions: any[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setcUserId: any;
}

export default function FinishedPage({ setPage, answers, questions, setcUserId, setScore }: Props) {
  const [sum, setSum] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  // React Language Packaged;
  const { t } = useTranslation();


  const length = Object.keys(answers).length;

  const calculateAnswers = () => {
    var sum = 0;
    for (var i = 0; i < length; i++) {
      var data = Object.entries(answers)[i];
      console.log(data[0])
      var q = questions.filter((question) => {
        return question._id === data[0];
      })[0];

      const choices = q.translations[0].options;
      const difficulty = q.difficulty;

      choices.filter((choice: any) => {
        if (choice._id === data[1]) {
          if (choice.isCorrect) {
            switch (difficulty) {
              case "Easy":
                sum += 7.5;
                break;
              case "Medium":
                sum += 10;
                break;
              case "Difficult":
                sum += 40 / 3;
                break;
            }
          }
        }
      })
    }
    setSum(sum);
    setScore(sum);
  }

  const addData = () => {
    if (name === "") {
      var cname = generateRandomName();

      axios.post("/api/v1/questionAttempts/", {
        name: cname,
        score: sum
      }).then((response) => {
        console.log(response.data);
        setcUserId(response.data.data._id)
        setPage(5);

      })
    } else {
      axios.post("/api/v1/questionAttempts/", {
        name: name,
        score: sum
      }).then((response) => {
        console.log(response.data);
        setcUserId(response.data.data._id)
        setPage(5);
      })
    }
  }

  useEffect(() => {
    calculateAnswers();
  }, []);

  return (
    <QABackground>
      <div className="relative grid grid-cols-2 items-center w-full z-10 pt-52">
        {/* Left Side */}
        <div className="w-full h-full flex flex-col items-center justify-start gap-5">
          <img
            loading="lazy"
            src={AppAsset.SplashImage}
            alt="Score achievement illustration"
            className="object-contain max-w-full aspect-[1.13] w-[400px]"
          />
          <ScoreDisplay
            score={`${sum.toFixed(0)}/100`}
            rank="Top 10" />
        </div>

        {/* Right Side */}
        <div className="w-full h-full flex flex-col items-center justify-end gap-5">
          <NameInput
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c0a72960dcfdc9356eb65e447c185f4ca5ef6fe257066f3500c22b1d1cb2095d?placeholderIfAbsent=true&apiKey=3660c584904a4f1ba2f45407fc652aed"
            placeholder={t("qa.eg_john_doe", { lng: savedlanguages.qa })}
            name={name}
            setName={setName}
            addData={addData}
          />
        </div>
      </div>
    </QABackground>
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

export const NameInput: React.FC<NameInputProps> = ({ placeholder, icon, name, setName, addData }) => {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  // React Language Packaged;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-24 max-w-full w-[750px] max-md:mt-40">
      <label htmlFor="nameInput" className="text-4xl md:text-[48px] font-medium leading-[58px] text-white max-md:max-w-full">
        {t("qa.do_you_want_to_share_your_name", { lng: savedlanguages.qa })}
      </label>
      <div
        className="flex overflow-hidden gap-2.5 items-center px-6 py-6 mt-14 w-full text-2xl rounded-xl border border-solid border-white max-w-[649px] text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-2.5 justify-center items-center self-stretch my-auto">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="nameInput"
            placeholder={placeholder}
            className="self-stretch my-auto bg-transparent border-none outline-none"
            aria-label="Enter your name"
          />
        </div>
      </div>
      <div
        className="pt-80">
        <button
          onClick={addData}
          className="flex flex-row items-center justify-center md:w-[435.32px] md:h-[105px] bg-transparent border border-primary text-primary rounded-full px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
          <p className="text-xl md:text-[34px]"> {t("qa.see_leader_board", { lng: savedlanguages.qa })}</p>
          <img
            src={AppAsset.RightArrowIcon}
            className="w-[38px] h-[38px]" />
        </button>
      </div>
    </div>
  );
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, rank }) => {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-14 text-8xl font-bold text-center text-white max-md:mt-10 max-md:text-4xl">
        {score}
      </div>
      <div className="mt-14 text-4xl text-center leading-[58px] text-white w-[562px] max-md:mt-10 max-md:max-w-full">
        <span className="font-medium">{t("qa.congrats_your_one_of_the", { lng: savedlanguages.qa })}</span>{" "}
        {
          rank &&
          parseInt(rank) <= 10 &&
          <><span className="font-bold ">{t("qa.top_10", { lng: savedlanguages.qa })}</span>{" "}</>
        }
        {
          savedlanguages.qu == "en" ?
            <span
              className="font-medium">
              {t("qa.participants", { lng: savedlanguages.qa })}
            </span> :
            parseInt(rank) <= 10 ?
              <span
                className="font-medium">
                {t("qa.participants", { lng: savedlanguages.qa })}
              </span> : null
        }
      </div>
    </>
  );
};