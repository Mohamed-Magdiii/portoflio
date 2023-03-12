import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import code from "/public/code.png";
import design from "/public/design.png";
import consulting from "/public/consulting.png";


const Experience = () => {
  return (
    <section>
          <div>
            <h3 className="text-3xl py-1 dark:text-white ">Services I offer</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Since the beginning of my journey as a web 
              developer, I ve done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services with programming.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
              <Image src={design} width={100} height={100} />
              <h3 className="text-lg font-medium pt-8 pb-2  ">
                Front End Development
              </h3>
              <p className="py-2">
                Creating elegant designs suited for your needs following core
                design theory.
              </p>
              <h4 className="py-4 text-teal-600">Design Tools I Use</h4>
             <div className="grid grid-cols-2 py-4 ">
             <div className="text-gray-800 py-1  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>HMTL</span>
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
               <span>React JS</span>
             </div>
             <div className="text-gray-800 py-1 flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>Next JS</span>
             </div>
             </div>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
              <Image src={code} width={100} height={100} />
              <h3 className="text-lg font-medium pt-8 pb-2 ">
                Back End Development
              </h3>
              <p className="py-2">
                Do you have an idea for your next great website? Let s make it a
                reality, With dynamic data and save all your data in your database.
              </p>
              <h4 className="py-4 text-teal-600">Design Tools I Use</h4>
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


              // <div className="grid grid-cols-2 py-4 ">
              // <div className="text-gray-800 py-1  flex gap-2">
              //   <BsPatchCheckFill></BsPatchCheckFill>
              //   <span>Node JS</span>
              // </div>
              // <div className="text-gray-800 py-1 flex gap-2">
              //   <BsPatchCheckFill></BsPatchCheckFill>
              //   <span>MongoDB</span>
              // </div>
              // <div className="text-gray-800 py-1 flex gap-2">
              //   <BsPatchCheckFill></BsPatchCheckFill>
              //   <span>OracleDB</span>
              // </div>
              // <div className="text-gray-800 py-1 flex gap-2">
              //   <BsPatchCheckFill></BsPatchCheckFill>
              //   <span>JavaScript</span>
              // </div>
              // <div className="text-gray-800 py-1 flex gap-2">
              //   <BsPatchCheckFill></BsPatchCheckFill>
              //   <span>Java</span>
              // </div>
              // </div>