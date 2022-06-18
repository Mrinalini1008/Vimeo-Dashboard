import React from 'react'

export default function Login() {
  return (
    <div>
        <div>
            <h4>Login</h4>
            <div>
                <label>Email address</label>
                <input type="email"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password"/>
            </div>
            <button type="submit">Submit</button>
        </div>
    </div>
  )
}
