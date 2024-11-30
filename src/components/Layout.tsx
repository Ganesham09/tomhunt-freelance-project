import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Store, ClipboardList } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
              >
                <Store className="h-6 w-6 mr-2" />
                <span className="font-semibold">
                  {" "}
                  Tom Hunt Insurance Claims
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/claims"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <ClipboardList className="h-5 w-5 inline-block mr-1" />
                Claims
              </Link>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
