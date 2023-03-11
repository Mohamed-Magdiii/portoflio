import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { HashNavigation, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { learningProjects, realProjects } from "../data/projects";
import { Tab, Tabs } from 'react-bootstrap'

const Projects = () => {
  const [toggler, setToggler] = useState();
  const [images, setImages] = useState([])
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={images}
  key={images.length}
      />
      <section className="py-10">
        <div>
          <h3 className="text-3xl py-1 dark:text-white ">Portofolio</h3>
          <p className="text-xl py-2 leading-8 text-gray-800 dark:text-gray-200">
            Computer and Artificial Intelligence graduate Seeking a Web
            developing position where extensive experience will be further
            developed and utilized. a passionate fast-learner developer
            .specializes in MERN stack, ReactJS, NodeJS, MongoDB, OracleDB, JavaScript and Responsive design.
          </p>

        </div>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Real Projects">
      <Swiper
          spaceBetween={30}
          hashNavigation={{
            watchState: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, HashNavigation]}
          className="mySwiper"
        >
          {
            realProjects.map((project, index) => 
            <SwiperSlide key={index}>
            <div className="lg:flex lg:justify-center">
              <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="lg:w-1/2">
                  <div className="h-64 bg-cover lg:rounded-lg lg:h-full cursor-pointer" onClick={()=> {setImages(project.images) 
                   !toggler ? setToggler(true) : setToggler(false) 
                  }} style={{ backgroundImage: `url(${project.images[0]})`}}></div>
                </div>
                <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                  <h2 className="text-3xl text-gray-800 font-bold">{project.project}</h2>
                  <p className="mt-4 text-gray-600">{project.description}</p>
                  <div className=" relative  rounded-xl  dark:bg-white flex-1">
           <div className="grid grid-cols-2 py-4 ">
           {project.techs.map((tech, index) => (
            <div className="text-gray-800 py-1  flex gap-2" key={index}>
            <BsPatchCheckFill></BsPatchCheckFill>
            <span>{tech}</span>
          </div>
           ))}
          
        
           </div>
         </div>
                  <div className="flex gap-5">

                  {
                    project.demo && <div className="mt-8">
                    <a href={project.demo} className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Demo</a>
                  </div>
                  }
                   {
                    project.github && <div className="mt-8">
                    <a href={project.github} target="blank" className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Github</a>
                  </div>
                  }
                  </div>
                </div>
              </div>
            </div>
        </SwiperSlide>
)
          }
   

        </Swiper>
      </Tab>
      <Tab eventKey="profile" title="Learning Projects">
      <Swiper
          spaceBetween={30}
          hashNavigation={{
            watchState: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, HashNavigation]}
          className="mySwiper"
        >
          {
            learningProjects.map((project, index) => 
            <SwiperSlide key={index}>
            <div className="lg:flex lg:justify-center">
              <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="lg:w-1/2">
                  <div className="h-64 bg-cover lg:rounded-lg lg:h-full cursor-pointer" onClick={()=> {setImages(project.images) 
                   !toggler ? setToggler(true) : setToggler(false) 
                  }} style={{ backgroundImage: `url(${project.images[0]})`}}></div>
                </div>
                <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                  <h2 className="text-3xl text-gray-800 font-bold">{project.project}</h2>
                  <p className="mt-4 text-gray-600">{project.description}</p>
                  <div className=" relative  rounded-xl  dark:bg-white flex-1">
           <div className="grid grid-cols-2 py-4 ">
           {project.techs.map((tech, index) => (
            <div className="text-gray-800 py-1  flex gap-2" key={index}>
            <BsPatchCheckFill></BsPatchCheckFill>
            <span>{tech}</span>
          </div>
           ))}
          
        
           </div>
         </div>
                  <div className="flex gap-5">

                  {
                    project.demo && <div className="mt-8">
                    <a href={project.demo} className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Demo</a>
                  </div>
                  }
                   {
                    project.github && <div className="mt-8">
                    <a href={project.github} target="blank" className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Github</a>
                  </div>
                  }
                  </div>
                </div>
              </div>
            </div>
        </SwiperSlide>
)
          }
   

        </Swiper>
      </Tab>
     
    </Tabs>
       

      </section>
    </>

  )
}

export default Projects;