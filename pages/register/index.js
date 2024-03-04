import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Cookie from "js-cookie";

export default function RegisterPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  /*   
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); 
*/

  const [termsCheck, setTermsCheck] = useState(false);
  // let termsCheck = false;
  // termsCheck = true;   --> setTermsCheck(true);

  useEffect(() => {
    let userToken = Cookie.get("user_token");

    if (userToken) {
      window.location.href = "/";
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleOnChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createAccountService = async () => {
    const requestBody = {
      name: form.name,
      lastname: form.surname,
      username: form.username,
      email: form.email,
      password: form.password,
    };

    /*
    const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          body: JSON.stringify(requestBody),
    })
    */

    const response = await axios.post(
      "http://localhost:3000/auth/register",
      requestBody
    );

    if (response.status === 200) {
      const { username, name, lastname } = response.data.user;
      Cookie.set("user_token", response.data.token, { expires: 7 });
      dispatch({
        type: "LOGIN",
        payload: {
          name,
          lastname,
          username,
        },
      });
      window.location.href = "/";
    } else {
      alert("An error occured while creating your account.");
    }
  };

  const handleSubmit = async () => {
    if (termsCheck === false) {
      alert("You must accept the terms of use and privacy policy.");
    } else if (form.password !== form.password2) {
      alert("Your passwords doesn't match.");
    } else {
      await createAccountService();
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
              Create a new account
            </h2>
            <p className="text-center text-gray-500">
              Let's create your account and be socialized!
            </p>
            <div className="flex flex-col justify-center gap-5 mt-10">
              {/* 
          BU KOMUT OBJELERI DÜZ STRING HALINDE GÖSTERİR
          {JSON.stringify()} 
          */}
              <div className="flex gap-5">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  value={form.name}
                  name="name"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  name="surname"
                  value={form.surname}
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="flex gap-5">
                <TextField
                  id="outlined-basic"
                  name="username"
                  value={form.username}
                  onChange={(event) => handleOnChange(event)}
                  label="Enter your username"
                  type="text"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  value={form.email}
                  name="email"
                  onChange={(event) => handleOnChange(event)}
                  label="Enter your e-mail"
                  type="email"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Enter your password"
                type="password"
                name="password"
                value={form.password}
                onChange={(event) => handleOnChange(event)}
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Re-type your password"
                type="password"
                variant="outlined"
                name="password2"
                value={form.password2}
                onChange={(event) => handleOnChange(event)}
                sx={{
                  width: "100%",
                }}
              />
              <div className="flex items-center">
                <Checkbox
                  checked={termsCheck}
                  onChange={() => {
                    setTermsCheck(!termsCheck);
                  }}
                />
                <span>I accept the Privacy Policy and Terms of Use.</span>
              </div>
              <Button
                variant="contained"
                disabled={termsCheck === false}
                className="bg-gray-800 py-3 text-lg mt-10"
                onClick={() => handleSubmit()}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2A3442",
                  },
                }}
              >
                Create a New Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
