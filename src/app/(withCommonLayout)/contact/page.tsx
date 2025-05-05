/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Banner from "@/components/Shared/CustomBanner";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [status, setStatus] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setStatus("Sending...");
    console.log(data);
    try {
      // Simulate form submission (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("Message sent successfully!");
      reset(); // Reset form fields after successful submission
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-yellow-100 via-purple-100 to-amber-100 rounded-xl shadow-xl mt-20">
      <Banner
        heading="Contact Us"
        description={"We always love to get your feedback."}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-purple-800 mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-purple-800 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-lg font-semibold text-purple-800 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter your message"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {status && (
        <p className="mt-6 text-center font-semibold text-purple-600">
          {status}
        </p>
      )}
    </div>
  );
};

export default Contact;
