import { useEffect, useState } from "react";

// Axios
import axios from "@/utils/axios";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Skeleton
import Skeleton from "react-loading-skeleton";

// Toast
import toast from "react-hot-toast";

// Utils
import { generateRandomId } from "@/utils/idGenerator";
import { generateRandomName } from "@/utils/randomNameGenerator";
import { useDispatch } from "react-redux";
import {
  addCarbonFootPrint,
  addName,
} from "@/state/pledge";

// Translation
import { useTranslation } from "react-i18next";
import Layout from "../Layout";

// Types
import { ISkipUser } from "../../Pledge";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSkipUserData: React.Dispatch<React.SetStateAction<ISkipUser | []>>;
}

interface UserType {
  _id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function PageOne({ setPage, setSkipUserData }: Props) {
  // React Language Packaged;
  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const id = generateRandomId();
  const newName = generateRandomName();

  const fetchPrevUsers = () => {
    axios.get(`/api/v1/endUser/last24hours`)
      .then((response) => {
        setLoading(false);
        setSearchData(response.data);
      })
  }

  const updateSearchInput = (e: any) => {
    setSearchName(e.target.value);
    fetchUsersByName(e.target.value);
  }

  const fetchUsersByName = (name: string) => {
    axios.get(`/api/v1/endUser/last24hours?search=${name}`)
      .then((response) => {
        setSearchData(response.data);
      }).catch((error) => {
        console.error(error);
      });
  }

  const getUserDetails = (id: string) => {
    axios.get(`/api/v1/carbonFootPrint/endUser/${id}`)
      .then((response) => {
        const data = response.data.data;
        console.log(selected);

        var sum = 0;
        sum = data.dietAndFood + data.foodWastage + data.householdEnergy + data.transportationMode + data.wasteDisposal + data.waterusage;

        localStorage.setItem("use_type_pledge", "skip");
        localStorage.setItem("numberOfTrees", data.numberOfTrees);
        localStorage.setItem("pledgeTotalCalculation", sum.toString());

        setSelected(true);

        setSkipUserData({
          householdEnergy: data.householdEnergy,
          transportationMode: data.transportationMode,
          dietAndFood: data.dietAndFood,
          foodWastage: data.foodWastage,
          wasteDisposal: data.wasteDisposal,
          waterUsage: data.waterUsage
        })
        localStorage.setItem("use_type_pledge", "user");

        dispatch(
          addCarbonFootPrint({
            data: sum
          }));

        dispatch(
          addName({
            id: selectedUser?._id ?? "3123",
            name: selectedUser?.name ?? "Abebe"
          })
        )


      }).catch((error) => {
        console.error(error);
      })
  }

  const getSkipedUserDestails = () => {
    try {
      axios.get("/api/v1/reports/overview/carbonAndPledgeSummary")
        .then((response) => {
          const data = response.data.pledge[0];
          console.log(data.wasteDisposal)



          const sum = data.dietAndFood + data.foodWastage + data.householdEnergy + data.transportationMode + data.wasteDisposal + data.waterUsage

          localStorage.setItem("use_type_pledge", "skip");
          localStorage.setItem("numberOfTrees", data.numberOfTrees);
          localStorage.setItem("pledgeTotalCalculation", sum);

          setSkipUserData({
            householdEnergy: data.householdEnergy,
            transportationMode: data.transportationMode,
            dietAndFood: data.dietAndFood,
            foodWastage: data.foodWastage,
            wasteDisposal: data.wasteDisposal,
            waterUsage: data.waterUsage
          })

          dispatch(
            addName({
              id: id,
              name: newName,
            }));

          setPage(2);
        })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPrevUsers();
  }, []);

  return (
    <Layout>
      <div
        className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[220px] gap- md:gap-[63px] relative z-10 text-white">

        {/* Title */}
        <div
          className="h-auto flex flex-col items-center justify-start gap-2 md:gap-[55px]">
          <img
            src={AppAsset.Logo}
            className="md:[150px] h-auto object-contain" />

          <div className="md:w-[40rem] mx-auto">
            <p
              style={{
                lineHeight: 1
              }}
              className="text-2xl md:text-[64px] font-semibold text-center md:leading-10">
              {t("pledge.welcomePledge", { lng: savedlanguages.pledge })}
            </p>
          </div>

          <p
            className="text-2xl md:text-[36px] font-semibold text-center md:leading-10">
            {t("pledge.chooseUsername", { lng: savedlanguages.pledge })}
          </p>
        </div>

        {/* Description */}
        <div className="w-full md:w-[643px] pt-10">
          <p className="text-[#B7B7B7] text-center text-xl md:text-[32px]">
            {t("pledge.recentUsers", { lng: savedlanguages.pledge })}
          </p>
        </div>


        {/* Bottom Content */}
        <div
          className="w-full md:w-[650px] h-auto flex flex-col items-start justify-start px-2 py-7 gap-3 md:gap-[70px]">

          {/* Search */}
          <div
            className="w-full h-14 md:w-[650px] md:h-[74px] mx-auto relative">
            <input
              value={searchName}
              onChange={updateSearchInput}
              type="text"
              className="relative w-full h-14 md:h-[74px] rounded-[10px] text-black border border-[#B8B8B8] pl-16 md:px-24 text-lg md:text-[30px] focus:outline-primary" />
            {/* Search Icon */}
            <div className="absolute top-0 left-0 h-full w-14 flex flex-row items-center pl-6">
              <img
                src={AppAsset.SearchIcon}
                className="w-[30px] h-[30px] object-contain" />
            </div>
          </div>

          {/* Other Users */}
          <div
            className="w-full h-full flex flex-col items-start justify-start pt-5 gap-3 md:gap-[40px]">

            {/* Users */}
            {
              !loading &&
              searchData &&
              searchData
                .slice(0, 3)
                .map((user: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedUser(user)
                        // fetchUsersByName(user._id);
                      }}
                      className="w-full h-14 md:h-[82px] bg-[#35D36A1A] flex flex-row items-center justify-between border border-primary rounded-[10px] px-4 md:px-[38px]">
                      <p
                        className="text-lg md:text-[30px] font-semibold">
                        {user.name}
                      </p>

                      <img
                        className="w-6 md:w-[36px] h-auto object-contain"
                        src={
                          selectedUser ?
                            selectedUser!.userId == user.userId ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon :
                            AppAsset.RadioOffIcon
                        } />
                    </div>
                  );
                })
            }

            {
              !loading &&
              searchData &&
              searchData.length == 0 &&
              <p
                className="w-full text-center text-lg md:text-[30px] font-semibold text-[#B7B7B7]">
                No user found
              </p>
            }

            <LoadingSkeleton
              loading={loading} />

          </div>
        </div>

        {/* Next Page Button */}
        <div className="w-full md:w-[652px] h-auto flex flex-col items-start justify-start gap-4 md:gap-[50px] px-2 md:px-0">

          {/* Continue Button */}
          <button
            onClick={() => {
              if (selectedUser) {
                getUserDetails(selectedUser._id);
                dispatch(
                  addName({
                    id: selectedUser._id,
                    name: selectedUser.name,
                  }));

                setPage(2);
              } else {
                toast.error("Please select a user to continue or click skip");
              }
            }}
            className="w-full h-16 md:h-[88.9px] bg-primary rounded-full flex flex-row items-center justify-end gap-28 md:gap-[189px] pr-6 md:pr-[51px]">
            <p
              className="text-xl md:text-[30px] font-semibold text-white">
              {t("pledge.continue", { lng: savedlanguages.pledge })}
            </p>
            <img
              className="w-7 md:w-[36px] h-auto object-contain"
              src={AppAsset.RightArrowIcon} />

          </button>

          {/* Skip Button */}
          <button
            onClick={() => {
              getSkipedUserDestails();
            }}

            className="w-full h-16 md:h-[88.9px] bg-white border border-primary rounded-full flex flex-row items-center justify-center gap-28 md:gap-[189px] pr-6 md:pr-[51px]">
            <p
              className="text-xl md:text-[30px] font-semibold text-primary">
              {t("pledge.skip", { lng: savedlanguages.pledge })}
            </p>
          </button>
        </div>
      </div>
    </Layout>

  )
}


const LoadingSkeleton = ({ loading }: { loading: boolean }) => {
  return (
    <div
      style={{
        display: loading ? "flex" : "none"
      }}
      className="w-full h-auto flex flex-col items-center justify-start gap-3 md:gap-[40px]">
      {

        [1, 2, 3,].map((index) => {
          return (
            <div
              key={index}
              className="w-full h-14 md:h-[82px] bg-[#35D36A1A] flex flex-row items-center justify-between border border-primary rounded-[10px] px-4 md:px-[38px]">
              <div className="w-20 h-8">
                <Skeleton
                  className="w-full h-full" />
              </div>
            </div>
          );
        })
      }

    </div>
  );
}