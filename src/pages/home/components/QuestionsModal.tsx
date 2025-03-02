import { useState } from 'react';

// Mantine
import { Modal, Button, TextInput } from '@mantine/core';

// React Router
import { useNavigate } from 'react-router-dom';

// Socket.io
import { useSocket } from '@/context/SocketProvider';


interface IPageProps {
  opened: boolean;
  close: () => void;
}

export default function QuestionsModal({ opened, close }: IPageProps) {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const socket = useSocket();

  const Sumbit = (page: string) => {
    try {
      localStorage.setItem("page_type", "carbonfootprint");
      localStorage.setItem("page_mode", page);
      localStorage.setItem("room", code);

      if (page == "questions") {
        socket?.emit("page_mode", JSON.stringify({
          page_type: "carbonfootprint",
          page_mode: "questions",
          unique_code: code
        }));

        navigate("/carbonfootprint/questions");
      } else {
        socket?.emit("page_mode", JSON.stringify({
          page_type: "carbonfootprint",
          page_mode: "answers",
          unique_code: code
        }));

        navigate("/carbonfootprint/answers");
      }

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="xl"
      title={<h1 className='text-4xl font-bold'>Choose Page Mode</h1>}>

      <div
        className="flex flex-col gap-5 mt-5">
        <div className='flex flex-col pb-10'>
          <TextInput
            value={code}
            onChange={(e) => setCode(e.target.value)}
            size="xl"
            label="Enter Unique Code"
            description="Enter the unique for Communication" />
        </div>
        <Button
          onClick={() => Sumbit("questions")}
          disabled={code.length == 0}
          color={code.length == 0 ? "gray" : "#35D36A"}
          fullWidth
          size="xl"
          radius="md"
          className=" text-white text-2xl">
          <span className='font-bold text-3xl' >Questions</span>
        </Button>
        <Button
          onClick={() => Sumbit("answers")}
          disabled={code.length == 0}
          color={code.length == 0 ? "gray" : "#35D36A"}
          fullWidth
          radius="md"
          size="xl"
          className=" text-white text-2xl">
          <span className='font-bold text-3xl' >Answers</span>
        </Button>
      </div>
    </Modal >
  )
}
