import { Button, Modal } from "react-bootstrap";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";

const ContactMe = () => {
  const form = useRef();

  const [showSubmit, setShowSubmit] = useState(false);
  const handleCloseSubmit = () => setShowSubmit(false);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_crm3sla","template_462wnfr", e.target, 'ysrbXtjdT83eTNVLq')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <section className="py-10">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Me
      </h2>

      <div className="shadow-lg bg-white rounded-lg grid grid-cols-2">
        <div className="flex items-center rounded-l-lg bg-[url('../public/banner-bg.png')] p-10 justify-center">
          <div className="grid gap-5 text-white justify-center text-2xl font-serif">
            <div className="flex items-center gap-5">
              <AiOutlineMail />
              <p>Mohamed.magdy.imosa@gmail.com</p>
            </div>
            <div className="flex items-center gap-5">
              <AiFillPhone />
              <p>01129090515</p>
            </div>
            <div className="flex items-center gap-5">
              <ImLocation />
              <p>34 Mohamed Farag street , Hdaiq El Qubba</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="py-8 lg:py-16 px-4 mx-auto ">
            <form onSubmit={sendEmail} className="space-y-8">
              <div>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="name"
                  name="user_name"
                  required
                />
              </div>
              <div>  
                <input
                  type="email"
                  id="email"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="name@flowbite.com"
                  required
                  name="user_email"
                />
              </div>
              <div className="sm:col-span-2">
      
                <textarea
                  id="message"
                  rows="6"
                  name="user_message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
              <Modal show={showSubmit} onHide={handleCloseSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Welcome</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Your message sent succcessfully, Thank You.!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSubmit}>
                      Ok
                    </Button>
                  </Modal.Footer>
                </Modal>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
