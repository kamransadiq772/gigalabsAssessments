import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


interface IProps {
    children:Component
}
const RequireLogin = ({children}:IProps) => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/')
        }
    })

  return (
    <>
      {children}
    </>
  )
}

export default RequireLogin
