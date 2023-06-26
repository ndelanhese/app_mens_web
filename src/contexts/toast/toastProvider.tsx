'use client'

import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastProviderProps } from './ToastProvider.types'

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer
        limit={3}
        autoClose={5000}
        transition={Bounce}
        icon
        theme="colored"
      />
    </>
  )
}
