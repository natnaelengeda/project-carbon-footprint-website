import { useRef, useState } from "react";

// State
import { useSelector } from "react-redux";

import { PledgeState } from "@/state/pledge";

// Axios
import axios from "@/utils/axios";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Components
import Layout from "../Layout";

// On Screen Keyboard
import Keyboard from "react-simple-keyboard";
import { useTranslation } from "react-i18next";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [step, setStep] = useState("name");
  const keyboard = useRef<any>(null);

  const [keyboardOn, setKeyboardOn] = useState<boolean>(false);
  const [layoutName, setLayoutName] = useState("default");

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);

  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");



  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
    if (button === "{enter}") {
      setKeyboardOn(false)
    }
  };

  const changeInput = (e: any) => {

    if (step == "name") {
      setName(e);
    }

    if (step == "email") {
      setEmail(e);
    }

    if (step == "phone") {
      setPhoneNumber(e);
    }
  }



  const submitFunction = () => {
    console.log(name, email, phoneNumber);
    setPage(5);

    if (name == '' && email == '' && phoneNumber == '') {
      setPage(5);
    } else {
      axios.post("/", {
        id: pledge.id,
        name: name,
        email: email,
        phoneNumber: phoneNumber
      }).then((response) => {
        console.log(response.data);
        setPage(11);

      })
    }
  }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-start relative z-10 text-white">
        {/* Logo */}
        <div
          className='absolute top-0 left-0 z-20 pl-[50px] pt-[74px]'>
          <img
            style={{
              width: "250px",
              height: "167px",
              objectFit: "contain"
            }}
            src={AppAsset.Logo}
            className='' />
        </div>

        {/* User Name */}
        <div className="absolute top-0 right-0 z-20 pr-[50px] pt-[120px] flex flex-row items-center justify-end gap-5">
          <img
            src={AppAsset.UserBlackIcon}
            className="w-7 md:w-[40px] object-contain" />
          <p className="text-lg md:text-4xl text-white">{pledge.name ?? "Abebe"}</p>
        </div>

        {/* Main */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start pt-10 md:pt-[400px] px-4 md:px-0">

          {/* Text */}
          <div
            className="w-full md:w-[649px]">
            <p
              className="text-3xl md:text-[42px] md:leading-10 font-semibold">
              {t("pledge.contactDetails", { lng: savedlanguages.pledge })}
            </p>
          </div>

          {/* Form */}
          <div
            className="w-full md:w-[649px] h-auto flex flex-col items-center justify-start pt-10 md:pt-[118px] gap-8 md:gap-[103px]">

            {/* Name */}
            <div
              className="w-full flex flex-col items-start justify-start gap-3">
              <label
                className="text-lg md:text-[24px] font-normal">
                {t("pledge.name", { lng: savedlanguages.pledge })}
              </label>

              <div
                className="relative w-full h-12 md:h-[74px]">
                <input
                  onFocus={() => {
                    setKeyboardOn(true);
                    setStep("name");
                    keyboard.current.clearInput();
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="E.g. John Doe"
                  className="bg-transparent relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
                <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                  <img
                    src={AppAsset.UserBlackIcon}
                    className=" w-5 md:w-[30px] h-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div
              className="w-full flex flex-col items-start justify-start gap-3">
              <label
                className="text-lg md:text-[24px] font-normal">
                {t("pledge.email", { lng: savedlanguages.pledge })}
              </label>

              <div
                className="relative w-full h-12 md:h-[74px]">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => {
                    setKeyboardOn(true);
                    setStep("email");
                    keyboard.current.clearInput();
                  }}
                  type="text"
                  placeholder="example@example.com"
                  className="bg-transparent relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
                <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                  <img
                    src={AppAsset.MailIcon}
                    className=" w-5 md:w-[30px] h-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div
              className="w-full flex flex-col items-start justify-start gap-3">
              <label
                className="text-lg md:text-[24px] font-normal">
                {t("pledge.phone", { lng: savedlanguages.pledge })}
              </label>

              <div
                className="relative w-full h-12 md:h-[74px]">
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => {
                    setKeyboardOn(true);
                    setStep("phone");
                    keyboard.current.clearInput();
                  }}
                  type="text"
                  placeholder="0911001415"
                  className="bg-transparent relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
                <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                  <img
                    src={AppAsset.PhoneIcon}
                    className=" w-5 md:w-[30px] h-auto object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full h-auto flex flex-col items-center justify-start pt-20 md:pt-[374px]">
            <button
              onClick={submitFunction}
              className='md:w-[407px] md:h-[110px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
              <p
                className='text-lg md:text-[34px] font-semibold'>
                {t("pledge.finishPledging", { lng: savedlanguages.pledge })}
              </p>

            </button>
          </div>

          <div
            style={{
              display: keyboardOn ? "flex" : "none"
            }}
            className="w-full absolute bottom-0 left-0 text-black">
            <Keyboard
              keyboardRef={r => (keyboard.current = r)}
              layoutName={layoutName}
              onChange={changeInput}
              onKeyPress={onKeyPress}
              onRender={() => console.log("Rendered")} />
          </div>
        </div>

      </div>
    </Layout>
  )
}
