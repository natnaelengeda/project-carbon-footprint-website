import { useState, useRef, useEffect } from 'react';

import { Oval } from 'react-loader-spinner';

// Axios
import axios from "@/utils/axios";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PageTwo({ setPage, setQuestions }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [lanuage, setLanguage] = useState<string>("english");

  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  const [sectionLanguage, setSectionLanguage] = useState({
    carbon: "en",
    pledge: "en",
    qa: "en"
  });

  // React Language Packaged;
  const { t } = useTranslation();

  // Change language for a specific section
  const changeLanguage = (section: string, lang: string) => {
    const updatedLanuages = { ...sectionLanguage, [section]: lang };
    setSectionLanguage(updatedLanuages);
    localStorage.setItem("language", JSON.stringify(updatedLanuages));
  }



  const fetchQuestions = () => {
    setLoading(true);
    try {
      axios.post("/api/v1/question/rnd", {
        language: lanuage == "amharic" ? "Amharic" : "English"
      })
        .then((response) => {
          const questions = response.data;

          if (questions.length == 0) {
            toast("No Questions Found");
          } else {
            toast.success("Questions Succefully Fetched")
            setQuestions(response.data);
            localStorage.setItem("questions", JSON.stringify(response.data));
            setPage(3);
          }
          setLoading(false);

        }).catch((error) => {
          setLoading(false);
          console.error(error);
          toast.error("Questions Fetch Unsuccessful");
        })

      // setQuestions(qs);
      // setPage(3);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const defaultLanguage = JSON.stringify({
      carbon: "en",
      pledge: "en",
      qa: "en"
    });

    const savedlanguages = JSON.parse(localStorage.getItem("language") || defaultLanguage);

    if (savedlanguages) {
      if (savedlanguages.qa == "am") {
        setLanguage("amharic")
      }
      setSectionLanguage(savedlanguages);
    }


  }, []);

  useEffect(() => {
    if (isKeyPressed.current) {
      console.log(key);

      switch (key!) {
        case "ArrowUp":
          if (lanuage !== "english") {
            setLanguage("english");
          }
          break;
        case "ArrowDown":
          if (lanuage != "amharic") {
            setLanguage("amharic");
          }
          break;
        case "Enter":
          fetchQuestions();
          break;
      }
    }
  }, [isKeyPressed.current]);


  useEffect(() => {
    const handleKeyDown = (event: any) => {
      isKeyPressed.current = true;
      setKey(event.key);
    };

    const handleKeyUp = () => {
      isKeyPressed.current = false;
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const changeToEnglish = () => {
    setLanguage("english");
    changeLanguage("qa", "en")
  }

  const changeToAmharic = () => {
    setLanguage("amharic");
    changeLanguage("qa", "am")
  }

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className='relative w-full h-full flex flex-col items-center justify-start pt-5'>


      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />

      <div className='relative w-full h-full flex flex-col items-center justify-start z-10  md:pt-[140px] 3xl:pt-[550px]'>

        {/* Logo */}
        <div
          className='absolute top-0 left-0 z-20 pl-[99px] pt-[74px]'>
          <img
            style={{
              width: "250px",
              height: "167px",
              objectFit: "contain"
            }}
            src={AppAsset.Logo}
            className='' />
        </div>

        {/* Title */}
        <div
          className='relative flex flex-col items-center justify-start gap-1 md:gap-10 3xl:gap-32 font-semibold text-white'>
          <p className='text-2xl md:text-[63px] 3xl:text-[130px]'>{t("qa.welcome_to_interactive", { lng: savedlanguages.qa })}</p>
          <p className='text-2xl md:text-[63px] 3xl:text-[130px]'>{t("qa.qa", { lng: savedlanguages.qa })}</p>
        </div>

        {/* Choose Language */}
        <div className='flex items-center justify-center mt-[78px] 3xl:mt-[120px] text-white'>
          <p className='text-[44px] 3xl:text-[90px]'>{t("qa.choose_language", { lng: savedlanguages.qa })}</p>
        </div>

        {/* Choice */}
        <div
          className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] px-3 md:px-0 text-white mt-[107px]">
          <CustomButton
            functions={changeToEnglish}
            language={lanuage}
            currLanuage="english"
            viewLanguage="English" />

          <CustomButton
            functions={changeToAmharic}
            language={lanuage}
            currLanuage="amharic"
            viewLanguage="አማርኛ" />

        </div>

        {/* Continue Page */}
        <div className='w-full h-full flex flex-row items-center justify-end pr-[165px] 3xl:pr-[250px]'>
          <button
            onClick={fetchQuestions}
            className={`text-[34px] 3xl:text-[60px] font-semibold text-white flex flex-row items-center justify-center gap-2 rounded-full min-w-[300px] h-[100px] 3xl:min-w-[500px] 3xl:min-h-[150px]  px-5 transition-all ${loading ? "bg-gray-300" : "bg-primary"}`}
            disabled={loading}>
            {
              !loading ? (
                <>
                  <span>{t("qa.start_qa", { lng: savedlanguages.qa })}</span>
                  <img
                    src={AppAsset.RightArrowIcon}
                  />
                </>
              ) :
                (
                  <>
                    <span>{t("qa.loading", { lng: savedlanguages.qa })}...</span>
                    <Oval
                      height="50"
                      width="50"
                      color="#efefef"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </>
                )
            }
          </button>
        </div>
      </div>
    </div>
  )
}


const CustomButton = ({ functions, language, currLanuage, viewLanguage }: any) => {
  return (
    <button
      onClick={functions}
      className={`w-full h-20 md:w-[650px] md:h-[88px] 3xl:w-[800px] 3xl:h-[150px]  flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] border-2 border-[#35D36A] rounded-lg ${language == currLanuage ? "bg-[#35D36A] " : ""}`}>
      <img
        src={language == currLanuage ? AppAsset.RadioOneWHite : AppAsset.RadioOffIcon}
        className="w-7 h-auto object-contain" />
      <p
        className={`text-2xl md:text-[36px] 3xl:text-[50px] ${language == currLanuage ? "font-bold" : ""}`}>
        {viewLanguage}
      </p>
    </button>
  );
}