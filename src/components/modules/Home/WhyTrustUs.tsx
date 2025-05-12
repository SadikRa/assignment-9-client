/* eslint-disable react/no-unescaped-entities */
import { ShieldCheck, SearchCheck, Users } from "lucide-react";

const trustPoints = [
  {
    icon: <ShieldCheck className="text-indigo-600 w-8 h-8 mb-4" />,
    title: "Transparency Promise",
    description:
      "Every review is from real users. We strictly prohibit fake or paid content to ensure complete honesty.",
  },
  {
    icon: <SearchCheck className="text-indigo-600 w-8 h-8 mb-4" />,
    title: "Moderation & Verification",
    description:
      "Smart algorithms and human moderators work together to flag and remove suspicious content.",
  },
  {
    icon: <Users className="text-indigo-600 w-8 h-8 mb-4" />,
    title: "Community-Powered Insights",
    description:
      "Upvotes, downvotes, and comments help surface the most helpful reviews—curated by users like you.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-0 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Why Trust Us
        </h2>
        <p className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto">
          We're committed to transparency, integrity, and a community-driven
          approach to product reviews.
        </p>
        <div className="grid gap-10 md:grid-cols-3 text-justify">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-center"
            >
              {point.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
