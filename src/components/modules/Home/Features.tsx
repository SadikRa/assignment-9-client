// components/Features.tsx
export default function Features() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <FeatureCard
          title="Personalized Meals"
          description="Customize meals based on dietary preferences."
        />
        <FeatureCard
          title="Convenient Delivery"
          description="Get meals delivered to your doorstep."
        />
        <FeatureCard
          title="Quality Ingredients"
          description="Fresh, high-quality ingredients used."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg text-center shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
