import { BsPatchCheckFill } from "react-icons/bs";


const Experience = () => {
  return (
    <section>
          <div>
            <h3 className="text-3xl py-10 dark:text-white text-center">Skills</h3>
            {/* <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Since the beginning of my journey as a freelance designer and
              developer, I've done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p> */}
            {/* <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p> */}
          </div>
          <div className="lg:flex  gap-10">
          <div className="shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1 ">
              {/* <Image src={code} width={100} height={100} /> */}
              <div className="text-gray-800 pt-8  py-4  flex gap-2">
              <img src="/browser.png"/>
                <h3 className="text-lg font-medium  text-teal-600">Front End Development</h3>
              </div>
              
              <div className="grid grid-cols-2  py-1">
              <div className="text-gray-800 py-1  flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>Html</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>CSS</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>JavaScript</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>Bootstrap</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>React JS</span>
              </div>
              </div>
            </div>
            <div className="shadow-lg relative p-10 rounded-xl my-10 dark:bg-white flex-1">
             
            <div className="text-gray-800 pt-8  py-4  flex gap-2">
              <img src="/server.png"/>
                <h3 className="text-lg font-medium  text-teal-600">Front End Development</h3>
              </div>
              <div className="grid grid-cols-2 py-4 ">
              <div className="text-gray-800 py-1  flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>Node JS</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>MongoDB</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>OracleDB</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>JavaScript</span>
              </div>
              <div className="text-gray-800 py-1 flex gap-2">
                <BsPatchCheckFill></BsPatchCheckFill>
                <span>Java</span>
              </div>
              </div>
            </div>
      
          </div>
        </section>
  );
};

export default Experience;
