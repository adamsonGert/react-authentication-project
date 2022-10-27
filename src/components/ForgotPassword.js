import React, { useRef, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword  } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault() //prevent refreshing

        //validation

        try {
            setMessage('')
            setError('')
            setLoading(true) //disable button before
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox!')
            } catch(error) {
                setError('Failed to reset password')
                console.log(error)
            }

            setLoading(false)
    }

  return (
    <>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required autoComplete="true" />
            </Form.Group> 
            <div className='d-flex'>
            <Button disabled={loading} variant="outline-primary" className="mt-4 w-100 text-white" type='submit'>Reset Password</Button>
            </div>
        </Form>
    </>
  )
}
