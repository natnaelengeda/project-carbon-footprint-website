// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import {
  Tooltip,
  Radio,
  RadioGroup,
} from '@mantine/core';

// Components
import NavigationComponent from '../../components/NavigationComponent';

// Language
import { useTranslation } from 'react-i18next';

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

  const [value, setValue] = useState("appartment");

  // React Language Packaged;
  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();
  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);

  const func = () => {
    return true;
  }

  // Check if the user have already selected
  useEffect(() => {
    if (carbonData!.housing_type!.length > 0) {
      setValue(carbonData.housing_type!);
    }
  }, []);

  useEffect(() => {
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
            <p>
              {t("carbon.what_is_your_housing_type", { lng: savedlanguages.carbon })}
            </p>
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
                  color={`var(--main-color)`}
                  value="appartment"
                  size={width > 768 ? "xl" : "md"}
                  label={t("carbon.apartment", { lng: savedlanguages.carbon })} />
                <Radio
                  iconColor=""
                  color={`var(--main-color)`}
                  value="condo"
                  size={width > 768 ? "xl" : "md"}
                  label={t("carbon.condo", { lng: savedlanguages.carbon })} />

                <Radio
                  iconColor=""
                  color={`var(--main-color)`}
                  value="villa"
                  size={width > 768 ? "xl" : "md"}
                  label={t("carbon.villa", { lng: savedlanguages.carbon })} />

                <Radio
                  iconColor=""
                  color={`var(--main-color)`}
                  value="hut"
                  size={width > 768 ? "xl" : "md"}
                  label={t("carbon.hut", { lng: savedlanguages.carbon })} />

              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          func={func}
          prevPage={2}
          nextPage={4} />
      </div>
    </PagesLayout>
  )
}
