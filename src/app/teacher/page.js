"use client"
import React, { useState } from 'react'
import {Input} from '../../components/ui/input'
import UploadPage from '../../components/Evaluploader'

const page = () => {
  const [name,setname]=useState("");
  const [qpid,setqpid]=useState("");
  const handleSubmit= async(e)=>{
 
    const data=e.target.qname.value
    setname(data)
    const res= await fetch('/api/questionpaper',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:e.target.qname.value,password:e.target.password.value})
    })
    const dres= await res.json()
    console.log("response"+dres)
    setqpid(dres);

  }
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#e6f3e6',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        width: '600px',
        maxWidth: '90%',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Darker Green header */}
        <div style={{
          display: 'flex',
          backgroundColor: '#377a54',  // Darker green color
          padding: '25px 20px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '24px', fontWeight: '500' }}>
            <span style={{ marginRight: '12px' }}>📚</span>
            Create Question Paper
          </span>
        </div>
        
        {/* Form content */}
        <div style={{
          padding: '30px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {name == "" ? 
            <form style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }} onSubmit={handleSubmit}>
              {/* Question Paper Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ 
                  fontWeight: '500', 
                  fontSize: '16px', 
                  color: '#333'  
                }}>
                  Question Paper Name
                </label>
                <input 
                  id="qname" 
                  placeholder="Enter question paper name" 
                  type="text"
                  style={{
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    outline: 'none',
                  }}
                />
              </div>
              
              {/* Password Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ 
                  fontWeight: '500', 
                  fontSize: '16px', 
                  color: '#333'  
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    id="password" 
                    placeholder="Enter password" 
                    type="password"
                    style={{
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      outline: 'none',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{ 
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aaa'
                  }}>
                    🔒
                  </div>
                </div>
              </div>
              
              {/* Create Button - Also updated to darker green */}
              <button 
                type='submit'
                style={{
                  backgroundColor: '#377a54',  // Darker green color
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginTop: '15px',
                  transition: 'background-color 0.2s'
                }}
              >
                Create Paper
              </button>
            </form> 
            : 
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5vh'
            }}>
              {name+qpid}

                    <UploadPage name={name}/>
                  </div>}
                
              </div>
      </div>
    </div>
  )
}

export default page