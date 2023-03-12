/* eslint-disable react/no-unescaped-entities */

import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillGithub } from 'react-icons/ai';
import  Image  from 'next/image';
import  Link  from 'next/link';
import deved from "../../public/mohamed.png";
import { useState, useEffect } from 'react';


const Intro = ()=>{
    const [loopNum , setLoopNum] = useState(0)
    const [isDeleting, setisDeleting] = useState(false)
    const toRotate = ["Web developer", "Full stack developer" , "Backend developer", "Frontend developer"]
    const [text, settext] = useState('')
    const [delta , setDelta] = useState(300- Math.random()* 100)
    const period = 500
    useEffect(() => {
      let ticker = setInterval(() => {
        tick()
      }, delta);
    
      return () => {
        clearInterval(ticker)
      }
    }, [text])
    const tick = ()=>{
        let i = loopNum % toRotate.length
        let fullText = toRotate[i]
        let updatedText =isDeleting ? fullText.substring(0 , text.length -1) : fullText.substring(0 , text.length + 1)
        settext(updatedText)
        if(isDeleting){
            setDelta(prevDelta => prevDelta /2 )
        }
        if(!isDeleting && updatedText === fullText){
            setisDeleting(true)
            setDelta(period)

        }else if(isDeleting && updatedText===''){
                setisDeleting(false)
                setLoopNum(loopNum + 1)
                setDelta(700)
            }
    }
    return (
        <div className="text-center max-h-screen lg:flex my-10">
        <div className='mt-9' >
          <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-600 md:text-6xl">
            Hi, I'm Mohamed Magdy
          </h2>
          <h3 className="text-3xl  py-2 dark:text-white md:text-3xl">
            {text}
          </h3>
          <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
            JavaScript Developer using Nodejs, React. Join me down below and let's get cracking!
          </p>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
            <AiFillLinkedin className='cursor-pointer' onClick={() => window.open('https://www.linkedin.com/in/mohamed-magdy-mearn-stack')} />
            <AiFillGithub className='cursor-pointer' onClick={() => window.open('https://github.com/Mohamed-Magdiii')} />
          </div>
        </div>
        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-60 h-60 relative overflow-hidden mb-8  md:h-96 md:w-96">
          <Image src={deved} layout="fill" objectFit="cover" className='img-move' />
        </div>
     </div>
    )
}

export default Intro