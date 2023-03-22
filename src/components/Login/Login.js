import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import InputControl from "../inputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { async } from "@firebase/util";

function Login () {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill All fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true)
    signInWithEmailAndPassword(auth, values.email, values.pass).then(
      async(res) => {
        setSubmitButtonDisabled(false)
        navigate("/")
        // console.log(res);
        // console.log(user)
      }
    ).catch((err) => {
    setSubmitButtonDisabled(false);
    setErrorMsg(err.message)
    }
    )
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl
          label="Email"
          placeholder="Enter your Mail"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}
          >SignUp</button>
          <p>
            Already have an Account ?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
