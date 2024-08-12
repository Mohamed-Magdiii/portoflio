import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import code from "/public/code.png";
import design from "/public/design.png";
import browser from "/public/browser.png";

const Experience = () => {
  return (
    <section>
      <div>
        <h3 className="text-3xl py-1 dark:text-white ">Experiences</h3>
        <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
        With my experience as a web developer, I have collaborated with talented individuals and consulted for startups to create elegant digital products that meet business and consumer needs.
          {/* <span className="text-teal-500"> agencies </span>
          consulted for <span className="text-teal-500">startups </span>
          and collaborated with talanted people to create digital products
          for both business and consumer use. */}
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
          <h4 className="py-4 text-teal-600">Technologies I Use</h4>
          <div className="grid grid-cols-2 py-4  gap-2">
          <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>HMTL</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>CSS</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>JavaScript</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>React JS</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
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
          <h4 className="py-4 text-teal-600">Technologies I Use</h4>
          <div className="grid grid-cols-2 gap-2 py-4  ">
          <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>NodeJS</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>MongoDB</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>OracleDB</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>JavaScript</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>Java</span>
            </div>
          </div>
        </div>
        <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
          <Image src={browser} width={100} height={100} />
          <h3 className="text-lg font-medium pt-8 pb-2 ">
            Low Code Development
          </h3>
          <p className="py-2">
            Do you have an idea for your next great website? Let s make it a
            reality, With dynamic data and save all your data in your database with faster and lower cost.
          </p>
          <h4 className="py-4 text-teal-600">Technologies I Use</h4>
          <div className="grid grid-cols-2 gap-2 py-4  ">
          <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>Outsystems</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>Sql Database</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>JavaScript</span>
            </div>
            <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>HTML/Html5 - CSS</span>
            </div>
           
          </div>
          <div className="flex items-center text-black gap-1">
            <BsPatchCheckFill />
              <span>Outsystems Architecture Canvas</span>
            </div>
        </div>
        </div>

    </section>
  );
};

export default Experience;