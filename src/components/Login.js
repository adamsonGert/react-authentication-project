import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault() //prevent refreshing

        //validation

        try {
            setError('')
            setLoading(true) //disable button before
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/') //useNavigate hook gives you access to the history instance that you may use to navigate.
            } catch(error) {
                setError('Failed to log in')
                console.log(error)
            }

            setLoading(false)
    }

  return (
    <>
    {error && <p className='text-center text-danger'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Form.Group id="email" className='mb-3'>
          <Form.Control type="email" ref={emailRef} autoComplete="true" placeholder='Email' required />
        </Form.Group>
        <Form.Group id="password" className='mb-3'>
          <Form.Control type="password" ref={passwordRef} autoComplete="true" placeholder='Password' required />
        </Form.Group>
        <Button disabled={loading} variant="outline-primary" className="mt-2 w-100 text-white" type="submit">
          Log In
        </Button>
      </form>
    </>
  )
}
