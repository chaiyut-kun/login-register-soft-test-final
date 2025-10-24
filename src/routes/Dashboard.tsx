import React, { Activity, useEffect, useState } from 'react'
import '../App.css'
import type { UserITF } from '../types/LoginRegister'
import { getUsers } from '../lib/service'
import { GoSmiley } from "react-icons/go";


function Dashboard() {

  const [users, setUsers] = useState<UserITF[]>([])
  const [status, setStatus] = useState(0)

  const fetchUsers = async () => {
    const response = await getUsers()
    if (Array.isArray(response.data)) {
      setUsers(response.data)
    } else {
      console.error('Failed to fetch users:', response.data)
      setUsers([])
    }
    setStatus(response.status)
    console.log(response.status)
  }
  useEffect(() => {
    fetchUsers()

  }, [])

  return (
    <>
      <Activity mode={status !== 200 ? 'visible' : 'hidden'}>
        <div className='p-16'>
          <header className="text-center text-4xl font-mono">
            <div className='text-center'>You are not authorized to view this content.</div>
          </header>
        </div>
      </Activity>
      <Activity mode={status === 200 ? 'visible' : 'hidden'}>
        <div className='p-16'>
          <header className="text-center text-4xl font-mono">
            <div className='text-center'>Dashboard</div>
            {users.map((user) => (
              <div key={user.id} className="m-4 p-4 border rounded-lg shadow-md flex items-center justify-center">
                <GoSmiley className="mr-2 text-2xl text-yellow-500" />
                <p><strong>Username:</strong> {user.name}</p>
              </div>
            ))}
          </header>
        </div>
      </Activity>

    </>
  )
}

export default Dashboard