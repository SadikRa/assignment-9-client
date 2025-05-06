import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-5 md:px-10 lg:px-20">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About <span className="text-yellow-400">Criti Check</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Criti Check is a modern Product Review Portal where users can create
          accounts, share honest product experiences, rate and categorize
          reviews, and engage with a growing community. From gadgets and fashion
          to books and beyond, Criti Check brings transparency to product
          opinions through user-generated content and admin-curated premium
          reviews. With a robust moderation system, premium content access, and
          voting features, our platform ensures quality and trust.
        </p>
      </div>

      <div className="container mx-auto flex flex-wrap justify-center gap-8 mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <Image
            src="https://res.cloudinary.com/divyajujl/image/upload/v1746554519/ss-rating-review-stars_ss4v8l.jpg"
            alt="Review System"
            width={350}
            height={300}
            className="mx-auto mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            User-Driven Reviews
          </h3>
          <p className="text-gray-600">
            Register to share your product experiences, add ratings, categorize
            reviews, and interact with others through votes and comments.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <Image
            src="https://res.cloudinary.com/divyajujl/image/upload/v1741701673/fodhbsnsmdlfea_pvnwbx.jpg"
            alt="Premium Content"
            width={350}
            height={300}
            className="mx-auto mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2 ">
            Premium Reviews
          </h3>
          <p className="text-gray-600">
            Unlock expert insights by accessing premium reviews with a one-time
            fee. Gain full access to high-value content and support quality
            writing.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <Image
            src="https://res.cloudinary.com/divyajujl/image/upload/v1746554520/Revised-NIST-Cyersecurity-Framework-Seurity-Magazine_g3anls.jpg"
            alt="Secure Access"
            width={350}
            height={300}
            className="mx-auto mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Safe & Secure
          </h3>
          <p className="text-gray-600">
            We use secure authentication, JWT-based sessions, and reliable
            Bangladeshi payment gateways like SSLCommerz and ShurjoPay.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/reviews">
          <span className="px-6 py-3 bg-yellow-400 text-white text-lg font-bold rounded-full shadow-md hover:bg-yellow-500 transition cursor-pointer">
            Explore Reviews
          </span>
        </Link>
      </div>
    </section>
  );
}
