"use client";
import { useEffect } from "react";

export default function AppStorePage() {
  useEffect(() => {
    const userAgent = window.navigator?.userAgent?.toUpperCase();
    console.log("User Agent:", userAgent);

    if (userAgent?.match(/IPHONE|IPAD/)) {
      window.location.href =
        "https://apps.apple.com/au/app/loanshopper/id6464032507";
    } else if (userAgent?.match(/ANDROID/)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=au.com.loanshopper";
    } else {
      window.location.href = "https://loanshopper.com.au";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-white">
      <img
        src="/assets/images/LoanShopper_LR.png"
        alt="LoanShopper Logo"
        className="w-64"
      />
      <p className="mt-4 text-gray-700">Redirecting to the App Store...</p>
    </div>
  );
}
