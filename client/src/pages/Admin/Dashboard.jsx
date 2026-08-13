import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'

function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F5EF] py-28">
        <Container>
          <SectionHeading subtitle="Admin" title="Dashboard" />
          <div className="rounded-[24px] bg-white p-8 text-sm text-[#5C5A52] shadow-lg ring-1 ring-[#E8E0CF]">
            Analytics, books CRUD, authors CRUD, orders, customers, inventory, and coupons metrics will live here.
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
