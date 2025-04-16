"use client";

import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  TrendingUp,
  Shield,
  Star,
  User,
  MapPin,
  Phone,
  Smile,
  CheckSquare,
  FileText,
} from "lucide-react";

// Dynamically load react-slick to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow hover:scale-105 cursor-pointer"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow hover:scale-105 cursor-pointer"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function AnimatedInView({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
}

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const features = [
  {
    title: "Personalized Recommendations",
    description:
      "Tailor-made property suggestions that match your style, budget, and preferences.",
    icon: <TrendingUp className="w-16 h-16 text-primary" />,
  },
  {
    title: "Verified Listings",
    description:
      "Browse up-to-date and verified property listings in Chapel Hill.",
    icon: <Shield className="w-16 h-16 text-primary" />,
  },
  {
    title: "Local Expert Insights",
    description:
      "Receive insider recommendations directly from local real estate experts.",
    icon: <Star className="w-16 h-16 text-primary" />,
  },
];

const howItWorks = [
  {
    title: "Sign Up",
    description: "Quickly create an account to unlock personalized features.",
    icon: <User className="w-16 h-16 text-primary" />,
  },
  {
    title: "Set Preferences",
    description:
      "Tell us your budget, location, and property type for tailored results.",
    icon: <MapPin className="w-16 h-16 text-primary" />,
  },
  {
    title: "Chat with Our Bot",
    description:
      "Interact in real-time with our intelligent chatbot and receive instant property suggestions.",
    icon: <Phone className="w-16 h-16 text-primary" />,
  },
  {
    title: "Connect with Agents",
    description:
      "Get directly connected with trusted local agents for further details.",
    icon: <Phone className="w-16 h-16 text-primary" />,
  },
];

const chatAdvantages = [
  {
    title: "Real-Time Chat",
    description:
      "Experience dynamic conversations that instantly respond to your queries.",
    icon: <Smile className="w-16 h-16 text-primary" />,
  },
  {
    title: "Tailored Guidance",
    description:
      "Get recommendations and insights crafted specifically for you.",
    icon: <CheckSquare className="w-16 h-16 text-primary" />,
  },
  {
    title: "Interactive Experience",
    description:
      "Unlike static listings, enjoy a live chat that adapts to your needs.",
    icon: <FileText className="w-16 h-16 text-primary" />,
  },
];

const testimonials = [
  {
    testimonial:
      "EstateWise made finding my dream home in Chapel Hill a breeze. The interactive chat is a total game changer!",
    author: "— Alice",
  },
  {
    testimonial:
      "The property recommendations feel so personalized. I truly enjoyed chatting with the bot.",
    author: "— Bob",
  },
  {
    testimonial:
      "I love the interactive approach. It’s not just browsing listings – it’s a conversation that guides me.",
    author: "— Charlie",
  },
];

