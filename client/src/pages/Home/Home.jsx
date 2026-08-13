import Navbar from '../../components/layout/Navbar'
import Hero from '../../components/home/Hero/Hero'
import FeaturedCollections from '../../components/home/FeaturedCollections/FeaturedCollections'
import WeeklyReads from '../../components/books/WeeklyReads'
import BestSellers from '../../components/home/BestSellers/BestSellers'
import FeaturedAuthors from '../../components/home/FeaturedAuthors/FeaturedAuthors'
import ReadingJournal from '../../components/home/ReadingJournal/ReadingJournal'
import Newsletter from '../../components/home/Newsletter/Newsletter'
import Footer from '../../components/layout/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <WeeklyReads />
      <BestSellers />
      <FeaturedAuthors />
      <ReadingJournal />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
