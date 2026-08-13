import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiChevronDown,
  FiCheckCircle,
} from 'react-icons/fi'

import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Container from '../../components/common/Container'

/* ------------------------------------------------------------------ */
/*  Reveal — reusable scroll-animation wrapper.                        */
/*  Fades content in and slides it up as it enters the viewport,       */
/*  matching the pattern used across the About and Blog pages.         */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  ContactForm — white card with the "Send us a message" form.        */
/*  Includes client-side validation (required fields + email regex)    */
/*  and a local success state so no backend is needed.                 */
/* ------------------------------------------------------------------ */
function ContactForm() {
  /* Form field state */
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })

  /* Per-field error messages, keyed by field name */
  const [errors, setErrors] = useState({})

  /* Whether the form has been submitted successfully recently */
  const [submitted, setSubmitted] = useState(false)

  /* Subject options for the dropdown */
  const subjects = [
    'General Inquiry',
    'Order Support',
    'Book Recommendation',
    'Partnership',
    'Other',
  ]

  /* Update a single field and clear its error as the user types */
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  /* Validate the form and return an object of field-level errors */
  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) nextErrors.message = 'Please write a short message.'
    return nextErrors
  }

  /* Handle submit: validate, then show the success state */
  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' })
    }
  }

  /* Shared input classes: rounded, cream/white bg, olive focus ring */
  const inputClasses =
    'mt-2 w-full rounded-xl border border-[#D8D0BA] bg-[#F8F5EF] px-4 py-3 text-sm text-[#2F2F2F] placeholder:text-[#A3A08E] outline-none transition focus:border-[#6B7A58] focus:ring-2 focus:ring-[#6B7A58]/25'

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-[#E8E0CF] sm:p-8">
      <h2
        className="text-2xl font-bold text-[#2F2F2F] sm:text-3xl"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Send us a message
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#5C5A52]">
        Questions, recommendations, or just want to say hello — we read every
        message and reply within one working day.
      </p>

      {/* Success state shown after a valid submit */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-xl border border-[#D8D0BA] bg-[#EFF4E8] p-6 text-center"
          role="status"
        >
          <FiCheckCircle
            size={40}
            className="mx-auto text-[#6B7A58]"
            aria-hidden="true"
          />
          <h3 className="mt-3 text-lg font-bold text-[#2F2F2F]">
            Message sent!
          </h3>
          <p className="mt-1 text-sm text-[#5C5A52]">
            Thanks for reaching out. We'll get back to you at{' '}
            <span className="font-semibold text-[#6B7A58]">{form.email || 'your email'}</span> soon.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 rounded-full border border-[#6B7A58] px-5 py-2.5 text-sm font-semibold text-[#6B7A58] transition hover:bg-[#6B7A58] hover:text-white"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        /* The form itself */
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="text-sm font-semibold text-[#2F2F2F]">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Reader"
              aria-required="true"
              aria-invalid={!!errors.name}
              className={inputClasses}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-[#C0392B]" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="text-sm font-semibold text-[#2F2F2F]">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              className={inputClasses}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-[#C0392B]" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject dropdown */}
          <div>
            <label htmlFor="contact-subject" className="text-sm font-semibold text-[#2F2F2F]">
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={inputClasses}
            >
              {subjects.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Message textarea */}
          <div>
            <label htmlFor="contact-message" className="text-sm font-semibold text-[#2F2F2F]">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us how we can help…"
              rows={5}
              aria-required="true"
              aria-invalid={!!errors.message}
              className={`${inputClasses} resize-y`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs font-medium text-[#C0392B]" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Pill-shaped submit button */}
          <button
            type="submit"
            className="w-full rounded-full bg-[#6B7A58] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#556248] focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40 focus:ring-offset-2 sm:w-auto"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ContactInfoCard — the right column with store details.             */
/*  Info blocks with icons, a rounded map placeholder, and circular    */
/*  olive outlined social buttons.                                     */
/* ------------------------------------------------------------------ */
function ContactInfoCard() {
  /* Store detail rows: icon, title, value (React node), and a tagline */
  const infoBlocks = [
    {
      icon: <FiMapPin />,
      title: 'Address',
      value: 'Pune, India',
      tagline: 'Come browse our shelves',
    },
    {
      icon: <FiMail />,
      title: 'Email',
      value: (
        <a
          href="mailto:hello@openbook.com"
          className="font-medium text-[#6B7A58] transition-colors hover:text-[#556248]"
        >
          hello@openbook.com
        </a>
      ),
      tagline: 'We reply within a day',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      value: (
        <a
          href="tel:+919999999999"
          className="font-medium text-[#6B7A58] transition-colors hover:text-[#556248]"
        >
          +91 XXXXX XXXXX
        </a>
      ),
      tagline: 'Call during shop hours',
    },
    {
      icon: <FiClock />,
      title: 'Store Hours',
      value: 'Mon–Sat: 10am–8pm',
      tagline: 'Sun: 11am–6pm',
    },
  ]

  /* Social links shown as circular olive-outlined buttons */
  const socials = [
    { icon: <FiInstagram />, label: 'Instagram', href: '#' },
    { icon: <FiTwitter />, label: 'Twitter', href: '#' },
    { icon: <FiFacebook />, label: 'Facebook', href: '#' },
  ]

  return (
    <div className="flex h-full flex-col rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-[#E8E0CF] sm:p-8">
      <h2
        className="text-2xl font-bold text-[#2F2F2F] sm:text-3xl"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Visit or reach us
      </h2>

      {/* Store info blocks */}
      <ul className="mt-6 space-y-5">
        {infoBlocks.map((block) => (
          <li key={block.title} className="flex items-start gap-4">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF4E8] text-lg text-[#6B7A58]">
              {block.icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7A58]">
                {block.title}
              </p>
              <p className="mt-0.5 text-sm leading-6 text-[#2F2F2F]">
                {block.value}
              </p>
              <p className="text-xs leading-5 text-[#A3A08E]">{block.tagline}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Map embed placeholder — swap for a real Google Maps iframe */}
      <div className="mt-7 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[16px] bg-[#EFF4E8] ring-1 ring-[#D8D0BA]">
        <div className="text-center px-6">
          <FiMapPin size={32} className="mx-auto text-[#6B7A58]" aria-hidden="true" />
          <p className="mt-2 text-sm font-semibold text-[#2F2F2F]">Find us on the map</p>
          <p className="mt-1 text-xs text-[#5C5A52]">Pune, India</p>
        </div>
      </div>

      {/* Social icons — circular olive-outlined buttons */}
      <div className="mt-7 flex items-center gap-3">
        <p className="text-sm font-semibold text-[#2F2F2F]">Follow us</p>
        <div className="flex gap-2.5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={`OpenBook on ${social.label}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B7A58] text-[#6B7A58] transition hover:bg-[#6B7A58] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B7A58]/40"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQAccordionItem — a single accessible, expandable FAQ item.       */
/*  Uses aria-expanded on the button, aria-controls on the panel,      */
/*  and animates open/close with framer-motion.                        */
/* ------------------------------------------------------------------ */
function FAQAccordionItem({ question, answer, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#D8D0BA] bg-white">
      {/* Clickable header row */}
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#F5F0E3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6B7A58]/40"
      >
        <span className="text-sm font-semibold text-[#2F2F2F] sm:text-base">
          {question}
        </span>
        <FiChevronDown
          size={20}
          aria-hidden="true"
          className={`shrink-0 text-[#6B7A58] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Animated collapsible panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-6 text-[#5C5A52]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQSection — full-width mini FAQ below the two columns.            */
/*  Only one item is expanded at a time for a tidy look.               */
/* ------------------------------------------------------------------ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What are your shipping times?',
      answer:
        'In-stock orders are dispatched within 24 hours. Standard delivery across India takes 3–5 working days, while metro cities usually receive their books within 2–3 days. You will receive a tracking link as soon as your order ships.',
    },
    {
      question: 'Do you accept returns?',
      answer:
        'Yes. If a book arrives damaged or is not what you ordered, we will replace it or refund you within 7 days of delivery. For change of mind, items in their original condition can be returned within 7 days of purchase.',
    },
    {
      question: 'Can I track my order?',
      answer:
        'Absolutely. Once your order is packed, we email you a tracking number and a link so you can follow your parcel from our shelves to your doorstep.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer:
        'We do! Choose the gift-wrap option at checkout and we will wrap your book in our signature paper, complete with a handwritten note if you add one.',
    },
  ]

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      {/* Section heading */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]">
          FAQ
        </p>
        <h2
          className="mt-3 text-3xl font-bold text-[#2F2F2F] sm:text-4xl"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Quick answers before you write in
        </h2>
      </div>

      {/* Accordion list */}
      <div className="mt-8 space-y-3">
        {faqs.map((faq, index) => (
          <FAQAccordionItem
            key={faq.question}
            index={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact — the main page component.                                 */
/*  Reuses Navbar/Footer, Container, and the site's design tokens.     */
/*  Two-column layout on desktop, stacked on mobile, FAQ full width.   */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <>
      <Navbar />

      <main>
        {/* ---------- HERO ----------
            Centered editorial hero on the cream background, matching the
            pattern used on the About and Blog pages. */}
        <section className="bg-[#F8F5EF] py-20 text-center lg:py-28">
          <Container>
            {/* Small uppercase olive label, letter-spaced */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6B7A58]"
            >
              Contact
            </motion.p>

            {/* Large Playfair headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#2F2F2F] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Let's talk books
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C5A52] sm:text-lg"
            >
              Reach out for recommendations, order help, or just to share what
              you're reading — we'd love to hear from you.
            </motion.p>
          </Container>
        </section>

        {/* ---------- CONTACT CONTENT ----------
            Two-column layout: form on the left, store info on the right.
            Stacks into a single column on mobile. */}
        <section className="bg-[#F8F5EF] pb-20 lg:pb-28">
          <Container>
            <div className="grid items-start gap-8 lg:grid-cols-2">
              {/* Left — contact form */}
              <Reveal>
                <ContactForm />
              </Reveal>

              {/* Right — store info & details */}
              <Reveal delay={0.15}>
                <ContactInfoCard />
              </Reveal>
            </div>

            {/* FAQ mini-section — full width below both columns */}
            <Reveal>
              <FAQSection />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Contact
