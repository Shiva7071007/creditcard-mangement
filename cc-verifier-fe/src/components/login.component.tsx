import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from "../api/authentication"
import { useCookies } from 'react-cookie';

function LoginComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [userEmail, setUserEmail] = useCookies(['UserEmail']);

  const navigate = useNavigate();
  const navigateToBoard = () => navigate(`/board`);

  const performLogin = () => {
    setErrorMsg("")
    setSuccessMsg("")
    login(email, password)
      .then(response => {
        setUserEmail('UserEmail', response.email)
        navigateToBoard()
      })
      .catch((err) => setErrorMsg(err.message))
  }

  const performSignup = () => {
    setErrorMsg("")
    setSuccessMsg("")
    signup(email, password)
      .then(response => {
        response.message === "signup" ? setSuccessMsg("SignUp successful") : setErrorMsg(response.message)
      })
      .catch((err) => setErrorMsg(err.message))
  }

  return (
    <Paper elevation={8} style={{ textAlign: 'center', padding: '2px', border: "double" }}>
      <h2>LogIN/SignUp</h2>
      {errorMsg.length !== 0 && <h4 style={{ color: "red" }}>{errorMsg}</h4>}
      {successMsg.length !== 0 && <h4 style={{ color: "green" }}>{successMsg}</h4>}
      <div style={{ padding: '5px' }}>
        <TextField
          required
          id="outlined-email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '1px', width: '50vw' }}
        />
      </div>
      <div style={{ padding: '2px' }}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          disabled={email.length === 0}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '1px', width: '50vw' }}
        />
      </div>
      <div>
        <Button variant="contained" size="medium" style={{ margin: '1px' }} disabled={email.length === 0 || password.length === 0} onClick={performLogin}>
          Login
        </Button>
        <Button variant="contained" size="medium" style={{ margin: '1px' }} disabled={email.length === 0 || password.length < 9} onClick={performSignup}>
          Signup
        </Button>
      </div>
    </Paper>
  );
}

export default LoginComponent;
