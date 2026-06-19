import VideoIntro from "@/components/VideoIntro";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <VideoIntro
        firstName="Sathyajith"
        lastName=""
        tagline="Breaking software before users do."
        role="QA Engineer — Project Coordinator"
      />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
