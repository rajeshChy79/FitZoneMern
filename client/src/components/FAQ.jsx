import React, { useEffect } from 'react';
import { Heading, FaqComponent } from ".";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,       // Smooth animation duration
      offset: 120,          // Offset before animation triggers
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section className="pt-16 pb-10 relative bg-gradient-to-b from-gray-900 to-black text-white">
      <Heading name="Frequently Asked Questions" />

      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col space-y-4">
          <div data-aos="fade-up">
            <FaqComponent
              question="How To Sign Up And Login?"
              answer="You can sign up using your email and password. Once registered, log in with your credentials to access your account."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <FaqComponent
              question="What Is The Fee For The Plans?"
              answer="Our plans start from $19.99 per month. We also offer annual and premium plans for extra benefits."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <FaqComponent
              question="Is The Fee Refundable?"
              answer="We offer a 7-day refund policy if you're not satisfied with our services."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <FaqComponent
              question="Is It Safe To Purchase Plans Online?"
              answer="Yes! We use secure payment gateways to ensure your transactions are safe."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <FaqComponent
              question="How Long Does It Take To Complete A Training Pack?"
              answer="Each training pack is designed for a 4 to 8-week period, depending on your selected program."
            />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-yellow-400 opacity-40 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default FAQ;
