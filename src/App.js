import React, { useEffect, useState } from 'react'
import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import PasswordStrength from './Components/PasswordStrength'
import axios from 'axios'
import PasswordTips from './Components/PasswordTips'

function App() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [pwRemarks, setPwRemarks] = useState({
    score: 0,
    guessTimeSec: 0,
    guessTimeRemark: "",
    warning: "",
    suggestions: ""
  })

  const pwComment = (score) => {
    switch (score) {
      case 1:
        return 'very weak'

      case 2:
        return 'weak'

      case 3:
        return 'medium'

      case 4:
        return 'strong'

      case 5:
        return 'very strong'

      default:
        break;
    }
  }

  const showPassword = () => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {

    if (password === "" || null) {
      setPwRemarks({ score: 0 })
    } else {
      setLoading(true)
      axios.post("https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength", {
        "password": password
      })
        .then(res => {
          console.log(res.data)
          setPwRemarks({
            score: res.data.score + 1,
            guessTimeSec: res.data.guessTimeSeconds,
            guessTimeRemark: res.data.guessTimeString,
            warning: res.data.warning,
            suggestions: res.data.suggestions
          })
          setLoading(false)
        })
    }

  }, [password])

  return (
    <div className="pws-container">
      <div className="header">
        <h1 style={{ margin: "0" }}>HOW STRONG IS YOUR PASSWORD?</h1>
        <p style={{ fontStyle: "italic", marginTop: "0", fontSize: "14px" }}>SureLocked can help you find out your password strength.</p>
      </div>
      <div className="tips-container">
        <p style={{ margin: "0", lineHeight: "25px" }}>
          Passwords are easily hacked because most humans follow similar patterns.
          Many experts now believe that frequent password changes actually worsen
          computer security because people tend to choose minor variations of their current
          passwords so they’ll be easier to remember.
        </p>
        <p style={{ marginBottom: "0" }}>Submit your password to know the strength of your password.</p>
      </div>
      <div className="input-container">
        <div className="pw-content">
          <div className="pw-input">
            <input type={show ? "text" : "password"} placeholder="Enter a password" onChange={(e) => { setPassword(e.target.value) }} />
            <div onClick={showPassword} style={{ cursor: "pointer" }}>
              <p>
                {
                  show ?
                    <>
                      <i className="fa fa-eye-slash fa-lg" aria-hidden="true"></i>
                    </>
                    :
                    <>
                      <i className="fa fa-eye fa-lg" aria-hidden="true" ></i>
                    </>
                }
              </p>
            </div>
          </div>
          <PasswordStrength
            score={pwRemarks.score}
          />
        </div>
        {
          loading ?
            <>
              <p className="pw-comment">Evaluating...</p>
            </>
            :
            <>
              {
                password ?
                  <>
                    <p style={{ margin: "15px 0", fontSize: "23px", fontWeight: "bold" }}>RESULTS</p>
                  </>
                  :
                  <>
                  </>
              }
              {
                password ?
                  <div className="pw-comment">
                    <p style={{ marginTop: "0" }}>Your password is {pwComment(pwRemarks.score)}. </p>
                    { pwRemarks.guessTimeRemark ? `It will take ${pwRemarks.guessTimeRemark} to guess your password.`: "" }
                    {pwRemarks.suggestions ? ` ${pwRemarks.suggestions}` : "" }
                  </div>
                  :
                  <>
                  </>
              }
            </>
        }


      </div>

      <PasswordTips/>

    </div>
  );
}

export default App;
