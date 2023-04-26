import { useState } from "react"
import React from 'react'
import { useSignup } from "../../hooks/useSignup"

//styles
import styles from "./Signup.module.css"


function Signup() {
  const [email, setEmail]= useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  //destructure the hook->what the hook returned
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password, displayName)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
          <span>Name:</span>
          <input type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          />
      </label>
      <label>
          <span>Email:</span>
          <input type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
      </label>
      <label >
          <span>password:</span>
          <input type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
      </label>

      {!isPending && <button className="btn">Signup</button> }
      {/* //if is pending show the loading button */}
      {isPending && <button className="btn" disabled>loading</button> }

      {/* if there is an error show it */}
      { error && <p>{error}</p> }
    </form>
  )
}

export default Signup