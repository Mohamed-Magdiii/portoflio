import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import {  Navigation } from "swiper";
import { learningProjects, realProjects } from "../data/projects";
import { Tab, Tabs } from 'react-bootstrap'

const Projects = () => {
  const [toggler, setToggler] = useState();
  const [images, setImages] = useState([])
  const swiperOptions = {
    spaceBetween: 30,
    navigation: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    modules: [Navigation]
  };

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
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex justify-content-center"
        >
          <Tab eventKey="home" title="Real Projects" className="  ">
            <div className="service-area-two pt-100 pb-70" >
              <div className="container">
                <div className="row d-flex justify-content-center">
                  {realProjects.map((project, index) => (
                    <div className="col-lg-4 col-sm-6" key={index}>
                      <div className="single-service">
                        <img src={project.images[0]} alt="Image" style={{ maxHeight: "220px" }} />

                        <div className="service-content">
                          {/* <i className="icon-style flaticon-car-insurance"></i> */}
                          <h3>{project.project}</h3>
                          <p>{project.description}</p>
                          <div className="grid grid-cols-2 py-4 ">
                            {project.techs.map((tech, index) => (
                              <div className="text-gray-800 py-1  flex gap-2" key={index}>
                                <BsPatchCheckFill></BsPatchCheckFill>
                                <span>{tech}</span>
                              </div>
                            ))}


                          </div>

                          {
                            project.demo && <div className="mt-8">
                              <a href={project.demo} target="blank" className="default-btn font-semibold rounded">Demo</a>
                            </div>
                          }
                          {
                            project.github && <div className="mt-8">
                              <a href={project.github} target="blank" className="default-btn font-semibold rounded">Github</a>
                            </div>
                          }

                        </div>
                      </div>
                    </div>


                  ))}
                </div>
              </div>
            </div>

          </Tab>
          <Tab eventKey="profile" title="Learning Projects">
            <div className="service-area-two pt-100 pb-70" >
              <div className="container">
                <div className="row d-flex justify-content-center">
                  {learningProjects.map((project, index) => (
                    <div className="col-lg-4 col-sm-6" key={index}>
                      <div className="single-service">
                        <img src={project.images[0]} alt="Image" style={{ maxHeight: "220px" }} />

                        <div className="service-content">
                          {/* <i className="icon-style flaticon-car-insurance"></i> */}
                          <h3>{project.project}</h3>
                          <p>{project.description}</p>
                          <div className="grid grid-cols-2 py-4 ">
                            {project.techs.map((tech, index) => (
                              <div className="text-gray-800 py-1  flex gap-2" key={index}>
                                <BsPatchCheckFill></BsPatchCheckFill>
                                <span>{tech}</span>
                              </div>
                            ))}


                          </div>
                          {
                            project.demo && <div className="mt-8">
                              <a href={project.demo} target="blank" className="default-btn font-semibold rounded">Demo</a>
                            </div>
                          }
                          {
                            project.github && <div className="mt-8">
                              <a href={project.github} target="blank" className="default-btn font-semibold rounded">Github</a>
                            </div>
                          }
                        </div>
                      </div>
                    </div>


                  ))}
                </div>
              </div>
            </div>
          </Tab>

        </Tabs>


      </section>
    </>

  )
}

export default Projects;