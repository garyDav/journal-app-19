import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { firebase } from '../firebase/firebase-config'
import { PrivateRoute } from './PrivateRoute'

import { JournalScreen } from '../components/journal/JournalScreen'
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AppRouter = () => {
  const dispatch = useDispatch()

  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return <h1>Espere...</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth/login'
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <LoginScreen />
            </PublicRoute>
          }
        />

        <Route
          path='/auth/register'
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <RegisterScreen />
            </PublicRoute>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
