
import { BsFillMoonStarsFill } from 'react-icons/bs';
import Intro from './../Intro/Intro';

const TopNavComponent = ({handleClick})=>{
    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('Mohamed_Magdy_Full_Stack_Developer_Resume.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Mohamed_Magdy_Full_Stack_Developer_Resume.pdf';
                alink.click();
            })
        })
    }
    return (
        <section className='mb-10' >
        <nav className="py-10 mb-3 flex justify-between dark:text-white">
          <h1 className="font-burtons text-2xl">Megz</h1>
          <ul className="flex items-center">
            <li>
              <BsFillMoonStarsFill
                onClick={handleClick}
                className=" cursor-pointer text-2xl "
              />
            </li>
            <li>
              <button
                className="bg-gradient-to-r from-black text- to-grey-800 text-white px-4 py-2 border-none rounded-md ml-8"
                onClick={onButtonClick}
              >
                Download Resume
              </button>
            </li>
          </ul>
        </nav>
        <Intro />
      </section>
    )
}

export default TopNavComponent