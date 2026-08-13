import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const toc = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-your-information', label: 'How We Use Your Information' },
  { id: 'cookies-and-tracking', label: 'Cookies & Tracking Technologies' },
  { id: 'how-we-share-your-information', label: 'How We Share Your Information' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights-and-choices', label: 'Your Rights & Choices' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'changes-to-this-policy', label: 'Changes to This Policy' },
  { id: 'contact-us', label: 'Contact Us' },
]

function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg">
            Last updated: {updatedLabel}
          </p>
        </section>

        <section className="mx-auto mt-8 max-w-6xl rounded-[32px] border border-[#E6DDC8] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <aside className="lg:w-56">
              <div className="rounded-2xl border border-[#E6DDC8] bg-[#F8F5EF] p-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6B7A58]">
                  On this page
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[#5C5A52]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-[#6B7A58]">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="flex-1 space-y-8 text-[15px] leading-8 text-[#3F3D37]">
              <section id="introduction">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Introduction</h2>
                <p className="mt-3">
                  Welcome to OpenBook. This Privacy Policy explains how we collect,
                  use, store, and protect your personal information when you visit
                  our bookstore website, create an account, place an order, or sign
                  up for our newsletter.
                </p>
                <p className="mt-3">
                  By using OpenBook, you agree to the practices described in this
                  policy. This policy applies to visitors, registered users, and
                  customers in the regions where our services are available.
                </p>
              </section>

              <section id="information-we-collect">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  Information We Collect
                </h2>
                <p className="mt-3">
                  We may collect information that identifies you directly or through
                  reasonable inferences, including your name, email address,
                  shipping address, phone number, account credentials, and order
                  history.
                </p>
                <p className="mt-3">
                  We also collect payment-related information required to complete
                  purchases, such as billing details and transaction identifiers,
                  though we do not store full payment card numbers ourselves. In
                  addition, we may collect browsing behavior, device information,
                  IP address, and cookie data to improve site performance and
                  personalize your experience.
                </p>
              </section>

              <section id="how-we-use-your-information">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  How We Use Your Information
                </h2>
                <p className="mt-3">
                  We use your information to process and fulfill orders, personalize
                  product recommendations, communicate about your account or
                  purchases, respond to support requests, and improve the quality of
                  our website and services.
                </p>
                <p className="mt-3">
                  We may also use your email address to send transactional messages,
                  product updates, and promotional content. You can unsubscribe from
                  marketing emails at any time by using the link in the email or by
                  contacting us directly.
                </p>
              </section>

              <section id="cookies-and-tracking">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  Cookies & Tracking Technologies
                </h2>
                <p className="mt-3">
                  OpenBook uses cookies and similar technologies to remember your
                  preferences, keep your cart intact, analyze site traffic, and
                  understand how visitors use our services. These technologies help us
                  deliver a faster and more relevant shopping experience.
                </p>
                <p className="mt-3">
                  You can adjust your browser settings to refuse cookies or alert you
                  before cookies are stored, though some site functionality may be
                  limited as a result.
                </p>
              </section>

              <section id="how-we-share-your-information">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  How We Share Your Information
                </h2>
                <p className="mt-3">
                  We may share your information with trusted service providers such as
                  payment processors, shipping partners, email service providers, and
                  analytics tools that help us operate the site. These partners are
                  only permitted to use the information as needed to provide their
                  services to us.
                </p>
                <p className="mt-3">
                  We do not sell personal data to third parties for marketing or
                  advertising purposes. We may also disclose information when required
                  by law, court order, or to protect the safety and security of our
                  users and platform.
                </p>
              </section>

              <section id="data-security">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Data Security</h2>
                <p className="mt-3">
                  We take reasonable administrative, technical, and physical
                  safeguards to protect personal information from unauthorized access,
                  loss, misuse, or disclosure. While no system is completely immune to
                  risk, we use commercially reasonable practices to protect your data.
                </p>
              </section>

              <section id="your-rights-and-choices">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  Your Rights & Choices
                </h2>
                <p className="mt-3">
                  Depending on your location, you may have the right to access,
                  correct, update, or delete your personal information, or to limit
                  certain uses of it. You may also request a copy of the personal data
                  we hold about you.
                </p>
                <p className="mt-3">
                  To exercise these rights or update your preferences, please contact
                  us using the details below. You can also unsubscribe from marketing
                  emails at any time.
                </p>
              </section>

              <section id="childrens-privacy">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  Children's Privacy
                </h2>
                <p className="mt-3">
                  OpenBook is not intended for children under the age of 13. We do
                  not knowingly collect personal information from children under 13
                  without appropriate parental consent where required by law.
                </p>
              </section>

              <section id="changes-to-this-policy">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                  Changes to This Policy
                </h2>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, features, or legal requirements. When we
                  make material updates, we will revise the “Last updated” date above
                  and post the revised policy on this page.
                </p>
              </section>

              <section id="contact-us">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">Contact Us</h2>
                <p className="mt-3">
                  If you have questions about this Privacy Policy or our data
                  practices, please contact us at{' '}
                  <a href="mailto:hello@openbook.com" className="font-semibold text-[#6B7A58]">
                    hello@openbook.com
                  </a>{' '}
                  or visit our{' '}
                  <Link to="/contact" className="font-semibold text-[#6B7A58]">
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
