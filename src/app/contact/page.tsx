"use client"

import React, { useRef } from "react";

import { FaTelegramPlane, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contactme = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'serviceId',
        'templateId',
        form.current,
        {
          publicKey: 'my-public-key'
        }
      )
      .then(() => console.log("Success!"))
      .catch((err: unknown) => console.error("FAILED:", err))
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center p-8 dark:text-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold dark:text-gray-200 mb-4">
          Contact Me
        </h2>

        <form
          aria-label="Contact form"
          className="contact-form-container"
          onSubmit={sendEmail}
          ref={form}
        >
          <div className="form-group">
            <label htmlFor="userName">Name (required)</label>
            <input type="text" id="userName" name="userName" required autoComplete="name" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="emailAddress">Email Address (required)</label>
            <input type="email" id="emailAddress" name="emailAddress" required autoComplete="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="How can I help you?"></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
        <p className="w-2/3 pb-20">
          Feel free to reach out to me if you&apos;re interested in getting in
          touch. I&apos;m open to conversations, collaborations, or any
          questions you may have. You can contact me via:
        </p>


        <div className="flex flex-col items-center justify-center pb-8 w-2/3">
          <p className="text-lg dark:text-gray-300 mb-4">
            <strong>
              For a quick chat, feel free to send me a message on Telegram.
            </strong>{" "}
            Click the button below to start a conversation instantly.
          </p>

          <a
            href="https://t.me/antoniopantojacontact"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Contact on Telegram
            <FaTelegramPlane className="text-lg ml-2" />
          </a>
        </div>

        <div className="flex flex-col items-center justify-center pb-8 w-2/3">
          <p className="text-lg dark:text-gray-300 mb-4">
            <strong>
              If you prefer, you can message me directly on WhatsApp.
            </strong>{" "}
            Simply click the button below and we&apos;ll be in touch right away.
          </p>

          <a
            href="https://wa.me/59162510188"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Contact on WhatsApp
            <FaWhatsapp className="text-lg ml-2" />
          </a>
        </div>

        <div className="flex flex-col items-center justify-center pb-8 w-2/3">
          <p className="text-lg dark:text-gray-300 mb-4">
            <strong>
              Alternatively, if you&apos;d like to send me an email, feel free
              to reach out there as well.
            </strong>{" "}
            Click the button below to open your email client and send me a
            message.
          </p>

          <a
            href="mailto:antonio.pantoja03130@gmail.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20get%20in%20touch.%20Please%20let%20me%20know%20how%20we%20can%20work%20together."
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Contact by Email
            <FaEnvelope className="text-lg ml-2" />
          </a>
        </div>

        <p className="w-2/3 pt-20">
          You can also find my <strong>CV</strong> on the{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Home page
          </a>{" "}
          , where you&apos;ll also find my phone number for more direct contact.
        </p>
      </section>
    </>
  );
};

export default Contactme;
