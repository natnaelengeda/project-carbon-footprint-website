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
  addDiet,
  addHouseholdEnegryCategory,
  addHouseholdEnergy,
  addName,
  addTransportationMode,
  addTransportCategory,
  addWaste,
  addWaterUsage,
  updateFoodWastage
} from "@/state/pledge";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface UserType {
  _id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function PageOne({ setPage }: Props) {

  // State
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState([]);
  // const [sumOldData, setSumOldData] = useState<number>(0);

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
        const values = response.data.value;
        const data = response.data.data;

        var sum = 0;
        sum = data.dietAndFood + data.foodWastage + data.householdEnergy + data.transportationMode + data.wasteDisposal + data.waterusage;

        dispatch(
          addCarbonFootPrint({
            data: sum
          }));

        console.log(sum)

        const houseHoldEnergy = values.householdEnergy;
        const transportationMode = values.transportationMode;
        const diet = values.dietAndFood;
        const waste = values.wasteDisposal;
        const foodWastage = values.foodWastage;
        const water = values.waterUsage;


        // House Hold Energy
        // Heating and Cooling
        houseHoldEnergy.heatingAndCooling.map((item: any) => {
          if (item.type == "electric") {
            dispatch(
              addHouseholdEnergy({
                id: 1,
                name: "heating-cooling",
                selected: true,
                category: [
                  {
                    id: 1,
                    name: "electric_air_conditioning",
                    selected: true,
                    value: item.hourlyUsagePerDay,
                  },
                ],
              }));
          } else if (item.type == "charcoal") {
            dispatch(
              addHouseholdEnergy({
                id: 1,
                name: "heating-cooling",
                selected: true,
                category: [
                  {
                    id: 1,
                    name: "charcoal",
                    selected: true,
                    value: item.hourlyUsagePerDay,
                  },
                ],
              }));
          }
        });

        // Electric Appliances
        houseHoldEnergy.electricAppliance.map((item: any) => {
          if (item.type == "tv") {
            dispatch(
              addHouseholdEnergy({
                id: 3,
                name: "electric-appliances",
                selected: true,
                value: 1
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 3,
                category_id: 1,
                id: 1,
                name: "electric-appliances-tv",
                selected: true,
                value: item.hourlyUsagePerDay,
              }));
          }

          if (item.type == "washingMachine") {
            dispatch(
              addHouseholdEnergy({
                id: 3,
                name: "electric-appliances",
                selected: true,
                value: 1
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 3,
                category_id: 2,
                id: 2,
                name: "electric-appliances-washing-machine",
                selected: true,
                value: item.hourlyUsagePerDay,
                frequency: item.frequencyperWeek
              }));
          }

          if (item.type == "iron") {
            dispatch(
              addHouseholdEnergy({
                id: 3,
                name: "electric-appliances",
                selected: true,
                value: 1
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 3,
                category_id: 3,
                id: 3,
                name: "electric-appliances-iron-clothes",
                selected: true,
                value: item.hourlyUsagePerDay,
                frequency: item.frequencyperWeek
              })
            );
          }
        });

        // Cooking
        houseHoldEnergy.cooking.map((item: any) => {
          if (item.type == "electric") {
            dispatch(
              addHouseholdEnergy({
                id: 2,
                name: "cooking",
                selected: true,
                value: 1
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 2,
                category_id: 1,
                id: 1,
                name: "cooking-electric-stove",
                selected: true,
                value: item.hourlyUsagePerDay,
              })
            );
          }
        })

        // LighgBulbs
        houseHoldEnergy.lightBulbs.map((item: any) => {
          if (item.type == "incandescent") {
            dispatch(
              addHouseholdEnergy({
                id: 4,
                name: "light-bulbs",
                selected: true,
                value: 1,
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 4,
                category_id: 1,
                id: 1,
                name: "light-bulb-incandecent",
                selected: true,
                value: item.hourlyUsagePerDay,
              }));
          }

          if (item.type == "fluorescent") {
            dispatch(
              addHouseholdEnergy({
                id: 4,
                name: "light-bulbs",
                selected: true,
                value: 1,
              }));

            dispatch(
              addHouseholdEnegryCategory({
                parent_id: 4,
                category_id: 4,
                id: 4,
                name: "light-bulb-florecent",
                selected: true,
                value: item.hourlyUsagePerDay
              })
            );
          }
        })

        // Transportation Mode
        // AutoMobile
        transportationMode.ownAutomobile.map((item: any) => {
          if (item.type == "gasPowered") {
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
                name: "gas-powered",
                value: item.distance,
                frequency: item.frequencyperWeek,
              })
            );
          }

          if (item.type == "electricPowered") {
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
                category_id: 2,
                name: "electric-powered",
                value: item.distance,
                frequency: item.frequencyperWeek,
              })
            );
          }

          if (item.type == "hybrid") {
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
                category_id: 3,
                name: "hybrid-powered",
                value: item.distance,
                frequency: item.frequencyperWeek,
              })
            );
          }
        });

        // Public Transport
        transportationMode.publicTransport.map((item: any) => {

          if (item.type == "bus") {
            dispatch(
              addTransportationMode({
                id: 2,
                name: "public-transport",
                selected: true,
                value: 1,
              }));

            dispatch(
              addTransportCategory({
                parent_id: 2,
                category_id: 1,
                name: "bus",
                value: item.distance,
                frequency: item.frequencyperWeek,
              }));
          }

          if (item.type == "taxi") {
            dispatch(
              addTransportationMode({
                id: 2,
                name: "public-transport",
                selected: true,
                value: 1,
              }));

            dispatch(
              addTransportCategory({
                parent_id: 2,
                category_id: 2,
                name: "taxi",
                value: item.distance,
                frequency: item.frequencyperWeek,
              }));
          }


          if (item.type == "train") {
            dispatch(
              addTransportationMode({
                id: 2,
                name: "public-transport",
                selected: true,
                value: 1,
              }));

            dispatch(
              addTransportCategory({
                parent_id: 2,
                category_id: 3,
                name: "train",
                value: item.distance,
                frequency: item.frequencyperWeek,
              }));
          }


          if (item.type == "ride") {
            dispatch(
              addTransportationMode({
                id: 2,
                name: "public-transport",
                selected: true,
                value: 1,
              }));

            dispatch(
              addTransportCategory({
                parent_id: 2,
                category_id: 4,
                name: "ride",
                value: item.distance,
                frequency: item.frequencyperWeek,
              }));
          }

        });

        // Bicycle
        transportationMode.bicycle.map((item: any) => {
          dispatch(
            addTransportationMode({
              id: 3,
              name: "bicycle",
              selected: true,
              value: item.distance,
              frequency: item.frequencyperWeek,
            })
          );
        });

        // Walking
        transportationMode.walking.map((item: any) => {
          dispatch(
            addTransportationMode({
              id: 4,
              name: 'walking',
              selected: true,
              value: item.distance,
              frequency: item.frequencyperWeek,
            })
          )
        })

        // Diet and Food
        //  Poultry
        if (diet.poultry) {
          dispatch(
            addDiet({
              id: 1,
              name: "poultry",
              selected: true,
              value: diet.poultry.weeklyUsage,
            }));
        }

        // Vegitable
        if (diet.vegetable) {
          dispatch(
            addDiet({
              id: 2,
              name: "vegitable",
              selected: true,
              value: diet.vegetable.weeklyUsage,
            })
          )
        }

        // Meat
        if (diet.meat) {
          dispatch(
            addDiet({
              id: 3,
              name: "meat",
              selected: true,
              value: diet.meat.weeklyUsage,
            })
          )
        }

        // Fish
        if (diet.fish) {
          dispatch(
            addDiet({
              id: 4,
              name: "fish",
              selected: true,
              value: diet.fish.weeklyUsage,
            }))
        }

        // Waste Disposal
        // Weekly Collection
        if (waste.weeklyCollection) {
          dispatch(
            addWaste({
              id: 1,
              name: "weekly-collection",
              value: waste.weeklyCollection.frequency,
            }));
        }

        // Recycling Habits
        if (waste.recycleHabit) {
          if (waste.recycleHabit == "yes") {
            dispatch(
              addWaste(
                {
                  id: 2,
                  name: "recycling-habits",
                  option: "yes",
                  value: 1,
                }));

            dispatch(
              addWaste({
                id: 2,
                name: "recycling-habits",
                option: "yes",
                value: 1,
                paper: waste.recycleMaterials.includes("paper") ? true : false,
                plastic: waste.recycleMaterials.includes("plastic") ? true : false,
                bottle: waste.recycleMaterials.includes("bottle") ? true : false,
                metal: waste.recycleMaterials.includes("metal") ? true : false,
              }));

          } else {
            dispatch(
              addWaste({
                id: 2,
                name: "recycling-habits",
                option: "no",
                value: 1,
              }))
          }
        }

        // Food Wastage
        if (foodWastage) {
          dispatch(updateFoodWastage({
            food_wastage: foodWastage
          }))
        }

        // Water Usage
        // Washing CLothes
        if (water.washingClothes) {
          dispatch(
            addWaterUsage({
              id: 1,
              name: "washing-clothes",
              value: water.washingClothes.frequencyperWeek,
            }))
        }

        // Showers
        if (water.showers) {
          dispatch(
            addWaterUsage({
              id: 2,
              name: "showers",
              value: water.showers.averageDuration,
              frequency: water.showers.daysPerWeek,
            }))
        }

        // Gardeing
        if (water.gardenWatering) {
          dispatch(
            addWaterUsage({
              id: 3,
              name: "gardening-water",
              value: water.gardenWatering.averageDuration,
              frequency: water.gardenWatering.daysPerWeek,
            }))
        }

      }).catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchPrevUsers();
  }, []);

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[220px] gap- md:gap-[63px]">

      {/* Title */}
      <div
        className="h-auto flex flex-col items-center justify-start gap-2 md:gap-[55px]">
        <img
          src={AppAsset.Logo}
          className="md:[150px] h-auto object-contain" />
        <p
          className="text-2xl md:text-[64px] font-semibold text-center md:leading-10">
          Please choose your generated
        </p>
        <p
          className="text-2xl md:text-[64px] font-semibold text-center md:leading-10">
          username?
        </p>
      </div>

      {/* Description */}
      <div className="w-full md:w-[643px]">
        <p className="text-[#B7B7B7] text-center text-xl md:text-[32px]">
          Here are the users created in the last 24 hours
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
            className="relative w-full h-14 md:h-[74px] rounded-[10px] border border-[#B8B8B8] pl-16 md:px-24 text-lg md:text-[30px] focus:outline-primary" />
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
              .slice(0, 5)
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
            Continue
          </p>
          <img
            className="w-7 md:w-[36px] h-auto object-contain"
            src={AppAsset.RightArrowIcon} />

        </button>

        {/* Skip Button */}
        <button
          onClick={() => {
            dispatch(
              addName({
                id: id,
                name: newName,
              }));

            setPage(2);
          }}

          className="w-full h-16 md:h-[88.9px] bg-white border border-primary rounded-full flex flex-row items-center justify-center gap-28 md:gap-[189px] pr-6 md:pr-[51px]">
          <p
            className="text-xl md:text-[30px] font-semibold text-primary">
            Skip
          </p>
        </button>
      </div>
    </div>
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

        [1, 2, 3, 4, 5].map((index) => {
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