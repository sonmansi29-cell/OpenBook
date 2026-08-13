import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.footer
      className="border-t border-[#D8D0BF] bg-[#F5F0E3]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-[#5C5A52] sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-bold text-[#6B7A58]">OpenBook</p>
          <p className="mt-3 max-w-xs leading-6">
            Beautiful stories for every reader.
          </p>
          <ul className="mt-4 space-y-2">
            <li>📍 Pune, India</li>
            <li>📧 hello@openbook.com</li>
            <li>☎ +91 XXXXX XXXXX</li>
          </ul>

          <div className="mt-5">
            <p className="font-semibold text-[#2F2F2F]">Follow Us</p>
            <div className="mt-2 flex gap-3 text-[#6B7A58]">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Twitter</span>
              <span>Pinterest</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[#2F2F2F]">Shop</p>
          <ul className="mt-3 space-y-2">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Gift Cards</li>
            <li>Coming Soon</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[#2F2F2F]">Customer Care</p>
          <ul className="mt-3 space-y-2">
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[#2F2F2F]">Newsletter</p>
          <div className="mt-3 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="h-12 rounded-full border border-[#D8D0BF] bg-white px-4 text-sm outline-none"
            />
            <button className="rounded-full bg-[#6B7A58] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#556248]">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold text-[#2F2F2F]">Quick Links</p>
            <ul className="mt-3 space-y-2">
              <li>Featured Authors</li>
              <li>Reading Journal</li>
              <li>Newsletter</li>
            </ul>
          </div>

          <div className="mt-6 text-xs text-[#6B7A58]">
            <p>© 2026 OpenBook</p>
            <p className="mt-1">Made with ❤️ using React</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
