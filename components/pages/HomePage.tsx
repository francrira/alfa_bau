"use client";
import Hero from "@/components/Hero";
import HomeServices from "@/components/HomeServices";
import HomeWork from "@/components/HomeWork";
import HomeProcess from "@/components/HomeProcess";
import References from "@/components/References";
import ContactSection from "@/components/ContactSection";
import HomeScrollReveal from "@/components/HomeScrollReveal";
export default function HomePage() {
  return <HomeScrollReveal><Hero /><HomeServices /><HomeWork /><HomeProcess /><References /><ContactSection /></HomeScrollReveal>;
}