const faqs = [
  {
    question: "How do I sign up?",
    answer:
      "Simply click the 'Sign Up' button on the homepage and follow the prompts to create your account.",
  },
  {
    question: "Are the listings verified?",
    answer:
      "Yes, all listings featured on EstateWise are thoroughly verified and updated regularly.",
  },
  {
    question: "How does the chatbot work?",
    answer:
      "Simply share your preferences and chat with our smart bot—it will instantly provide tailored property suggestions.",
  },
  {
    question: "How can I access the properties?",
    answer:
      "Our chatbot directly refers you to the property listings on Zillow, where you can explore further details!",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>EstateWise | Your Chapel Hill Property Assistant</title>
        <meta
          name="description"
          content="Discover dynamic, real-time property recommendations in Chapel Hill using our interactive chatbot."
        />
      </Head>
      <div className="font-sans overflow-x-hidden">
        {/* Global smooth scrolling */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>

        {/* Full Screen Hero Section */}
        <section
          className="relative min-h-screen w-full border-4 border-primary"
          style={{
            backgroundImage: "url('/home.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
            <AnimatedInView delay={0}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                EstateWise
              </h1>
            </AnimatedInView>
            <AnimatedInView delay={0.2}>
              <p className="text-lg md:text-2xl text-white mb-8">
                Chat with our intelligent bot for real-time, personalized real
                estate recommendations.
              </p>
            </AnimatedInView>
            <AnimatedInView delay={0.4}>
              <Link href="/chat">
                <Button className="rounded-full px-8 py-4 text-lg hover:scale-105 transition-transform">
                  Explore Properties
                </Button>
              </Link>
            </AnimatedInView>
            <AnimatedInView delay={0.6}>
              <Link href="#features">
                <Button className="mt-4 rounded-full px-8 py-4 text-lg transition-transform duration-300 hover:translate-y-2">
                  Learn More <ArrowDown className="w-5 h-5 inline-block ml-2" />
                </Button>
              </Link>
            </AnimatedInView>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-background text-foreground py-20 px-4"
        >
          <AnimatedInView delay={0}>
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Features</h2>
              <p className="text-lg text-muted-foreground">
                Discover what makes EstateWise your smart property companion in
                Chapel Hill.
              </p>
            </div>
          </AnimatedInView>
          <AnimatedInView delay={0.1}>
            <Slider {...sliderSettings}>
              {features.map((item, index) => (
                <div key={index} className="px-4">
                  <AnimatedInView>
                    <Card className="h-64 shadow-lg border-primary">
                      <CardHeader className="flex flex-col items-center">
                        {item.icon}
                        <CardTitle className="mt-2 text-2xl font-bold">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 text-center text-muted-foreground">
                        {item.description}
                      </CardContent>
                    </Card>
                  </AnimatedInView>
                </div>
              ))}
            </Slider>
          </AnimatedInView>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="bg-background text-foreground py-20 px-4"
        >
          <AnimatedInView delay={0}>
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Follow these simple steps and let our chatbot guide your home
                search.
              </p>
            </div>
          </AnimatedInView>
          <AnimatedInView delay={0.1}>
            <Slider {...sliderSettings}>
              {howItWorks.map((step, index) => (
                <div key={index} className="px-4">
                  <AnimatedInView>
                    <Card className="h-64 shadow-lg border-primary">
                      <CardHeader className="flex flex-col items-center">
                        {step.icon}
                        <CardTitle className="mt-2 text-2xl font-bold">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 text-center text-muted-foreground">
                        {step.description}
                      </CardContent>
                    </Card>
                  </AnimatedInView>
                </div>
              ))}
            </Slider>
          </AnimatedInView>
        </section>

        {/* Interactive Chat Advantage Section */}
        <section
          id="chat-advantage"
          className="bg-background text-foreground py-20 px-4"
        >
          <AnimatedInView delay={0}>
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Interactive Chat Experience
              </h2>
              <p className="text-lg text-muted-foreground">
                Enjoy real-time, interactive property recommendations that adapt
                to your queries.
              </p>
            </div>
          </AnimatedInView>
          <AnimatedInView delay={0.1}>
            <Slider {...sliderSettings}>
              {chatAdvantages.map((item, index) => (
                <div key={index} className="px-4">
                  <AnimatedInView>
                    <Card className="h-64 shadow-lg border-primary">
                      <CardHeader className="flex flex-col items-center">
                        {item.icon}
                        <CardTitle className="mt-2 text-2xl font-bold">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 text-center text-muted-foreground">
                        {item.description}
                      </CardContent>
                    </Card>
                  </AnimatedInView>
                </div>
              ))}
            </Slider>
          </AnimatedInView>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="bg-background text-foreground py-20 px-4"
        >
          <AnimatedInView delay={0}>
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
              <p className="text-lg text-muted-foreground">
                Hear from our satisfied users who have found their perfect home.
              </p>
            </div>
          </AnimatedInView>
          <AnimatedInView delay={0.1}>
            <Slider {...sliderSettings}>
              {testimonials.map((item, index) => (
                <div key={index} className="px-4">
                  <AnimatedInView>
                    <Card className="h-64 shadow-lg border-primary">
                      <CardContent className="flex flex-col justify-evenly text-center">
                        <p className="italic">{item.testimonial}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-bold">{item.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedInView>
                </div>
              ))}
            </Slider>
          </AnimatedInView>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-background text-foreground py-20 px-4">
          <AnimatedInView delay={0}>
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find answers to some of our most common queries.
              </p>
            </div>
          </AnimatedInView>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <AnimatedInView key={index} delay={0.1}>
                <Card className="shadow-lg rounded-lg p-6 transition-transform hover:scale-102 border-primary">
                  <h3 className="text-2xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              </AnimatedInView>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-background text-muted-foreground py-8 px-4 text-center shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">
              © {new Date().getFullYear()}{" "}
              <strong className="font-bold">EstateWise</strong>. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link
                href="/privacy"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm">Privacy Policy</span>
              </Link>
              <Link
                href="/terms"
                className="flex items-center hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4 mr-1" />
                <span className="text-sm">Terms of Service</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
