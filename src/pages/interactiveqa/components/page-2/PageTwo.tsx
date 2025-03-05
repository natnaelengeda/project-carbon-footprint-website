import { useState, useRef, useEffect } from 'react';

import { Oval } from 'react-loader-spinner';

// Axios
import axios from "@/utils/axios";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
import toast from 'react-hot-toast';


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const qs = [
  {
    "_id": "67c5bd67ffd689628c6ec2c2",
    "difficulty": "Easy",
    "translations": [
      {
        "language": "English",
        "question": "What is 'environmental responsibility'?",
        "options": [
          {
            "text": "Ignoring nature",
            "isCorrect": false,
            "explanation": "Environmental responsibility involves taking action to protect nature, not ignoring it.",
            "_id": "67c5bd67ffd689628c6ec2c4"
          },
          {
            "text": "Taking action to protect and preserve the environment",
            "isCorrect": true,
            "explanation": "Environmental responsibility means being accountable for your actions and their impact on the natural world.",
            "_id": "67c5bd67ffd689628c6ec2c5"
          },
          {
            "text": "Overusing resources",
            "isCorrect": false,
            "explanation": "Overusing resources depletes them and harms the environment, which is not responsible.",
            "_id": "67c5bd67ffd689628c6ec2c6"
          },
          {
            "text": "Focusing only on profit",
            "isCorrect": false,
            "explanation": "Environmental responsibility considers sustainability alongside economic interests.",
            "_id": "67c5bd67ffd689628c6ec2c7"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec2c3"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec1bd",
    "difficulty": "Easy",
    "translations": [
      {
        "language": "English",
        "question": "What is one simple way to reduce home energy use?",
        "options": [
          {
            "text": "Leaving appliances on 24/7",
            "isCorrect": false,
            "explanation": "Leaving appliances running unnecessarily wastes energy.",
            "_id": "67c5bd67ffd689628c6ec1bf"
          },
          {
            "text": "Turning off lights when leaving a room",
            "isCorrect": true,
            "explanation": "Turning off lights and electronics when not in use conserves energy and lowers electricity bills.",
            "_id": "67c5bd67ffd689628c6ec1c0"
          },
          {
            "text": "Using old light bulbs",
            "isCorrect": false,
            "explanation": "Old light bulbs consume more energy compared to modern energy-efficient bulbs.",
            "_id": "67c5bd67ffd689628c6ec1c1"
          },
          {
            "text": "Keeping electronics plugged in all the time",
            "isCorrect": false,
            "explanation": "Keeping electronics plugged in leads to phantom power consumption.",
            "_id": "67c5bd67ffd689628c6ec1c2"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec1be"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec190",
    "difficulty": "Easy",
    "translations": [
      {
        "language": "English",
        "question": "Which of these actions lowers your personal carbon footprint?",
        "options": [
          {
            "text": "Using disposable items",
            "isCorrect": false,
            "explanation": "Disposable items contribute to waste and require energy-intensive production, increasing carbon emissions.",
            "_id": "67c5bd67ffd689628c6ec192"
          },
          {
            "text": "Recycling and reusing items",
            "isCorrect": true,
            "explanation": "Recycling and reusing reduce resource consumption and waste, thereby lowering overall emissions.",
            "_id": "67c5bd67ffd689628c6ec193"
          },
          {
            "text": "Taking long flights frequently",
            "isCorrect": false,
            "explanation": "Frequent air travel has a high carbon footprint compared to other forms of transportation.",
            "_id": "67c5bd67ffd689628c6ec194"
          },
          {
            "text": "Driving alone every day",
            "isCorrect": false,
            "explanation": "Single-occupancy vehicle trips contribute significantly to carbon emissions.",
            "_id": "67c5bd67ffd689628c6ec195"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec191"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec0d3",
    "difficulty": "Easy",
    "translations": [
      {
        "language": "English",
        "question": "What does 'sustainable transport' mean?",
        "options": [
          {
            "text": "Transport relying solely on fossil fuels",
            "isCorrect": false,
            "explanation": "Sustainable transport minimizes the use of fossil fuels.",
            "_id": "67c5bd67ffd689628c6ec0d5"
          },
          {
            "text": "Transport methods that minimize environmental impact",
            "isCorrect": true,
            "explanation": "Sustainable transport includes low-emission options such as public transit, biking, and electric vehicles.",
            "_id": "67c5bd67ffd689628c6ec0d6"
          },
          {
            "text": "Expensive, inefficient travel",
            "isCorrect": false,
            "explanation": "Sustainable transport aims to be cost-effective and efficient.",
            "_id": "67c5bd67ffd689628c6ec0d7"
          },
          {
            "text": "Air travel without offsets",
            "isCorrect": false,
            "explanation": "Sustainable transport includes offsetting emissions and reducing reliance on high-emission travel.",
            "_id": "67c5bd67ffd689628c6ec0d8"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec0d4"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec1a2",
    "difficulty": "Medium",
    "translations": [
      {
        "language": "English",
        "question": "What does 'green energy' refer to?",
        "options": [
          {
            "text": "Energy from polluting sources",
            "isCorrect": false,
            "explanation": "Green energy comes from clean sources that do not pollute the environment.",
            "_id": "67c5bd67ffd689628c6ec1a4"
          },
          {
            "text": "Energy from renewable and clean sources",
            "isCorrect": true,
            "explanation": "Green energy is derived from sources such as solar, wind, and hydro that produce little to no pollution.",
            "_id": "67c5bd67ffd689628c6ec1a5"
          },
          {
            "text": "Energy that is very expensive",
            "isCorrect": false,
            "explanation": "Green energy costs are decreasing, and in many cases, they are competitive with fossil fuels.",
            "_id": "67c5bd67ffd689628c6ec1a6"
          },
          {
            "text": "Energy that causes noise pollution",
            "isCorrect": false,
            "explanation": "Green energy sources like solar and wind produce minimal noise compared to fossil fuel power plants.",
            "_id": "67c5bd67ffd689628c6ec1a7"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec1a3"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec151",
    "difficulty": "Medium",
    "translations": [
      {
        "language": "English",
        "question": "What is one benefit of using energy-efficient appliances?",
        "options": [
          {
            "text": "They use more electricity",
            "isCorrect": false,
            "explanation": "Energy-efficient appliances consume less power, reducing overall electricity use.",
            "_id": "67c5bd67ffd689628c6ec153"
          },
          {
            "text": "They save energy and reduce bills",
            "isCorrect": true,
            "explanation": "Energy-efficient appliances consume less power, saving money and reducing overall energy use.",
            "_id": "67c5bd67ffd689628c6ec154"
          },
          {
            "text": "They require more maintenance",
            "isCorrect": false,
            "explanation": "Energy-efficient appliances are generally designed to be long-lasting and do not require excessive maintenance.",
            "_id": "67c5bd67ffd689628c6ec155"
          },
          {
            "text": "They produce more waste",
            "isCorrect": false,
            "explanation": "Energy-efficient appliances help reduce environmental waste through lower energy consumption.",
            "_id": "67c5bd67ffd689628c6ec156"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec152"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec112",
    "difficulty": "Medium",
    "translations": [
      {
        "language": "English",
        "question": "What is one benefit of solar panels?",
        "options": [
          {
            "text": "They make noise",
            "isCorrect": false,
            "explanation": "Solar panels operate silently and do not produce noise pollution.",
            "_id": "67c5bd67ffd689628c6ec114"
          },
          {
            "text": "They produce clean electricity from sunlight",
            "isCorrect": true,
            "explanation": "Solar panels generate electricity using sunlight without combustion, which means they produce little to no emissions.",
            "_id": "67c5bd67ffd689628c6ec115"
          },
          {
            "text": "They require fossil fuels",
            "isCorrect": false,
            "explanation": "Solar panels do not rely on fossil fuels to generate electricity.",
            "_id": "67c5bd67ffd689628c6ec116"
          },
          {
            "text": "They pollute the air",
            "isCorrect": false,
            "explanation": "Solar panels do not emit air pollutants while generating electricity.",
            "_id": "67c5bd67ffd689628c6ec117"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec113"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec1d8",
    "difficulty": "Medium",
    "translations": [
      {
        "language": "English",
        "question": "What is the main goal of energy conservation?",
        "options": [
          {
            "text": "To increase energy use",
            "isCorrect": false,
            "explanation": "Energy conservation aims to reduce, not increase, energy use.",
            "_id": "67c5bd67ffd689628c6ec1da"
          },
          {
            "text": "To use less energy for the same tasks",
            "isCorrect": true,
            "explanation": "Energy conservation focuses on reducing energy consumption while still accomplishing needed tasks.",
            "_id": "67c5bd67ffd689628c6ec1db"
          },
          {
            "text": "To waste electricity",
            "isCorrect": false,
            "explanation": "Conserving energy means reducing waste, not increasing it.",
            "_id": "67c5bd67ffd689628c6ec1dc"
          },
          {
            "text": "To power more devices",
            "isCorrect": false,
            "explanation": "Energy conservation is about efficiency, not simply increasing power availability.",
            "_id": "67c5bd67ffd689628c6ec1dd"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec1d9"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec055",
    "difficulty": "Difficult",
    "translations": [
      {
        "language": "English",
        "question": "What does the term 'greenhouse gas' refer to?",
        "options": [
          {
            "text": "Gases that cool the planet",
            "isCorrect": false,
            "explanation": "Greenhouse gases trap heat in the atmosphere and contribute to global warming, not cooling.",
            "_id": "67c5bd67ffd689628c6ec057"
          },
          {
            "text": "Gases that trap heat in the atmosphere",
            "isCorrect": true,
            "explanation": "Greenhouse gases trap heat in the Earth's atmosphere, which contributes to global warming.",
            "_id": "67c5bd67ffd689628c6ec058"
          },
          {
            "text": "Inert gases with no climate effect",
            "isCorrect": false,
            "explanation": "Greenhouse gases have a significant impact on climate, unlike inert gases.",
            "_id": "67c5bd67ffd689628c6ec059"
          },
          {
            "text": "Gases that only come from natural sources",
            "isCorrect": false,
            "explanation": "Greenhouse gases come from both natural sources and human activities.",
            "_id": "67c5bd67ffd689628c6ec05a"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec056"
      }
    ]
  },
  {
    "_id": "67c5bd67ffd689628c6ec25f",
    "difficulty": "Difficult",
    "translations": [
      {
        "language": "English",
        "question": "What is 'urban green space'?",
        "options": [
          {
            "text": "Concrete areas",
            "isCorrect": false,
            "explanation": "Urban green spaces refer to natural areas, not paved or built-up areas.",
            "_id": "67c5bd67ffd689628c6ec261"
          },
          {
            "text": "Parks and natural areas in cities",
            "isCorrect": true,
            "explanation": "Urban green spaces, such as parks, help improve air quality and offer recreational benefits.",
            "_id": "67c5bd67ffd689628c6ec262"
          },
          {
            "text": "High-rise buildings",
            "isCorrect": false,
            "explanation": "Buildings do not constitute urban green spaces; they are built environments.",
            "_id": "67c5bd67ffd689628c6ec263"
          },
          {
            "text": "Shopping malls",
            "isCorrect": false,
            "explanation": "Malls are commercial spaces and do not provide environmental benefits like green spaces do.",
            "_id": "67c5bd67ffd689628c6ec264"
          }
        ],
        "_id": "67c5bd67ffd689628c6ec260"
      }
    ]
  }
]

export default function PageTwo({ setPage, setQuestions }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [lanuage, setLanguage] = useState<string>("english");

  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);

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
      setQuestions(qs);
      setPage(3);

    } catch (error) {
      console.error(error);
    }
  }

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
  }

  const changeToAmharic = () => {
    setLanguage("amharic");
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
          <p className='text-2xl md:text-[63px] 3xl:text-[130px]'>Welcome to Interactive</p>
          <p className='text-2xl md:text-[63px] 3xl:text-[130px]'>Q/A</p>
        </div>

        {/* Choose Language */}
        <div className='flex items-center justify-center mt-[78px] 3xl:mt-[120px] text-white'>
          <p className='text-[44px] 3xl:text-[90px]'>Choose language</p>
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
                  <span>Start Q/A</span>
                  <img
                    src={AppAsset.RightArrowIcon}
                  />
                </>
              ) :
                (
                  <>
                    <span>Loading...</span>
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