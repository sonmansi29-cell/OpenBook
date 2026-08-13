import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const sections = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'accounts', label: 'Account Responsibilities' },
  { id: 'purchases', label: 'Purchases & Pricing' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to These Terms' },
  { id: 'contact', label: 'Contact Us' },
]

function Terms() {
  const updatedLabel = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2F2F2F]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl rounded-[32px] border border-[#E6DDC8] bg-[#F5EDE1] px-6 py-10 text-center shadow-[0_24px_80px_-36px_rgba(0,0,0,0.35)] sm:px-10 lg:px-16 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#6B7A58]">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#2F2F2F] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg">
            Last updated: {updatedLabel}
          </p>
        </section>

        <section className="mx-auto mt-8 max-w-6xl rounded-[32px] border border-[#E6DDC8] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <aside className="lg:w-56">
              <nav aria-label="Terms of Service table of contents" className="rounded-2xl border border-[#E6DDC8] bg-[#F8F5EF] p-4 lg:sticky lg:top-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6B7A58]">
                  On this page
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[#5C5A52]">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="transition hover:text-[#6B7A58]">
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="flex-1 space-y-8 text-[15px] leading-8 text-[#3F3D37]">
              <section id="acceptance">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Acceptance of Terms</h2>
                <p className="mt-3">These Terms of Service govern your access to and use of OpenBook, including our website, account features, and purchases. By visiting or using OpenBook, you agree to these terms. If you do not agree, please do not use our services.</p>
              </section>

              <section id="accounts">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Account Responsibilities</h2>
                <p className="mt-3">You are responsible for providing accurate account information and for keeping your login credentials confidential. Please notify us promptly if you believe your account has been accessed without authorization. You must be old enough to form a binding agreement in your location to create an account.</p>
              </section>

              <section id="purchases">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Purchases & Pricing</h2>
                <p className="mt-3">When you place an order, you offer to purchase the selected items subject to availability and acceptance by OpenBook. Prices, promotions, and availability may change without notice. We aim for accuracy, but may correct errors in product details, pricing, or orders, including by cancelling an affected order and issuing a refund where appropriate.</p>
              </section>

              <section id="returns">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Returns & Refunds</h2>
                <p className="mt-3">Returns and refunds are handled according to our applicable returns policy. Please review that policy before making a purchase and contact our support team if you need help with an order. Nothing in these terms limits any consumer rights that cannot be excluded by law.</p>
              </section>

              <section id="intellectual-property">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Intellectual Property</h2>
                <p className="mt-3">The OpenBook name, branding, website design, text, graphics, and other original content are owned by or licensed to OpenBook and are protected by applicable intellectual-property laws. You may use the site for personal, non-commercial shopping and browsing only; you may not copy, reproduce, or distribute our content without permission.</p>
              </section>

              <section id="liability">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Limitation of Liability</h2>
                <p className="mt-3">To the fullest extent allowed by law, OpenBook is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for a claim related to a purchase will not exceed the amount you paid for the applicable order, except where law requires otherwise.</p>
              </section>

              <section id="governing-law">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Governing Law</h2>
                <p className="mt-3">These terms are governed by the laws applicable in Pune, India, without regard to conflict-of-law rules. Any dispute will be handled by the courts with appropriate jurisdiction, subject to any mandatory rights available to you under local law.</p>
              </section>

              <section id="changes">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Changes to These Terms</h2>
                <p className="mt-3">We may update these terms to reflect changes to our services, business practices, or legal requirements. The revised terms will be posted here with an updated date. Your continued use of OpenBook after the changes take effect means you accept the revised terms.</p>
              </section>

              <section id="contact">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Contact Us</h2>
                <p className="mt-3">Questions about these terms can be sent to <a href="mailto:hello@openbook.com" className="font-semibold text-[#6B7A58]">hello@openbook.com</a> or through our <Link to="/contact" className="font-semibold text-[#6B7A58]">contact page</Link>.</p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Terms
