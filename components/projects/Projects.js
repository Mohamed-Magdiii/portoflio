import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { HashNavigation, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Projects = () => {
  const [toggler, setToggler] = useState(false);
  const images = []
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={images}
      />
      <section className="py-10">
        <div>
          <h3 className="text-3xl py-1 dark:text-white ">Portofolio</h3>
          <p className="text-xl py-2 leading-8 text-gray-800 dark:text-gray-200">
            Computer and Artificial Intelligence graduate Seeking a Web
            developing position where extensive experience will be further
            developed and utilized. a passionate fast-learner developer
            .specializes in MERN stack, ReactJS, NodeJS, MongoDB, JavaScript,
            jQuery and Responsive design.
          </p>

        </div>

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
          <SwiperSlide >
              <div class="lg:flex lg:justify-center">
                <div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                  <div class="lg:w-1/2">
                    <div class="h-64 bg-cover lg:rounded-lg lg:h-full" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80)' }}></div>
                  </div>
                  <div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                    <h2 class="text-3xl text-gray-800 font-bold">Build Your New <span class="text-indigo-600">Idea</span></h2>
                    <p class="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>
                    <div className=" relative  rounded-xl  dark:bg-white flex-1">
             <div className="grid grid-cols-2 py-4 ">
             <div className="text-gray-800 py-1  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>Node JS</span>
             </div>
             <div className="text-gray-800 py-1 flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>MongoDB</span>
             </div>
          
             </div>
           </div>
                    <div class="mt-8">
                      <a href="#" class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Start Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>

          <SwiperSlide >
              <div class="lg:flex lg:justify-center">
                <div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                  <div class="lg:w-1/2">
                    <div class="h-50 bg-cover lg:rounded-lg lg:h-full" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80)' }}></div>
                  </div>
                  <div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                    <h2 class="text-3xl text-gray-800 font-bold">Build Your New <span class="text-indigo-600">Idea</span></h2>
                    <p class="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>
                    <div className=" relative  rounded-xl  dark:bg-white flex-1">
             <div className="grid grid-cols-3 ">
             <div className="text-gray-800 py-1  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>Node JS</span>
             </div>
             <div className="text-gray-800  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>MongoDB</span>
             </div>
             <div className="text-gray-800  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>OracleDB</span>
             </div>
             <div className="text-gray-800  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>JavaScript</span>
             </div>
             <div className="text-gray-800  flex gap-2">
               <BsPatchCheckFill></BsPatchCheckFill>
               <span>Java</span>
             </div>
             </div>
           </div>
                    <div class="mt-8">
                      <a href="#" class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Start Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>

        </Swiper>
        {/* <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
            <div className="basis-1/4 flex-2 ">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={web1}
              />
            </div>
            <div className="basis-1/4 flex-2 ">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={web1}
              />
            </div>
            <div className="basis-1/4 flex-2 ">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={web1}
              />
            </div>

          </div> */}

      </section>
    </>

  )
}

export default Projects;