import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// Socket.io
import { useSocket } from '@/context/SocketProvider';

// Styles
import "./styles.css";

// Icons
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";



export default function Devools() {
  const [opened, setOpened] = useState(false);
  const [activeBorder, setActiveBorder] = useState(false);

  const socket = useSocket();

  // React Language Packaged;
  const [sectionLanguage, setSectionLanguage] = useState({
    carbon: "en",
    pledge: "en"
  });

  // Border Activate
  const activateBorder = () => {
    setActiveBorder((prevState) => {
      if (!prevState) {
        // Add global border rule
        const style = document.createElement('style');
        style.id = 'global-border-style';
        style.innerHTML = `* { border: 1px solid black; }`;
        document.head.appendChild(style);
      } else {
        // Remove global border rule
        const style = document.getElementById('global-border-style');
        if (style) {
          document.head.removeChild(style);
        }
      }
      return !prevState;
    });
  }

  const checkSocket = () => {
    console.log("Checking Socket");
    socket?.emit("checkSocket", 'Hello');
  }

  const changeLanguage = () => {
    const defaultLanguage = JSON.stringify({
      carbon: "en",
      pledge: "en"
    });

    const savedlanguages = JSON.parse(localStorage.getItem("language") || defaultLanguage);
    console.log(savedlanguages);

    if (savedlanguages.carbon == "en") {
      changeLanguageFF("carbon", "am");
    } else {
      changeLanguageFF("carbon", "en");
    }
  }

  // Change language for a specific section
  const changeLanguageFF = (section: string, lang: string) => {
    const updatedLanuages = { ...sectionLanguage, [section]: lang };
    setSectionLanguage(updatedLanuages);
    localStorage.setItem("language", JSON.stringify(updatedLanuages));
  }


  useEffect(() => {
    socket?.on("connectionWorks", () => {
      toast.success("Socket Connection Works");
    });
  }, [socket]);

  return (
    <>
      {
        opened ?
          <div
            style={{
              zIndex: 1000,
            }}
            className='fixed top-1/4 md:top-1/1 right-0 flex flex-row items-start'>
            <button
              onClick={() => setOpened(!opened)}
              className='bg-white border-4 md:border-8 border-r-0 border-primary px-5 py-3'>
              <FaAngleDoubleRight className="text-3xl text-primary" />
            </button>

            <div
              className=' bg-primary w-24 md:w-40 h-[26rem] md:h-[40rem] z-999 p-1 md:p-3'>

              <div
                className='w-full h-full bg-white'>
                <button
                  onClick={activateBorder}
                  className={`w-full h-16 md:h-20 border-b-4 md:border-b-8  text-xl md:text-3xl ${activeBorder ? "bg-primary text-white font-bold" : "border-primary"}`}>
                  Border
                </button>

                <button
                  onClick={checkSocket}
                  className={`w-full h-16 md:h-20 border-b-4 md:border-b-8  text-xl md:text-2xl ${activeBorder ? "bg-primary text-white font-bold" : "border-primary"}`}>
                  Check Socket
                </button>

                <button
                  onClick={changeLanguage}
                  className={`w-full h-16 md:h-20 border-b-4 md:border-b-8  text-xl md:text-2xl ${activeBorder ? "bg-primary text-white font-bold" : "border-primary"}`}>
                  Change Language
                </button>
              </div>
            </div>
          </div> :
          <div className='fixed top-1/4 right-0 md:top-1/1'>
            <button
              onClick={() => setOpened(!opened)}
              className='bg-white border-4 md:border-8 border-primary px-5 py-3'>
              <FaAngleDoubleLeft className="text-3xl text-primary" />
            </button>
          </div>
      }
    </>
  )
}
