import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Chip from "@mui/material/Chip";

export default function Messages() {
  const messages = [
    {
      senderFullName: "Canberk Beren",
      avatar: "C",
      message: "Lorem ipsum dolor sit amet...",
      count: 1,
    },
    {
      senderFullName: "John Doe",
      avatar: "J",
      message: "Hello today is awful!",
      count: 3,
    },
    {
      senderFullName: "King Steve",
      avatar: "K",
      message: "How are you?",
    },
    {
      senderFullName: "Melisa Silv",
      avatar: "J",
      message: "How are you doing?",
    },
    {
      senderFullName: "Alex Gonzales",
      avatar: "J",
      message: "May you call me today?",
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <span className="font-bold text-xl">Message</span>
        <span className="text-red-600 font-bold">See All</span>
      </div>
      {messages.map((message) => {
        return (
          <div className="flex justify-between mt-10">
            <div className="flex items-center gap-3">
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {message.avatar}
              </Avatar>
              <div className="">
                <span className="font-bold">{message.senderFullName}</span>
                <p>{message.message}</p>
              </div>
            </div>

            <div className="">
              {message.count && <Chip label={message.count} color="error" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
