"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

export default function UserDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back, {user?.user?.name}👋
      </h1>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-muted p-4 rounded-xl shadow">
          <h2 className="text-sm text-muted-foreground">Total Products</h2>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-white dark:bg-muted p-4 rounded-xl shadow">
          <h2 className="text-sm text-muted-foreground">Total Reviews</h2>
          <p className="text-2xl font-bold">178</p>
        </div>
        <div className="bg-white dark:bg-muted p-4 rounded-xl shadow">
          <h2 className="text-sm text-muted-foreground">Average Rating</h2>
          <p className="text-2xl font-bold">4.5 ⭐</p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-gray-200 p-4 flex flex-col justify-between">
            <h3 className="font-semibold">Xiaomi Redmi Note 12</h3>
            <p className="text-sm text-muted-foreground">Rating: 4.2 ⭐</p>
          </div>
          <div className="aspect-video rounded-xl bg-gray-200 p-4 flex flex-col justify-between">
            <h3 className="font-semibold">Samsung Galaxy A54</h3>
            <p className="text-sm text-muted-foreground">Rating: 4.7 ⭐</p>
          </div>
          <div className="aspect-video rounded-xl bg-gray-200 p-4 flex flex-col justify-between">
            <h3 className="font-semibold">Realme Narzo 60X</h3>
            <p className="text-sm text-muted-foreground">Rating: 4.3 ⭐</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-muted p-6 rounded-xl shadow mt-4">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <ul className="text-sm space-y-1">
          <li>✅ You reviewed “Xiaomi Redmi Note 12” - 5⭐</li>
          <li>📝 You added a new product: “Realme Narzo 60X”</li>
          <li>⭐ You rated “Samsung Galaxy A54” - 4⭐</li>
        </ul>
      </div>
    </div>
  );
}
