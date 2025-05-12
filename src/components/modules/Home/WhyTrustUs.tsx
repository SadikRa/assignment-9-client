const trustPoints = [
  {
    title: "Transparency Promise",
    description:
      "Every review on our platform is submitted by real users. We do not allow fake or paid reviews. Our platform thrives on honesty.",
  },
  {
    title: "Moderation & Verification",
    description:
      "All content is moderated by our team and verified through smart algorithms. Suspicious or abusive entries are flagged and removed.",
  },
  {
    title: "Community-Powered Insights",
    description:
      "Users can upvote, downvote, and comment on reviews. The best feedback surfaces to the top—powered by our trusted community.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-0">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Why Trust Us
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We believe in full transparency and community-driven quality. Here why
          thousands trust our review platform.
        </p>
        <div className="grid gap-8 md:grid-cols-3 text-left">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
