import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// State
import { useDispatch, useSelector } from "react-redux";
import { addName, CarbonState } from "@/state/carbon";

// Axios
import axios from "@/utils/axios";
// Components
import NavComponent from "../../../NavComponent";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Background
import DefaultBackground from "../DefaultBackground";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Utils
import { generateRandomId } from "@/utils/idGenerator";
import { generateRandomName } from "@/utils/randomNameGenerator";
import { useTranslation } from "react-i18next";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const [name, setName] = useState<string>("");
  const [existingNames, setExistingNames] = useState<string[]>([]); // Store fetched names

  const id = generateRandomId();
  const newName = generateRandomName();

  const room = localStorage.getItem("room");

  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const dispatch = useDispatch();
  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);

  const socket = useSocket();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    socket?.emit("name-change-server-1", JSON.stringify({
      name: e.target.value,
      id: id,
      room: room,
    }));

    setName(e.target.value);
    dispatch(addName({
      id: id,
      name: e.target.value,
    }));
  };

  const fetchNamesFromDatabase = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/v1/endUser/today");

      if (!response.data || !Array.isArray(response.data.names)) {
        console.warn("Received an empty or invalid response from the database.");
        setExistingNames([]);
        return;
      }

      setExistingNames(response.data.names || []);
      console.log("Fetched names from the database:", response.data.names);
    } catch (error) {
      console.error("Error fetching names:", error);
      setExistingNames([]);
    }
  };

  const generateUniqueName = (baseName: string): string => {
    let uniqueName = baseName;
    let counter = 1;

    while (existingNames.includes(uniqueName)) {
      uniqueName = `${baseName}-${String(counter).padStart(4, "0")}`;
      counter++;
    }

    return uniqueName;
  };

  const func = () => {
    if (name.length > 0) {
      // Check if the user-provided name already exists
      const uniqueName = generateUniqueName(name);

      if (uniqueName !== name) {
        toast.info(`The name "${name}" already exists. Using "${uniqueName}" instead.`);
        console.log("Name already exists. Generated unique name:", uniqueName);

        socket?.emit("name-change-server-1", JSON.stringify({
          name: uniqueName,
          id: id,
          room: room,
        }));

        dispatch(addName({
          id: id,
          name: uniqueName,
        }));

        setName(uniqueName);
      }
    } else {
      // Generate a unique name if no name is provided
      const uniqueName = generateUniqueName(newName);
      toast.info(`No name provided. Generated unique name: "${uniqueName}".`);
      console.log("Generated unique name:", uniqueName);

      socket?.emit("name-change-server-1", JSON.stringify({
        name: uniqueName,
        id: id,
        room: room,
      }));

      dispatch(addName({
        id: id,
        name: uniqueName,
      }));

      setName(uniqueName);
    }

    return true;
  };

  useEffect(() => {
    fetchNamesFromDatabase();
  }, []);

  useEffect(() => {
    if (carbonData.name) {
      setName(carbonData.name);
    }
  }, [carbonData.name]);

  return (
    <DefaultBackground>
      <ToastContainer />
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        <div className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
          <div className="relative w-full md:w-[35rem]">
            <img
              src={AppAsset.UserBlackIcon}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8"
            />
            <input
              type="text"
              placeholder={t("carbon.enter_your_name", { lng: savedlanguages.carbon })}
              value={name}
              onChange={onNameChange}
              className="w-full h-20 rounded-lg border-2 border-white bg-transparent text-xl text-white placeholder-white pl-14 pr-2"
            />
          </div>
        </div>

        <div className="absolute bottom-0 right-0">
          <NavComponent
            setPage={setPage}
            nextPage={2}
            prevPage={0}
            currPage={1}
            func={func}
            id={id}
            name={newName}
          />
        </div>
      </div>
    </DefaultBackground>
  );
}
