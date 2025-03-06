// AppAsset
import AppAsset from '@/core/AppAsset';


// Components
import Layout from '../Layout';
import { ChangeEvent, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PledgeState } from '@/state/pledge';


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ setPage }: Props) {
  const numberOfTrees = localStorage.getItem("numberOfTrees");
  const pledgeTotalCalculation = localStorage.getItem("pledgeTotalCalculation");

  const [option, setOption] = useState<boolean>(true);
  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  console.log(savedlanguages.pledge)
  console.log(option);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);


  return (
    <Layout>
      <div className='w-full h-full flex flex-col items-center justify-start relative z-10'>
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

        <div className='w-full h-full flex flex-col items-center justify-start'>

          {/* Banner Image */}
          <div
            className='pt-5 md:pt-[88px]'>
            <img
              src={AppAsset.BannerTen}
              className='w-60 h-full md:w-[500px] md:h-auto object-contain' />
          </div>

          {/* Text */}
          <div
            className='w-full h-auto flex flex-col items-center justify-start pt-12 md:pt-[52px]'>

            <div
              className='w-full md:w-[738px] h-auto flex flex-col items-center'>
              <p
                style={{
                  lineHeight: 1.1
                }}
                className='text-2xl md:text-[56px] font-bold text-center md:leading-[50px] text-white'>
                {/* Great! You Just Saved <span className='text-primary'>{parseInt(numberOfTrees ?? "").toFixed(0)} out of {(pledge.carbon_footprint / 167).toFixed(0)} Trees</span> from Burning. */}
                {savedlanguages.pledge === "en" ? (
                  <>
                    {t("pledge.carbonFootprintComparison", { lng: savedlanguages.pledge })} <span className='text-primary'>{parseInt(pledgeTotalCalculation ?? "0").toFixed(0)} kg CO2 - e</span> {t("pledge.carbonFoot2", { lng: savedlanguages.pledge })}  <span className='text-primary'> {(parseInt(pledgeTotalCalculation ?? "0") / 167).toFixed(0)} {t("pledge.trrres", { lng: savedlanguages.pledge })} </span>.
                  </>
                ) : (
                  <>
                      {t("pledge.carbonFootprintComparison", { lng: savedlanguages.pledge })} <span className='text-primary'>{parseInt(pledgeTotalCalculation ?? "0").toFixed(0)} kg CO2 - e</span> {t("pledge.carbonFoot2", { lng: savedlanguages.pledge })}  <span className='text-primary'> {(parseInt(pledgeTotalCalculation ?? "0") / 167).toFixed(0)} {t("pledge.trrres", { lng: savedlanguages.pledge })} </span> {t("pledge.carbonFoot3", { lng: savedlanguages.pledge })}
                  </>
                )}
              </p>
            </div>

            <div
              className='w-full md:w-[638px] h-auto flex items-center justify-center pt-10 md:pt-[55px]'>
              <p
                className='text-white text-lg md:text-4xl text-center'>
                {t("pledge.pledgeQuestion", { lng: savedlanguages.pledge })}
              </p>
            </div>
          </div>

          {/* Options */}
          <Options
            // setPage={setPage}
            treeCount={parseInt(numberOfTrees ?? "0")}
            setOption={setOption}
            pledgeTotalCalculation={pledgeTotalCalculation} />

          {/* Navigation */}
          <div
            className="w-full flex items-center justify-center pt-20 md:pt-[165px]">
            <button
              onClick={() => {
                // handlePledge();
                setPage(4)
              }}
              className='md:w-[283.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
              <p className='text-lg md:text-[34.56px] font-semibold'>
                {t("pledge.continue", { lng: savedlanguages.pledge })}
              </p>
              <img
                src={AppAsset.RightArrowIcon}
                className="w-6 md:w-10 h-auto object-contain" />
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}

interface OProps {
  treeCount: number;
  // handleTreeCountUpdate: (value: number) => void;
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
  pledgeTotalCalculation: any,
}

function Options({ treeCount, setOption, pledgeTotalCalculation }: OProps) {
  console.log(treeCount);
  const [selectedOption, setSelectedOption] = useState<boolean>(true);
  const [input, setInput] = useState("");
  const keyboard = useRef<any>(null);
  const [keyboardOn, setKeyboardOn] = useState<boolean>(false);

  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };


  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
    if (button === "{enter}") {
      setKeyboardOn(false)
    }
  };

  const changeInput = (e: any) => {
    console.log(e);
    if (e > 100) {
      return null;
    } else {
      setInput(e);
    }
  }

  return (
    <div
      className='w-full md:w-[662px] h-auto flex flex-col items-center justify-start pt-14 md:pt-[114px] px-4 md:px-0'>

      <div
        className='w-full flex flex-col items-start justify-start gap-4 md:gap-[80px] text-white'>
        {/* Yes */}
        <div
          className='flex flex-row items-center justify-start gap-2 md:gap-5'>
          <img
            onClick={() => {
              setSelectedOption(true);
              setOption(true);
              setKeyboardOn(false);
            }}
            src={selectedOption ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
            className='w-5 md:w-[36px] h-auto object-contain' />
          <p className='text-lg md:text-[30px] font-normal'>{t("pledge.pledgeYes", { lng: savedlanguages.pledge })} {(parseInt(pledgeTotalCalculation ?? "0") / 167).toFixed(0)} {t("pledge.pledgeYes2", { lng: savedlanguages.pledge })}</p>
        </div>

        {/* No */}
        <div className='w-full h-auto flex flex-col items-start justify-start gap-1 md:gap-[37px]'>
          <div
            className='flex flex-row items-center justify-start gap-2 md:gap-5'>
            <img
              onClick={() => {
                setSelectedOption(false);
                setOption(false);
                setKeyboardOn(true);
              }}
              src={!selectedOption ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-5 md:w-[36px] h-auto object-contain' />
            <p className='text-lg md:text-[30px] font-normal'>{t("pledge.pledgeMore", { lng: savedlanguages.pledge })} {input} {t("pledge.pledgeMore2", { lng: savedlanguages.pledge })}</p>
          </div>

          <div
            style={{
              display: !selectedOption ? 'flex' : 'none'
            }}
            className='w-full pt-10'>

            <input
              value={input}
              // onFocus={ }
              onChange={e => onChangeInput(e)}
              className='w-full h-20 bg-transparent rounded-sm border border-gray-200 text-3xl text-white px-5'
              placeholder='E.g 18' />

          </div>
        </div>
      </div>
      <div
        style={{
          display: keyboardOn ? "flex" : "none"
        }}
        className="w-full absolute bottom-0 left-0 ">
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          layoutName={layoutName}
          onChange={changeInput}
          onKeyPress={onKeyPress}
          onRender={() => console.log("Rendered")}
        />
      </div>
    </div>
  )
}
