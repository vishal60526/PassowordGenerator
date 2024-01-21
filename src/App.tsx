

import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [lengths, setLength] = useState("10");
  const [password, setpassword] = useState("")
  const [number, setnumbers] = useState(false);
  const [characters, setcharcters] = useState(false)
  // const passwordRef=useRef(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (number) str += '0123456789'
    if (characters) str += '~!@#$%^&*(){}":><?'
    for (let i = 1; i <= eval(lengths); i++) {
      const idx = Math.floor((Math.random() * (str.length  + 1)));
      pass += str.charAt(idx);
    }
    setpassword(pass);
  }, [number, lengths, characters,setpassword])
  
  const copyclickboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)


  
},[password])
 
useEffect(() => {
    passwordGenerator();
  }, [lengths, characters, number])
  
  return (
    <>
      <div className='w-full h-full flex flex-wrap justify-center items-center p-2'>
        <div className='w-min-[10rem] h-min-[8rem] border-4 rounded bg-slate-600 p-2'>
          <div>
            <input
              type="text"
              readOnly

              value={password}
              ref={passwordRef}
              placeholder='password'
              className='w-full rounded-md h-[2rem] mt-2 relative'
              
            />
            <button onClick={copyclickboard} className=  ' w-[5rem] -mx-[80px] mt-2 h-[2rem] bg-blue-600 rounded-md absolute' type="button">copy</button>
          </div>
          <input
          
            className='mt-2'
            type="range"
            min={10}
            max={20}
            value={lengths}
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className='text-yellow-400 -mt-2 mx-2' htmlFor="">Length:{lengths}</label>
          <input
            type="checkbox"
            name="" id=""
            defaultChecked={number}
            onChange={() => setnumbers((prev) => !prev)} />
          <label className='text-yellow-500 mx-2' htmlFor="">number</label>
          <input
            type="checkbox"
            defaultChecked={characters}
            name="" id=""
            onChange={() => { setcharcters((prev) => !prev) }} />
          <label className='text-yellow-500 mx-2' htmlFor="">characters</label>
        </div>
      </div>
    </>
  )
}

export default App
