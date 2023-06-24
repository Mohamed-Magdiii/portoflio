import { Button, Modal } from "react-bootstrap";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsPatchCheckFill } from "react-icons/bs";
const MySwal = withReactContent(Swal)

 
const alertContent = () => {
   MySwal.fire({
       title: 'Thanks For Contacting Me!',
       text: 'Your message was successfully send.',
       icon: 'success',
       timer: 2000,
       timerProgressBar: true,
       showConfirmButton: false,
   })
}

const ContactMe = () => {
  const form = useRef();
  const [showSubmit, setShowSubmit] = useState(false);
  const handleCloseSubmit = () => setShowSubmit(false);
  const handleShowSubmit = () => setShowSubmit(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_crm3sla","template_ic4hihe", e.target, 'ysrbXtjdT83eTNVLq')
      .then((result) => {
				alertContent();
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
       handleShowSubmit()
  };


  return (
        <div className="contact-area ptb-100">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-5">
						<div className="quick-contact">
							<h3 className="text-center">Contact Info</h3>
							<ul>
								<li>
									Location:
                           <div className="flex gap-2">
                           <BsPatchCheckFill></BsPatchCheckFill>
									<span >Cairo, Egypt</span>
                           </div>
								</li>
								<li>
                        Call Me:
                           <div className="flex gap-2">
                           <AiFillPhone></AiFillPhone>
									<a href="tel:+2001129090515" style={{textDecoration:"none"}}>+20 01129090515</a>
                           </div>
									
								</li>
								<li>
									Email Me:
                           <div className="flex gap-2">
                           <AiOutlineMail></AiOutlineMail>
                           <a href="mailto:mohamed.magdy.imosa@gmail.com" style={{textDecoration:"none"}}>
									   mohamed.magdy.imosa@gmail.com
									</a>
                           </div>
									
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-7">
						<div className="contact-wrap">
							<div className="contact-form">
								<div className="section-title">
									<h2>{'Drop Us A Message For Any Query'}</h2>
								</div>
								<form onSubmit={(e)=>sendEmail(e)} >
									<div className="row">
										<div className="col-lg-6 col-sm-6">
											<div className="form-group">
												<input 
													type="text" 
													name="from_name" 
													placeholder={'Name'} 
													className="form-control" 
													// value={contact.name}
													// onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-6 col-sm-6">
											<div className="form-group">
												<input 
													type="text" 
													name="email" 
													placeholder={"Email"} 
													className="form-control" 
													// value={contact.email}
													// onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-6 col-sm-6">
											<div className="form-group">
												<input 
													type="text" 
													name="number" 
													placeholder={"Phone number"}
													className="form-control" 
													// value={contact.number}
													// onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-6 col-sm-6">
											<div className="form-group">
												<input 
													type="text" 
													name="subject" 
													placeholder="Subject" 
													className="form-control" 
													// value={contact.subject}
													// onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<textarea 
													name="message" 
													cols="30" 
													rows="6" 
													placeholder={`Write your message ...`} 
													className="form-control" 
													// value={contact.text}
													// onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-12 col-sm-12">
											<button type="submit" className="default-btn page-btn">
												Send Message
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
                    </div>

			
                </div>
            </div>
        </div>
    
  );
};

export default ContactMe;
