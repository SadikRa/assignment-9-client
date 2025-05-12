interface HeroSectionProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
}

export const HeroSection = ({
  title,
  subtitle,
  showSearch = true,
}: HeroSectionProps) => {
  return (
    <section className=" bg-gray-50 flex flex-col items-center justify-center text-center mx-auto py-24 lg:pt-64 px-6">
      <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-3 text-lg sm:text-xl max-w-xl">
          {subtitle}
        </p>
      )}
      {showSearch && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl">
          <input
            type="text"
            placeholder="Search reviews..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition">
            Search
          </button>
        </div>
      )}
    </section>
  );
};
