"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 text-white">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Unlock Your Career with AI-Driven Success
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
            Level up your professional journey with personalized AI guidance, expert interview prep, and career tools designed for success.
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-md transition-all duration-300"
            >
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-white border-white hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-8 md:mt-12">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border-4 border-indigo-300 mx-auto transform transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
