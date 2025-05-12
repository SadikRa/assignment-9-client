import { getMyProfile } from "@/services/Profile";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const { data: myProfileData } = await getMyProfile();

  const { email, role, status, isCompleteProfile, company, user } =
    myProfileData || {};

  const defaultProfileImage = "https://github.com/shadcn.png";
  const profileImage = user?.profileImage || defaultProfileImage;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <span
            className={`px-3 py-1 text-sm rounded-full font-semibold ${
              status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow">
            <Image
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              {user?.name || "N/A"}
            </h2>
            <p className="text-gray-500">{email}</p>
            <p className="text-sm text-gray-400">Role: {role}</p>
            <p className="text-sm text-gray-400">
              Profile Completed:{" "}
              <span
                className={
                  isCompleteProfile ? "text-green-600" : "text-red-500"
                }
              >
                {isCompleteProfile ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-gray-50 p-6 rounded-xl border space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            🏢 Company Details
          </h3>
          <p>
            <strong className="text-gray-600">Name:</strong> {company?.name}
          </p>
          <p>
            <strong className="text-gray-600">Website:</strong>{" "}
            <a href={company?.website} className="text-blue-600 underline">
              {company?.website}
            </a>
          </p>
          <p>
            <strong className="text-gray-600">Description:</strong>{" "}
            {company?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
