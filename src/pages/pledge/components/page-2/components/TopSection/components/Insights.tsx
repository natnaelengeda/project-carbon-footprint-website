import { useTranslation } from "react-i18next";

export default function Insights() {
  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const insights = [
    {
      icon: '<svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="width: 55px; height: 55px"> <path d="M25.1302 45.2891H38.0289C44.5952 45.2891 47.8785 45.2891 49.476 43.5491C49.9242 43.0607 50.2714 42.4954 50.4992 41.8826C51.3105 39.6993 49.7162 36.9488 46.5271 31.4482M25.1302 45.2891L31.8169 40.1629M25.1302 45.2891L31.8169 50.4154M42.6638 24.784L35.8287 12.9936C32.9036 7.9478 31.441 5.42493 29.3966 4.81427C28.3601 4.50462 27.2496 4.50462 26.2131 4.81427C24.1687 5.42493 22.7061 7.9478 19.781 12.9936M42.6638 24.784L34.6936 21.7843M42.6638 24.784L43.9682 16.6737M15.9176 19.6577L8.85212 31.8455C5.8727 36.9851 4.38298 39.5547 5.02073 41.6183C5.26896 42.4218 5.71888 43.1544 6.3311 43.7526C7.90385 45.2891 10.9714 45.2891 17.1064 45.2891M15.9176 19.6577L17.1589 27.7771M15.9176 19.6577L7.92425 22.6005" stroke="#FF71B8" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
      text: `${t("pledge.renewablePower", { lng: savedlanguages.pledge })}`
    },
    {
      icon: '<svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="width: 55px; height: 55px"> <path d="M33.5242 24.0625C33.5242 24.0625 27.795 28.6458 27.795 34.375" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.045 34.375H41.545" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.3396 34.375L17.5069 42.5464C18.043 46.2988 18.311 48.175 19.6034 49.2958C20.8957 50.4167 22.791 50.4167 26.5815 50.4167H29.0143C32.805 50.4167 34.7002 50.4167 35.9925 49.2958C37.2847 48.175 37.5529 46.2988 38.0889 42.5464L39.2563 34.375" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M23.3588 18.4764C26.2218 15.6134 26.2218 10.9715 23.3588 8.10853C19.0389 3.78856 9.53501 4.65256 9.53501 4.65256C9.53501 4.65256 8.67101 14.1565 12.991 18.4764C15.854 21.3394 20.4959 21.3394 23.3588 18.4764Z" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M34.2156 23.3666C36.6697 25.8205 40.6485 25.8205 43.1024 23.3666C46.8053 19.6637 46.0646 11.5175 46.0646 11.5175C46.0646 11.5175 37.9184 10.7769 34.2156 14.4797C31.7616 16.9338 31.7616 20.9125 34.2156 23.3666Z" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M23.2145 19.4805C23.2145 19.4805 27.7978 25.2096 27.7978 34.3747" stroke="#35D36A" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
      text: `${t("pledge.transportOptions", { lng: savedlanguages.pledge })}`
    },
    {
      icon: '<svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="width: 55px; height: 55px"> <path d="M20.9168 8.53322C11.7318 10.6174 4.87512 18.8315 4.87512 28.6471C4.87512 29.8184 4.97275 30.9668 5.1603 32.0846M20.9168 8.53322L14.0418 5.73047M20.9168 8.53322L18.6251 14.8971M43.9813 37.8138C45.3535 35.0523 46.1251 31.9398 46.1251 28.6471C46.1251 18.4275 38.6923 9.94381 28.9376 8.30731M43.9813 37.8138L50.7085 33.2305M43.9813 37.8138L40.396 30.9388M8.34826 40.1055C12.0482 45.633 18.3492 49.2721 25.5001 49.2721C30.7826 49.2721 35.6011 47.2862 39.2501 44.0203M8.34826 40.1055H16.3335M8.34826 40.1055V48.1263" stroke="#F5A864" stroke-width="3.4375" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
      text: `${t("pledge.reduceWaste", { lng: savedlanguages.pledge })}`
    },
    {
      icon: '<svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="width: 55px; height: 55px"> <path d="M9.17331 39.0028L6.41515 22.5496C5.99811 20.0619 5.78961 18.8181 6.45731 18.0028C7.12504 17.1875 8.35225 17.1875 10.8067 17.1875H44.7893C47.2436 17.1875 48.4708 17.1875 49.1386 18.0028C49.8062 18.8181 49.5976 20.0619 49.1808 22.5496L46.4225 39.0028C45.5084 44.4563 45.0512 47.1829 43.1849 48.7999C41.3188 50.4167 38.6283 50.4167 33.248 50.4167H22.3479C16.9674 50.4167 14.2772 50.4167 12.4109 48.7999C10.5446 47.1829 10.0875 44.4563 9.17331 39.0028Z" stroke="#F86CFF" stroke-width="3.4375"></path> <path d="M40.396 17.1862C40.396 10.2251 34.753 4.58203 27.7918 4.58203C20.8307 4.58203 15.1876 10.2251 15.1876 17.1862" stroke="#F86CFF" stroke-width="3.4375"></path> </svg>',
      text: `${t("pledge.localFood", { lng: savedlanguages.pledge })}`
    },
    {
      icon: '<svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="width: 55px; height: 55px"> <path d="M46.9465 30.6104C44.2205 33.3359 39.0915 33.23 31.2275 33.23C26.1679 33.23 22.0658 29.1217 22.0632 24.0622C22.0632 16.2034 21.9572 11.0715 24.6831 8.34613C27.4089 5.62074 28.6129 5.73109 40.6879 5.73109C41.8548 5.72609 42.4422 7.1373 41.6172 7.96242L35.3999 14.1802C33.8219 15.7584 33.8175 18.3171 35.3958 19.8951C36.974 21.4731 39.5329 21.4733 41.1114 19.8955L47.3303 13.6792C48.1555 12.8543 49.567 13.4415 49.5619 14.6083C49.5619 26.6813 49.6724 27.8852 46.9465 30.6104Z" stroke="#6692FE" stroke-width="3.4375"></path> <path d="M31.2354 33.2292L17.0922 47.3724C14.5609 49.9036 10.4569 49.9036 7.92558 47.3724C5.39427 44.841 5.39427 40.7369 7.92558 38.2058L22.0688 24.0625" stroke="#6692FE" stroke-width="3.4375" stroke-linecap="round"></path> <path d="M12.9225 42.3945H12.902" stroke="#6692FE" stroke-width="4.58333" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
      text: `${t("pledge.unplugDevices", { lng: savedlanguages.pledge })}`
    }
  ];


  return (
    <div className='w-full h-full flex flex-col items-start justify-start'>
      <section className="mx-auto my-0 w-[850px] max-md:p-5 max-md:w-[90%] max-sm:p-4 max-sm:w-[95%]">
        <h2 className="mb-14 text-5xl font-bold text-center text-white max-md:text-4xl max-sm:mb-8 max-sm:text-3xl">
          {t("pledge.insights", { lng: savedlanguages.pledge })}
        </h2>
        <ul className="flex flex-col gap-11 max-sm:gap-6">
          {insights.map((insight, index) => (
            <InsightItem
              key={index}
              icon={insight.icon}
              text={insight.text}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

interface InsightItemProps {
  icon: string;
  text: string;
}

const InsightItem: React.FC<InsightItemProps> = ({ icon, text }) => {
  return (
    <li className="flex gap-6 items-center max-sm:gap-4">
      <div dangerouslySetInnerHTML={{ __html: icon }} />
      <h3 className="text-3xl font-bold text-white max-md:text-2xl max-sm:text-lg">
        {text}
      </h3>
    </li>
  );
};
