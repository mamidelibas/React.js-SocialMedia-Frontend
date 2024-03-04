import NavMenu from "./LeftSidebarComponents/NavMenu";
import Messages from "./LeftSidebarComponents/Messages";
import { Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Cooke from "js-cookie";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateResult, setUpdateResult] = useState({
    success: null,
    message: "",
  });

  const deleteProfile = async () => {
    await axios
      .delete("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${Cookie.get("user_token")}`,
        },
      })
      .then(() => {
        dispatch({
          type: "LOGOUT",
        });
        Cookie.remove("user_token");
        router.push("/login");
      })
      .catch((err) => {
        setUpdateResult({
          success: false,
          message: "Hesabınız silinirken bir hata oluştu",
        });
      });
  };

  const updateProfile = async () => {
    await axios
      .put(
        "http://localhost:3000/users",
        {
          name: name ? name : undefined,
          lastname: lastname ? lastname : undefined,
          username: username ? username : undefined,
          currentPassword: currentPassword ? currentPassword : undefined,
          password: newPassword ? newPassword : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        setUpdateResult({
          success: true,
          message: response.data.message,
        });

        setTimeout(() => {
          dispatch({
            type: "LOGOUT",
          });
          Cookie.remove("user_token");
          router.push("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setUpdateResult({
          success: false,
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <NavMenu />
      <Divider />
      <Messages />
      <Divider />
      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => {
            setModalOpened(true);
          }}
        >
          <SettingsIcon
            style={{
              color: "rgb(87 83 78)",
              fontSize: "1.8rem",
            }}
          />{" "}
          <span className="text-stone-600 text-lg">Settings</span>
        </div>
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => {
            dispatch({
              type: "LOGOUT",
            });
            Cookie.remove("user_token");
            router.push("/login");
          }}
        >
          <LogoutIcon
            style={{
              color: "rgb(194 65 12)",
              fontSize: "1.8rem",
            }}
          />{" "}
          <span className="text-orange-700">Logout</span>
        </div>
      </div>

      <Modal
        open={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setName("");
          setLastname("");
          setUsername("");
          setCurrentPassword("");
          setNewPassword("");
          setUpdateResult({
            success: null,
            message: "",
          });
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            backgroundColor: "white",
            padding: 4,
          }}
        >
          <div className="p-5 flex flex-col gap-5">
            <h2 className="text-xl text-center">Update Your Profile</h2>
            <div className="text-center">
              {updateResult.success === true ? (
                <div className="text-green-500">{updateResult.message}</div>
              ) : (
                <div className="text-red-500">{updateResult.message}</div>
              )}
            </div>

            <div className="flex gap-3">
              <TextField
                id="outlined-basic"
                placeholder="First Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basic"
                value={lastname}
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
                placeholder="Last Name"
                style={{
                  width: "100%",
                }}
              />
            </div>

            <TextField
              id="outlined-basic"
              placeholder="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={{
                width: "100%",
              }}
            />

            <div className="flex gap-3">
              <TextField
                id="outlined-basic"
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basic"
                type="password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                placeholder="New Password"
                style={{
                  width: "100%",
                }}
              />
            </div>

            <Button
              variant="contained"
              onClick={() => {
                updateProfile();
              }}
              style={{
                backgroundColor: "green",
              }}
            >
              Update
            </Button>

            <div className="flex justify-end">
              <Button
                variant="contained"
                onClick={() => {
                  deleteProfile();
                }}
                style={{
                  backgroundColor: "red",
                }}
              >
                Delete your account
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
