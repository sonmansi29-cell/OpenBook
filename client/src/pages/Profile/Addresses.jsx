import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { mockAddresses } from './profileData'
import AddressCard from './AddressCard'

/**
 * Addresses
 * ---------
 * Grid of saved address cards plus an "+ Add New Address" card that opens
 * an inline form (Name, Address Line 1/2, City, State, PIN, Phone).
 *
 * State is fully local/mock: adding appends to a copy of the mock data,
 * editing pre-fills the same form, and deleting removes after a window.confirm.
 * A newly added address becomes the Default if none exists yet.
 */
function Addresses() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
  }

  const [form, setForm] = useState(emptyForm)

  const openAddForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingId(address.id)
    setForm({ ...address })
    setFormOpen(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (editingId) {
      // Save edits back onto the existing card.
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? { ...address, ...form, isDefault: address.isDefault }
            : address,
        ),
      )
    } else {
      // Append a new card; make it default if it's the first one.
      const isDefault = addresses.length === 0
      setAddresses((prev) => [
        ...prev,
        {
          id: `addr-${Date.now()}`,
          ...form,
          isDefault,
        },
      ])
    }
    setFormOpen(false)
    setEditingId(null)
  }

  const handleDelete = (address) => {
    // Simple confirm — a nicer modal can replace this once there's a backend.
    if (window.confirm(`Delete the address for "${address.name}"?`)) {
      setAddresses((prev) => prev.filter((item) => item.id !== address.id))
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#D8D0BA] bg-[#FBF9F4] py-3 pl-4 pr-4 text-sm text-[#2F2F2F] outline-none transition focus:border-[#6B7A58] focus:ring-4 focus:ring-[#6B7A58]/15'

  return (
    <div>
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#2F2F2F]">Saved Addresses</h3>
          <p className="mt-1 text-sm text-[#5C5A52]">
            Manage the addresses you use for shipping.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-full bg-[#6B7A58] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
        >
          <FiPlus size={15} aria-hidden="true" />
          Add New Address
        </button>
      </header>

      {/* ----- Inline add/edit form ----- */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-[#6B7A58]/30 bg-[#FBF9F4] p-6 shadow-sm"
        >
          <h4 className="text-base font-bold text-[#2F2F2F]">
            {editingId ? 'Edit Address' : 'Add a New Address'}
          </h4>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="addr-name" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                Name
              </label>
              <input
                id="addr-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-phone" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                Phone
              </label>
              <input
                id="addr-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addr-line1" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                Address Line 1
              </label>
              <input
                id="addr-line1"
                name="line1"
                type="text"
                required
                value={form.line1}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addr-line2" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                Address Line 2 <span className="font-normal text-[#9A927F]">(optional)</span>
              </label>
              <input
                id="addr-line2"
                name="line2"
                type="text"
                value={form.line2}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-city" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                City
              </label>
              <input
                id="addr-city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-state" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                State
              </label>
              <input
                id="addr-state"
                name="state"
                type="text"
                required
                value={form.state}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addr-pin" className="mb-2 block text-sm font-semibold text-[#2F2F2F]">
                PIN Code
              </label>
              <input
                id="addr-pin"
                name="pin"
                type="text"
                required
                inputMode="numeric"
                value={form.pin}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#6B7A58] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] hover:shadow-md"
            >
              {editingId ? 'Save Changes' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false)
                setEditingId(null)
              }}
              className="rounded-full border border-[#D8D0BA] bg-white px-6 py-2.5 text-sm font-bold text-[#2F2F2F] transition hover:bg-[#F8F5EF]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ----- Address grid ----- */}
      {addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => openEditForm(address)}
              onDelete={() => handleDelete(address)}
            />
          ))}

          {/* "+ Add New Address" dashed card */}
          <button
            type="button"
            onClick={openAddForm}
            className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D8D0BA] bg-[#FBF9F4] text-[#9A927F] transition hover:border-[#6B7A58] hover:bg-[#6B7A58]/5 hover:text-[#6B7A58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#6B7A58] shadow-sm">
              <FiPlus size={20} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold">Add New Address</span>
          </button>
        </div>
      ) : (
        /* Empty state when all addresses are deleted */
        <button
          type="button"
          onClick={openAddForm}
          className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D8D0BA] bg-[#FBF9F4] text-[#9A927F] transition hover:border-[#6B7A58] hover:text-[#6B7A58]"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#6B7A58] shadow-sm">
            <FiPlus size={22} aria-hidden="true" />
          </span>
          <span className="text-sm font-bold">Add your first address</span>
        </button>
      )}
    </div>
  )
}

export default Addresses

