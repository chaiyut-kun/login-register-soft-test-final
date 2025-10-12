import { useState } from 'react'
import './App.css'
import InputGroup from './component/InputGroup'
import Divider from './component/Divider'
import { Register, Login } from './lib/service'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  let response;

  // value that tell us it is login page?
  // true => login
  // false => register
  const [swap, setSwap] = useState(true)

  const handleSubmit = async () => {

    if (swap) {
      response = await Login({ email, password })

    } else {
      response = await Register({ email, password, name })
    }

    console.log("response",response)

    setResponseMessage(response?.message)
  }

  return (
    <div className='flex justify-between items-center'>
      {/* left */}
      <section className='w-[50%] flex justify-center'>
        <div>

          <h1 className='text-3xl font-bold'>Welcome to 627 Academy</h1>
          <p>please enter you details</p>

          <div className='mt-6 p-2'>

            {swap ?
              <div></div>
              :
              <InputGroup name='username' label='Username' handleChange={setName} value={name} type='text' />
            }
            <InputGroup name='email' label='Email Address' handleChange={setEmail} value={email} type='email' />
            <InputGroup name='password' label='Password' handleChange={setPassword} value={password} type='password' />


            <div className='my-2'>
              <button type='button' onClick={handleSubmit} className='w-full rounded border border-white w-20 h-10 bg-gray-100 text-slate-700'>
                {swap ? "Login" : "Register"}
              </button>
            </div>

            <Divider label='or' />

            <div className='my-2'>
              <button type='button' onClick={() => setSwap(!swap)} className='w-full rounded border border-white w-20 h-10 bg-gray-100 text-slate-700'>
                {swap ? "Register" : "Login"}
              </button>
            </div>

            {/* response message when click button */}
            {responseMessage && (
                <div className="my-2">
                  <button type='button' aria-readonly className='w-full rounded border border-green-400 w-20 h-10 bg-green-100 text-slate-700'>
                    {responseMessage}
                  </button>
                </div>
              )
            }

          </div>
        </div>
      </section >
      {/* right */}
      {/* right */}
      <section className='w-[50%]'>
        <img src="https://picsum.photos/id/239/640/670" alt="" className='' />
      </section>
    </div>
  )
}


export default App
