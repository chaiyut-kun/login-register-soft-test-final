import { useEffect, useState } from 'react'
import { Activity } from 'react'
import './App.css'
import InputGroup from './components/InputGroup'
import Divider from './components/Divider'
import { Register, Login } from './lib/service'
import { validEmail, validPasswordLength, validUsername, errorMsg } from './lib/validation'
import { Link, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')
  // these 2 message will set value from api only
  const [invalidMailResponse, setInvalidMailResponse] = useState('')
  const [invalidNameResponse, setInvalidNameResponse] = useState('')
  const [passwordMinResponse, setPasswordMinResponse] = useState('')
  const [isHomePage, setIsHomePage] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  // this error message will set value from frontend validtion
  let apiResponse;

  // value that tell us it is login page?
  // true => login
  // false => register
  const [swap, setSwap] = useState(true)

  const handleSubmit = async () => {

    setIsProcessing(true);

    // check email
    const validateEmail = validEmail(email)
    const validatePasswordLength = validPasswordLength(password)
    const validUserName = swap ? true : validUsername(name)


    if (validateEmail && validatePasswordLength && validUserName) {
      setInvalidMailResponse('')
      setPasswordMinResponse('')
      setInvalidNameResponse('')

      if (swap) {
        apiResponse = await Login({ email, password })

      } else {
        apiResponse = await Register({ email, password, name })
        setSwap(!swap)
      }

      setStatus(apiResponse ? apiResponse.status : 200)
      setResponseMessage(apiResponse?.message)

      if (apiResponse?.status === 200) {
        console.log(apiResponse.status)

        
        setTimeout(() => {
          toDashboard();
          setIsProcessing(false);
        }, 2000);

      }


    } else {
      setInvalidMailResponse(validateEmail ? '' : errorMsg.emailInvalid)
      setPasswordMinResponse(validatePasswordLength ? '' : errorMsg.passwordMinLength)
      // if it's a register part
      if (!swap) setInvalidNameResponse(validUserName ? '' : errorMsg.userNameBlank)
    }


  }

  // navigate to dashboard
  function toDashboard() {

    navigate('/dashboard')

  }

  useEffect(() => {

    setName('')
    setPassword('')
    setEmail('')
    setInvalidMailResponse('')
    setInvalidNameResponse('')
    setPasswordMinResponse('')
  }, [swap])

  return (
    <>
      <Activity mode={isHomePage ? 'visible' : 'hidden'}>
        <div className="my-76 text-2xl text-center" >
          Welcome to 627 Academy Homepage
          <button
            aria-label='started'
            className="ml-4 p-2 rounded border border-white hover:bg-slate-700" onClick={() => setIsHomePage(false)}>Go to Auth Page</button>
        </div>
      </Activity>
      <Activity mode={!isHomePage ? 'visible' : 'hidden'}>
        <div className="flex flex-col text-white p-4">
          <button className="ml-40 p-2 rounded border border-white hover:bg-slate-700 w-50 absolute top-4" onClick={() => setIsHomePage(true)}>🏠Go to Home Page</button>
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
                    <button type='button' onClick={handleSubmit} disabled={isProcessing} className='w-full rounded border border-white w-20 h-10 bg-gray-100 text-slate-700'>
                      {swap ? "Login" : "Register"}
                    </button>
                  </div>

                  <Divider label='or' />

                  <div className='my-2'>
                    <button type='button' onClick={() => setSwap(!swap)} disabled={isProcessing} className='w-full rounded border border-white w-20 h-10 bg-gray-100 text-slate-700'>
                      {swap ? "Register" : "Login"}
                    </button>
                  </div>

                  {/* response message when click button */}
                  <Activity mode={invalidMailResponse ? 'visible' : 'hidden'}>
                    <div className="my-2">
                      <button type='button' aria-readonly className='w-full rounded border border-red-200 w-20 h-10 bg-red-400 text-slate-50'>
                        {invalidMailResponse}
                      </button>
                    </div>
                  </Activity>
                  <Activity mode={passwordMinResponse ? 'visible' : 'hidden'}>
                    <div className="my-2">
                      <button type='button' aria-readonly className='w-full rounded border border-red-200 w-20 h-10 bg-red-400 text-slate-50'>
                        {passwordMinResponse}
                      </button>
                    </div>
                  </Activity>
                  <Activity mode={invalidNameResponse ? 'visible' : 'hidden'}>
                    <div className="my-2">
                      <button type='button' aria-readonly className='w-full rounded border border-red-200 w-20 h-10 bg-red-400 text-slate-50'>
                        {invalidNameResponse}
                      </button>
                    </div>
                  </Activity>
                  <Activity mode={status != 0 ? 'visible' : 'hidden'}>
                    <div className="my-2">
                      <button type='button' aria-readonly aria-label='client-response' className={`w-full rounded border ${status === 200 || status === 201 ? 'border-green-400 w-20 h-10 bg-green-100 text-slate-700' : 'border-red-200 w-20 h-10 bg-red-400 text-slate-50'} `}>
                        {responseMessage}
                      </button>
                    </div>
                  </Activity>

                </div>
              </div>
            </section >
            {/* right */}
            {/* right */}
            <section className='w-[50%] h-[20%]'>
              <img src="https://picsum.photos/id/239/640/640" alt="" className='' />
            </section>
          </div>
        </div>

      </Activity>
    </>
  )
}


export default App
