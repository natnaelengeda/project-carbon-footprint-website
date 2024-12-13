// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import {
  Tooltip,
  Radio,
  RadioGroup,
} from '@mantine/core';

// State

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  addHousingType,
  CarbonState
} from '@/state/carbon';

// AppAsset
import AppAsset from '@/core/AppAsset';
import { useEffect, useState } from 'react';


interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ setPage }: Props) {
  const width = window.innerWidth;

  const [value, setValue] = useState("house");

  // State
  const dispatch = useDispatch();
  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);


  // Check if the user have already selected
  useEffect(() => {
    if (carbonData!.housing_type!.length > 0) {
      setValue(carbonData.housing_type!);
    }
  }, []);

  useEffect(() => {
    console.log(value);
    dispatch(addHousingType({
      housing_type: value,
    }))
  }, [value]);

  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section  */}
        <div className='flex flex-col items-center justify-start gap-5'>

          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerThree}
              className="w-[550px] h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-2xl md:text-[48px] pt-20">
            <p>What is your housing type?</p>
            <Tooltip
              label="What is the type of house you live in?">
              <img
                src={AppAsset.InformationCircleIcon}
                className='w-[36px] h-[36px] object-contain' />
            </Tooltip>

          </div>

          {/* Radio Input */}
          <div
            className="w-full flex flex- items-start justify-start gap-5 pt-2 md:pt-10 px-10 md:px-4">
            <RadioGroup
              value={value}
              onChange={setValue}
              required>
              <div
                className='flex flex-col gap-5'>
                <Radio
                  iconColor=""
                  color="#35D36A"
                  value="house"
                  size={width > 768 ? "xl" : "md"}
                  label="House" />
                <Radio
                  iconColor=""
                  color="#35D36A"
                  value="appartment"
                  size={width > 768 ? "xl" : "md"}
                  label="Appartment" />
                <Radio
                  iconColor=""
                  color="#35D36A"
                  value="condo"
                  size={width > 768 ? "xl" : "md"}
                  label="Condo" />
                <Radio
                  iconColor=""
                  color="#35D36A"
                  value="villa"
                  size={width > 768 ? "xl" : "md"}
                  label="Villa" />
                <Radio
                  iconColor=""
                  color="#35D36A"
                  value="hut"
                  size={width > 768 ? "xl" : "md"}
                  label="Hut" />
              </div>
            </RadioGroup>
            {/* <Radio.Group
              name="housing-type">
              <Group
                className='flex flex-col'>
                <div
                  className='flex flex-col gap-5'>
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="house"
                    size={width > 768 ? "xl" : "md"}
                    label="House" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="appartment"
                    size={width > 768 ? "xl" : "md"}
                    label="Appartment" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="condo"
                    size={width > 768 ? "xl" : "md"}
                    label="Condo" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="villa"
                    size={width > 768 ? "xl" : "md"}
                    label="Villa" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="hut"
                    size={width > 768 ? "xl" : "md"}
                    label="Hut" />
                </div>
              </Group>
            </Radio.Group> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className='w-full h-80 flex items-start justify-end px-5 md:px-40 gap-3 pb-10 md:pb-0'>
          <button
            onClick={() => {
              setPage(2);
            }}
            className='w-10 h-10 md:w-[100px] md:h-[100px] rounded-full border border-primary flex items-center justify-center p-2 md:p-0'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-20 h-auto object-contain md:w-[40.56px] md:h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(4);
            }}
            className='md:w-[221.32px] md:h-[100px] rounded-lg md:rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-2 '>
            <p className='text-lg md:text-[34.56px] font-semibold'>Next</p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-6 md:w-10 h-auto object-contain" />
          </button>
        </div>

      </div>
    </PagesLayout>
  )
}
