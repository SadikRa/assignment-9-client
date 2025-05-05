// components/Featured.tsx

import Image from "next/image";

interface Meal {
  title: string;
  description: string;
  dietaryPreferences: string[];
  price: string;
  availability: boolean;
  image: string;
}

const featuredMeals: Meal[] = [
  {
    title: "Healthy Bowl",
    description: "A nutritious mix of greens and protein.",
    dietaryPreferences: ["Gluten-Free", "High-Protein"],
    price: "$12.99",
    availability: true,
    image:
      "https://i.ibb.co.com/VWg4Vdr/salad-from-tomatoes-cucumber-red-onions-lettuce-leaves-healthy-summer-vitamin-menu-vegan-vegetable-f.jpg",
  },
  {
    title: "Keto Special",
    description: "Low-carb, high-protein meal for keto lovers.",
    dietaryPreferences: ["Keto", "Low-Carb"],
    price: "$14.99",
    availability: true,
    image: "https://i.ibb.co.com/gjjQcP9/2.jpg",
  },
  {
    title: "Vegan Delight",
    description: "Plant-based meals full of flavor.",
    dietaryPreferences: ["Vegan", "Dairy-Free"],
    price: "$10.99",
    availability: false,
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1741709552/Vegan-Caprese-Delight_-done_phidoi.png",
  },
];

export default function Featured() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center">Featured Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {featuredMeals.map((meal, index) => (
          <FeatureCard key={index} meal={meal} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ meal }: { meal: Meal }) {
  return (
    <div className="p-6 border rounded-lg text-center shadow-md">
      <Image
        width={300}
        height={300}
        src={meal.image}
        alt={meal.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{meal.title}</h3>
      <p className="mt-2 text-gray-600">{meal.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Dietary: {meal.dietaryPreferences.join(", ")}
      </p>
      <p className="mt-2 font-bold">{meal.price}</p>
      <p
        className={`mt-2 text-sm ${
          meal.availability ? "text-green-500" : "text-red-500"
        }`}
      >
        {meal.availability ? "Available" : "Out of Stock"}
      </p>
    </div>
  );
}
