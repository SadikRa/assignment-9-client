"use client";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col space-y-3 font-bold items-center justify-center w-full min-h-[calc(100vh-100px)]">
      <div className="spark-spray-container">
        <div className="tickmark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
        <div className="spark"></div>
      </div>
      <div className="flex flex-col space-y-3 font-bold items-center justify-center w-full">
        {/* Animated checkmark */}
        <p className="text-2xl">Payment Successfull</p>
        <p>
          Your order has been <strong>confirmed</strong> and will be delivered
          very soon.
        </p>

        <Link href={`/dashboard`}>
          <button className="lightning-button">Go to order page</button>
        </Link>
      </div>

      {/* tik mark animation */}
      <style>
        {`
          .tickmark {
            position: relative;
            width: 60px;
            height: 60px;
            border: 5px solid #FD5C70;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .tickmark::before {
            content: "";
            position: absolute;
            width: 15px;
            height: 30px;
            border: solid #FD5C70;
            border-width: 0 5px 5px 0;
            transform: rotate(45deg);
            animation: drawTick .7s ease-out;
          }

          @keyframes drawTick {
            0% {
              width: 0;
              height: 0;
            }
            100% {
              width: 15px;
              height: 30px;
            }
          }
        `}
      </style>
      {/* button animation */}
      <style>
        {`
    /* Button container styling */
    .lightning-button {
      position: relative;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #333;
      border: 2px solid #fff;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden; /* Hide overflow of button content */
      text-transform: uppercase;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease-in-out;
    }

    /* Hover effect for button */
    .lightning-button:hover {
      background-color: #fd5c70;
    }

    /* Creating the lightning stripe animation */
    .lightning-button::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      border-radius: 50%;
      border: 5px solid #fd5c70;
      animation: lightning 3s linear infinite; /* Animation for lightning */
      opacity: 0.7;
    }

    /* Lightning animation keyframes */
    @keyframes lightning {
      0% {
        transform: rotate(0deg);
        opacity: 0.7;
      }
      50% {
        transform: rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: rotate(360deg);
        opacity: 0.7;
      }
    }
  `}
      </style>
      {/* spark animatin */}
      <style>
        {`
    /* Firework container */
    .spark-spray-container {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 50px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }

    /* Each spark element */
    .spark {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #FD5C70;
      border-radius: 50%;
      animation: spark-animation 1.5s ease-out forwards;
      opacity: 0;
    }

    /* Keyframes for sparks burst effect */
    @keyframes spark-animation {
      0% {
        opacity: 1;
        transform: scale(0) translate(0, 0);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.2) translate(var(--x), var(--y));
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(var(--x), var(--y));
      }
    }

    /* Randomly position each spark to simulate a burst */
    .spark:nth-child(1) {
      --x: -60px;
      --y: -40px;
      animation-delay: 0s;
    }

    .spark:nth-child(2) {
      --x: 50px;
      --y: -80px;
      animation-delay: 0.1s;
    }

    .spark:nth-child(3) {
      --x: -90px;
      --y: -20px;
      animation-delay: 0.2s;
    }

    .spark:nth-child(4) {
      --x: 40px;
      --y: 60px;
      animation-delay: 0.3s;
    }

    .spark:nth-child(5) {
      --x: 80px;
      --y: -40px;
      animation-delay: 0.4s;
    }

    .spark:nth-child(6) {
      --x: -50px;
      --y: 50px;
      animation-delay: 0.5s;
    }

    .spark:nth-child(7) {
      --x: 70px;
      --y: -10px;
      animation-delay: 0.6s;
    }

    .spark:nth-child(8) {
      --x: 20px;
      --y: 80px;
      animation-delay: 0.7s;
    }

    .spark:nth-child(9) {
      --x: -70px;
      --y: 30px;
      animation-delay: 0.8s;
    }

    .spark:nth-child(10) {
      --x: -30px;
      --y: 70px;
      animation-delay: 0.9s;
    }

    /* Optional: Change spark colors to look more celebratory */
    .spark:nth-child(odd) {
      background-color: #FD5C70;
    }
    .spark:nth-child(even) {
      background-color: #FFC107;
    }
  `}
      </style>
    </div>
  );
}
