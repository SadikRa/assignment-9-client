"use client";

import Loading from "@/components/ui/loading";
import { useUser } from "@/context/UserContext";
import { updateUser, UserInfo } from "@/services/AuthService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export interface UserDetails {
  name: string;
  email: string;
  number: string;
  city: string;
  colony: string;
  postOffice: string;
  subDistrict: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const fetchUserInfo = async (email: string) => {
    try {
      const response = await UserInfo(email);
      const result = response?.data?.result?.[0] || null;
      setUserInfo(result);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserInfo(user.email);
    }
  }, [user?.email]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDetails>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      number: user?.number || "",
      city: "",
      colony: "",
      postOffice: "",
      subDistrict: "",
    },
  });

  const onSubmit: SubmitHandler<UserDetails> = async (data) => {
    setLoading(true);

    try {
      const res = await updateUser(data, user?.email as string);
      toast.success(res.message);
      await fetchUserInfo(user?.email as string);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      number: userInfo?.number || "",
      city: userInfo?.city || "",
      colony: userInfo?.colony || "",
      postOffice: userInfo?.postOffice || "",
      subDistrict: userInfo?.subDistrict || "",
    });
  };

  if (!user || !userInfo) return <Loading></Loading>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        Profile
        <span className="bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-medium">
          {user.role}
        </span>
      </h1>
      <Image
        className="rounded-full border-4 border-gray-300 shadow-md"
        src={user.imgUrl}
        alt="profile"
        height={120}
        width={120}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-6"
      >
        {[
          { label: "Name", key: "name", required: true },
          { label: "Email", key: "email", disabled: true },
          { label: "Phone Number", key: "number" },
          { label: "City", key: "city" },
          { label: "Sub District", key: "subDistrict" },
          { label: "Colony", key: "colony" },
          { label: "Post Office", key: "postOffice" },
        ].map(({ label, key, required, disabled }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            {isEditing && !disabled ? (
              <input
                type="text"
                {...register(
                  key as keyof UserDetails,
                  required ? { required: `${label} is required` } : {}
                )}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="mt-1 text-lg text-gray-800 font-medium">
                {userInfo[key as keyof UserDetails]}
              </p>
            )}
            {errors[key as keyof UserDetails] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[key as keyof UserDetails]?.message}
              </p>
            )}
          </div>
        ))}
      </form>

      <div className="mt-6 flex gap-4">
        {isEditing ? (
          <>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 shadow-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 flex items-center gap-2 shadow-md cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
