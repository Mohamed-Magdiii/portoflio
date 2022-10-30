import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import meter1 from '../public/meter1.svg'
import meter2 from '../public/meter2.svg'
import meter3 from '../public/meter3.svg'
import colorSharp from '../public/color-sharp.png'
import  Image  from 'next/image';

const Skills = ()=>{
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
     <section className=" skill">
                    <Carousel infinite={true} responsive={responsive}  className="skill-slider px-10">
                        <div className="item ">
                            
                            <h5>web developer</h5>
                        </div>
                        <div className="item" >
                            <h5>web developer</h5>
                        </div>
                        <div className="item">
                            <h5>web developer</h5>
                        </div>
                    </Carousel>
        <img src={colorSharp} className="background-img-left" />
     </section>
    )
}

export default Skills;