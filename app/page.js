import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 md:py-32 lg:py-40 bg-gradient-to-r from-indigo-500 to-indigo-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-12 text-white">
            Elevate Your Career with Cutting-Edge Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-indigo-400 transition-colors duration-300 bg-white shadow-lg"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-2xl font-bold mb-4 text-indigo-600">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-extrabold text-indigo-600">50+</h3>
              <p className="text-gray-500">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-extrabold text-indigo-600">1000+</h3>
              <p className="text-gray-500">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-extrabold text-indigo-600">95%</h3>
              <p className="text-gray-500">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-extrabold text-indigo-600">24/7</h3>
              <p className="text-gray-500">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              How Our Platform Works
            </h2>
            <p className="text-lg text-gray-600">
              Accelerate your career growth in 4 simple steps with AI-powered
              guidance and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl text-indigo-600">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Hear from Our Successful Users
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-indigo-200"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <p className="text-sm text-indigo-600">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-gray-700 italic relative">
                        <span className="text-3xl text-indigo-600 absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {testimonial.quote}
                        <span className="text-3xl text-indigo-600 absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to the most common questions about our platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-indigo-600 font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-indigo-500 to-indigo-800 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl text-white">
            Ready to Unlock Your Potential?
          </h2>
          <p className="mx-auto max-w-[600px] text-white/80 md:text-xl">
            Join thousands of professionals leveraging AI to boost their career
            trajectory.
          </p>
          <Link href="/dashboard" passHref>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 mt-6 px-8 bg-indigo-600 hover:bg-indigo-700 text-white border-white border"
            >
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}