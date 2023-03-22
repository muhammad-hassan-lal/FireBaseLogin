import React, { useState } from "react";
import styles from "../Signup/Signup.module.css";
import InputControl from "../inputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { async } from "@firebase/util";

function Signup() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill All fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true)
    createUserWithEmailAndPassword(auth, values.email, values.pass).then(
      async(res) => {
        setSubmitButtonDisabled(false)
        const user = res.user;
        await updateProfile(user,{
          displayName:values.name
        })
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
        <h1 className={styles.heading}>SignUp</h1>
        <InputControl
          label="Name"
          placeholder="Enter your Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
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
              <Link to="/Login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
