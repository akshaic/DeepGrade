"use client"
import React from 'react'
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <div style={{display:'flex',width:'100vw',height:'100vh',backgroundColor:'#1b263b',justifyItems:'center',alignContent:'center',alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column',gap:'2vh'}}>
          <button
      onClick={() => router.push("/teacher")}
        style={{backgroundColor:'#a4c3b2',padding:'2vw',borderRadius:'30px'}}
    >
      Upload Evaluation Criteria
    </button>
    <button
      onClick={() => router.push("/uploadanswer")}
        style={{backgroundColor:'#a4c3b2',padding:'2vw',borderRadius:'30px'}}
    >
      Upload Student Answer
    </button>
    </div>
  )
}

export default page