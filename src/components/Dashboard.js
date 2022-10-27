import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { database } from '../firebase'
import { ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom'
 
export default function Dashboard() {

  const { currentUser} = useAuth();
  const [names, setNames] = useState([]);
  const current = new Date()
  const day = `${current.getDate()}`
  const weekday = `${current.toLocaleString('en-us', {weekday:'long'})}`
  const month = `${current.toLocaleString('default', {month:'long'})}`

  useEffect(() => {
    onValue(ref(database, `/${currentUser.uid}/users`), (snapshot) => {
      const data = snapshot.child("name").val();
        setNames(data);
      })
 });

  return (
    <>
    <Card className='card'>
      <CardBody>
      <h1 className='mb-4 text-white'>Dashboard</h1>
        <p>Welcome <strong className='text-white'>{names === null || names === '' ? currentUser.email : names}</strong></p>
        <p className='mb-0'>Today is {weekday}, {day} {month}.</p>
      </CardBody>
      <CardFooter>
        <div className='d-flex flex-column flex-sm-row pt-3 pb-3 px-4'>
            <Link to='/update-profile' className='btn btn-outline-primary w-100 text-white text-decoration-none me-sm-3 mb-3 mb-sm-0'>Update profile </Link>
            <Link to='/todo-page' className='btn btn-outline-primary w-100 text-white text-decoration-none'>Todo page</Link>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}

const Card = styled.div`
  color: rgb(158, 158, 158);
  background-color: var(--cardBg);
  border-radius: 10px;
  box-shadow: var(--cardBoxShadow);
  @media screen and (min-width: 767px) {
    width: 400px;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  background-color: var(--cardFooterBg);
`;
