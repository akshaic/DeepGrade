"use client"
import React, { useState } from 'react'
import {Input} from '../../components/ui/input'

const page = () => {
  const [name,setname]=useState("");
  const handleSubmit=(e)=>{
    const data=e.target.qname.value
    setname(data)
    const res=fetch('/api/questionpaper',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:e.target.qname.value})
    })
    console.log(res)
  }
  return (
    <div style={{display:'flex',width:'100vw',height:'100vh',backgroundColor:'#e9edc9',justifyContent:'center',alignItems:'center'}}>
      <div style={{display:'flex',width:'30vw',backgroundColor:'white',height:'70vh',borderRadius:'30px',justifyItems:'center',flexDirection:'column'}}>
              <div style={{display:'flex',marginTop:'3vh',height:'5vh',textAlign:'center',width:'30vw',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                <h3>Create New Question Paper</h3>
              </div>
              <div style={{width:'30vw',padding:'5vw',justifyContent:'center',display:'flex',gap:'2vw'}}>
                {name==""?<form style={{display:'flex'}}onSubmit={handleSubmit}>
                <Input id="qname" placeholder="enter question paper name" type="text"/>
                <button type='submit'>Create</button>
                </form>:<div style={{display:'flex',flexDirection:'column',gap:'5vh'}}>{name}
                    
        <button style={{border:'2px solid black',padding:'2vw',borderRadius:'30px'}}> upload Evaluation Criteria</button>
                  </div>}
                
              </div>
      </div>
    </div>
  )
}

export default page