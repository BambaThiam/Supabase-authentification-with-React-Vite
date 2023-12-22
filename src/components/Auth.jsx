import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      console.log(error)
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-lg font-bold text-gray-900 mb-6">
          Projet React : Feature Authentication with Supabase
        </h1>
        <p className="text-sm text-gray-700 mb-4">
          Sign in via magic link with your email below
        </p>
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleLogin}
        >
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
