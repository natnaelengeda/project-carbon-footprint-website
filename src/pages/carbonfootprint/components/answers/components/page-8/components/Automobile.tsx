import { useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'
import { Slider } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { addTransportationMode, addTransportCategory } from '@/state/carbon';

export default function Automobile() {
  const [selectedType, setSelectedType] = useState<string>("gas-powered");

  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const buttons = [
    { id: 0, name: "Gas Powered", type: "gas-powered", extra: "Gas Powered Personal Vehicle - Automobile" },
    { id: 1, name: "Electric Powered", type: "electric-powered", extra: "Electric Powered Personal Vehicle - Automobile" },
    { id: 2, name: "Hybrid", type: "hybrid", extra: "Hybrid Personal Vehicle - Automobile" },
  ];

  return (
    <div className='w-full h-full'>

      {/* Title */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white">
        <div
          className="flex flex-row items-center justify-start gap-5">
          <div
            className="w-10 h-3 bg-purple-500">
          </div>
          <p className="text-white text-[60px]">Transportation Mode</p>
        </div>
        <p className="text-[40px]">Personal Vehicle - Automobile</p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16">
        {
          buttons &&
          buttons.map((button: { id: number, name: string, type: string, extra: string }, index: number) => {
            return (
              <RadioButtonsComponent
                key={index}
                id={index}
                index={index}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                type={button.type}
                text={button.name}
                extraNote={button.extra}
                currentlySelected={currentlySelected}
                setCurrentlySelected={setCurrentlySelected}
              />
            );
          })
        }
      </div>


    </div>
  )
}

const RadioButtonsComponent = ({ id, setSelectedType, selectedType, type, text, currentlySelected, setCurrentlySelected }: any) => {
  const [kms, setKms] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const dispatch = useDispatch();
  const socket = useSocket();
  const room = localStorage.getItem("room");


  const updateSlider1 = (e: any) => {
    setKms(e);

    dispatch(
      addTransportationMode({
        id: 1,
        name: "automobile",
        selected: true,
        value: 1,
      })
    );

    dispatch(
      addTransportCategory({
        parent_id: 1,
        category_id: 1,
        name: type,
        value: e,
        frequency: days,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      type: type,
      slider1: e,
      slider2: days,
      page: "page-8",
      vehicle: "automobile",
    }));

    // dispatch(
    //   addTransportCategory({
    //     parent_id: 1,
    //     category_id: id + 1,
    //     name: id == 0 ? "gas-powered" :
    //       id == 1 ? "electric-powered" :
    //         "hybrid",
    //     value: e,
    //     frequency: days,
    //   })
    // );
  }

  const updateSlider2 = (e: any) => {
    setDays(e);

    dispatch(
      addTransportationMode({
        id: 1,
        name: "automobile",
        selected: true,
        value: 1,
      })
    );

    dispatch(
      addTransportCategory({
        parent_id: 1,
        category_id: 1,
        name: type,
        value: kms,
        frequency: e,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      type: type,
      slider1: kms,
      slider2: e,
      page: "page-8",
      vehicle: "automobile",
    }));

    // dispatch(
    //   addTransportCategory({
    //     parent_id: 1,
    //     category_id: id + 1,
    //     name: id == 0 ? "gas-powered" :
    //       id == 1 ? "electric-powered" :
    //         "hybrid",
    //     value: kms,
    //     frequency: e,
    //   })
    // );
  }

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-14 text-white">

      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => {
            setSelectedType(type);
            setCurrentlySelected(id);
          }}
          src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
          className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
          {text}
        </p>
      </div>

      {/* Days per week*/}
      <div
        style={{
          display: currentlySelected == id ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many kilometers per day?
        </p>

        <Slider
          value={kms}
          onChange={updateSlider1}
          className='w-full'
          color="#35D36A"
          size="xl"
          min={0}
          max={50}
          marks={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 20, label: '20' },
            { value: 25, label: '25' },
            { value: 30, label: '30' },
            { value: 35, label: '35' },
            { value: 40, label: '40' },
            { value: 45, label: '45' },
            { value: 50, label: '50' },
          ]}


        />
      </div>

      {/* Hours Per Day*/}
      <div
        style={{
          display: currentlySelected == id ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many days per week?
        </p>

        <Slider
          value={days}
          onChange={updateSlider2}
          color="#35D36A"
          size="xl"
          className='w-full'
          min={0}
          max={7}
          marks={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
          ]}

        />
      </div>
    </div>
  );
}
