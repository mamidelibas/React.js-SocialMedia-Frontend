import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Cookie from "js-cookie";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    test: "",
    test2: "",
  });

  useEffect(() => {
    //let userToken = localStorage.getItem("user_token");
    let userToken = Cookie.get("user_token");

    if (userToken) {
      window.location.href = "/";
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const loginAccountService = async () => {
    const requestBody = {
      email: form.email,
      password: form.password,
    };

    const response = await axios.post(
      "http://localhost:3000/auth/login",
      requestBody
    );
    if (response.status === 200) {
      // OBJECT DESCTRUCTION
      //const username = response.data.username;
      // const name = response.data.name;
      // const lastname = response.data.lastname;

      /*       
      dispatch({
        type: 'LOGIN',
        payload: {
          name: name,
          lastname: lastname,
          username: username
        }
      }) 
      */

      const { username, name, lastname, _id } = response.data;
      dispatch({
        type: "LOGIN",
        payload: {
          name,
          lastname,
          username,
          _id,
        },
      });
      Cookie.set("user_token", response.data.token, { expires: 7 });
      //localStorage.setItem("user_token", response.data.token);
      window.location.href = "/";
    }
  };

  return (
    <>
      {loading === true ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <CircularProgress />
          </div>
        </>
      ) : (
        <div className="bg-orange-200 h-screen flex justify-center items-center">
          <div className="bg-white w-1/2 p-5 rounded-lg">
            <h2 className="text-center text-2xl font-semibold text-gray-500">
              Login your account
            </h2>
            <p className="text-center text-gray-500">
              Let's login your account and be socialized!
            </p>
            <div className="flex flex-col justify-center gap-5 mt-10">
              <TextField
                id="outlined-basic"
                label="Enter your e-mail"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Enter your password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                type="password"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              />
              <a href="#" className="text-end text-blue-500">
                Forgot your password?
              </a>
              <Button
                variant="contained"
                className="bg-gray-800 py-3 text-lg mt-10"
                onClick={() => loginAccountService()}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2A3442",
                  },
                }}
              >
                Login Your Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
