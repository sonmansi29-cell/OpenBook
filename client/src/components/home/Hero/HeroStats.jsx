import { motion } from 'framer-motion'

const stats = [
  { value: '10K+', label: 'Books' },
  { value: '500+', label: 'Authors' },
  { value: '50K+', label: 'Readers' },
]

function HeroStats() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className="rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur"
        >
          <p className="text-3xl font-bold">{item.value}</p>
          <p className="mt-1 text-sm text-gray-300">{item.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default HeroStats
