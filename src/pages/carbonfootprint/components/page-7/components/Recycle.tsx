import { useEffect, useState } from 'react'

// AppAsset
import AppAsset from '@/core/AppAsset';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';
import { useDispatch } from 'react-redux';
import { addWaste, deleteWaste } from '@/state/carbon';

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Recycle({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<string>("yes");

  const [paperSelected, setPaperSelected] = useState<boolean>(false);
  const [plasticSelected, setPlasticSelected] = useState<boolean>(false);
  const [bottleSelected, setBottleSelected] = useState<boolean>(false);
  const [metalSelected, setMetalSelected] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Update Main State
  useEffect(() => {
    if (selected) {
      dispatch(
        addWaste({
          id: 2,
          name: "recycling-habits",
          option: "yes",
          value: 1,
        })
      )
    } else {
      dispatch(
        deleteWaste({
          id: 2
        })
      )
    }
  }, [selected]);

  useEffect(() => {
    if (selectedValue == "yes") {
      dispatch(
        addWaste(
          {
            id: 2,
            name: "recycling-habits",
            option: "yes",
            value: 1,
          }
        )
      )
    } else if (selectedValue == "no") {
      dispatch(
        addWaste(
          {
            id: 2,
            name: "recycling-habits",
            option: "no",
            value: 1,
          }
        )
      )
    }
  }, [selectedValue]);

  // Update Everything
  useEffect(() => {
    dispatch(
      addWaste({
        id: 2,
        name: "recycling-habits",
        option: "yes",
        value: 1,
        paper: paperSelected,
        plastic: plasticSelected,
        bottle: bottleSelected,
        metal: metalSelected,
      }));
  }, [paperSelected, plasticSelected, bottleSelected, metalSelected]);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-5'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location='recycling-habits'
          text="Recycling Habits" />


        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "recycling-habits" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>
          {/* Yes */}
          <div className='flex flex-row items-center justify-start gap-3 md:gap-5'>
            <img
              onClick={() => {
                setSelectedValue("yes");
              }}
              src={selectedValue == "yes" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-6 md:w-[28px] h-auto md:h-[28px] object-contain' />
            <p className='text-xl md:text-[26px]'>Yes</p>
          </div>

          {/* Yes Forms */}
          <div
            style={{
              display: selectedValue == "yes" ? "flex" : "none"
            }}
            className='w-full flex flex-col items-start justify-start gap-2 pl-6'>

            {/* Paper */}
            <div
              className='flex flex-row items-center justify-start gap-2 md:gap-[30px]'>
              <img
                onClick={() => {
                  setPaperSelected(!paperSelected);
                }}
                src={paperSelected ?
                  AppAsset.CheckedIcon :
                  AppAsset.UncheckedIcon}
                className="w-5 h-auto md:w-[36px] md:h-[36px] object-contain" />
              <p
                className='text-xl md:text-[30px] font-normal'>
                Paper
              </p>
            </div>

            {/* Plastic */}
            <div
              className='flex flex-row items-center justify-start gap-2 md:gap-[30px]'>
              <img
                onClick={() => {
                  setPlasticSelected(!plasticSelected);
                }}
                src={plasticSelected ?
                  AppAsset.CheckedIcon :
                  AppAsset.UncheckedIcon}
                className="w-5 h-auto md:w-[36px] md:h-[36px] object-contain" />
              <p
                className='text-xl md:text-[30px] font-normal'>
                Plastic
              </p>
            </div>

            {/* Bottle */}
            <div
              className='flex flex-row items-center justify-start gap-2 md:gap-[30px]'>
              <img
                onClick={() => {
                  setBottleSelected(!bottleSelected);
                }}
                src={bottleSelected ?
                  AppAsset.CheckedIcon :
                  AppAsset.UncheckedIcon}
                className="w-5 h-auto md:w-[36px] md:h-[36px] object-contain" />
              <p
                className='text-xl md:text-[30px] font-normal'>
                Bottle
              </p>
            </div>

            {/* Metal */}
            <div
              className='flex flex-row items-center justify-start gap-2 md:gap-[30px]'>
              <img
                onClick={() => {
                  setMetalSelected(!metalSelected);
                }}
                src={metalSelected ?
                  AppAsset.CheckedIcon :
                  AppAsset.UncheckedIcon}
                className="w-5 h-auto md:w-[36px] md:h-[36px] object-contain" />
              <p
                className='text-xl md:text-[30px] font-normal'>
                Metal
              </p>
            </div>

          </div>

          {/* No */}
          <div className='flex flex-row items-center justify-start gap-3 md:gap-5'>
            <img
              onClick={() => {
                setSelectedValue("no");
              }}
              src={selectedValue == "no" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-6 md:w-[28px] md:h-[28px] h-auto object-contain' />
            <p className='text-xl md:text-[26px]'>No</p>
          </div>

        </div>
      </div>
    </div>
  )
}
