import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


interface IProps {
    children:Component
}
const AlreadyLogIn = ({children}:IProps) => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/home')
        }
    })

  return (
    <>
      {children}
    </>
  )
}

export default AlreadyLogIn