import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-5 md:px-10 lg:px-20">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About <span className="text-yellow-400">Plated 4 U</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Plated 4 U is your ultimate meal planning and delivery solution. We
          provide personalized meal plans that cater to your dietary needs and
          schedules. Whether you&apos;re looking for a low-carb diet,
          high-protein meals, or plant-based options, we ensure delicious and
          healthy meals are delivered right to your doorstep.
        </p>
      </div>

      <div className="container mx-auto flex flex-wrap justify-center gap-8 mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <Image
            src="https://res.cloudinary.com/divyajujl/image/upload/v1741701673/desktop_main_image__6__pj5pre.webp"
            alt="Personalized Meal"
            width={350}
            height={300}
            className="mx-auto mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Personalized Meals
          </h3>
          <p className="text-gray-600">
            Customize your meal plans according to your dietary needs and taste
            preferences.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <Image
            src="https://res.cloudinary.com/divyajujl/image/upload/v1741701673/fodhbsnsmdlfea_pvnwbx.jpg"
            alt="Scheduled Delivery"
            width={350}
            height={300}
            className="mx-auto mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2 ">
            Scheduled Delivery
          </h3>
          <p className="text-gray-600">
            Set your delivery schedule to receive fresh, delicious meals when
            you need them.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/meals">
          <span className="px-6 py-3 bg-yellow-400 text-white text-lg font-bold rounded-full shadow-md hover:bg-yellow-500 transition cursor-pointer">
            Explore Our Meals
          </span>
        </Link>
      </div>
    </section>
  );
}
