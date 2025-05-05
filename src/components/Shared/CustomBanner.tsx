import Image from "next/image";
import { ReactNode } from "react";
import svgImg from "../../public/10578810.png";

interface BannerProps {
  heading: string;
  description: string | ReactNode;
}

const Banner = ({ heading, description }: BannerProps) => {
  return (
    <div className="text-center my-3 mb-10 space-y-3 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>
      <p className="text-lg text-gray-600">{description}</p>
      <div className="flex justify-center">
        <Image alt="svg" className=" w-96 mt-[-110] absolute" src={svgImg} />
      </div>
    </div>
  );
};

export default Banner;
