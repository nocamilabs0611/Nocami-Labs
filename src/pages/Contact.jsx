import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState({ message: '', type: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending message...', type: 'loading' });

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus({ message: 'Message sent successfully! We will be in touch shortly.', type: 'success' });
        form.current.reset();
      }, () => {
        setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
      });
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto max-w-2xl">
        <FadeIn>
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200">
            <FadeIn delay={0.1}>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Let's build something great.</h1>
              <p className="text-slate-600 mb-8">Fill out the form below to discuss your custom software project.</p>
            </FadeIn>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <FadeIn delay={0.2}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Project Details</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-red-600 text-white font-bold py-4 rounded hover:bg-red-700 transition-colors shadow-sm"
                >
                  <Send size={20} /> Send Inquiry
                </button>
              </FadeIn>

              {status.message && (
                <FadeIn delay={0.1}>
                  <div className={`p-4 rounded font-medium ${status.type === 'success' ? 'bg-green-100 text-green-800' : status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {status.message}
                  </div>
                </FadeIn>
              )}
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
