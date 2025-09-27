import Footer from "@/common/components/Footer"
import ClientSection from "@/components/ClientSection"
import HeroSection from "@/components/HeroSection"
import TeamSection from "@/components/TeamSection"


const Home = () => {
  return (
    <>
      <HeroSection />
      <TeamSection />
      <ClientSection />
      <div className="h-[25px] bg-white" />
      <Footer />

    </>
  )
}

export default Home
