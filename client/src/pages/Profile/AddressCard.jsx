import { FiEdit2, FiTrash2 } from 'react-icons/fi'

/**
 * AddressCard
 * -----------
 * Displays a single saved address. Shows a small olive "Default" badge on
 * the primary address and Edit/Delete icon buttons wired to the handlers
 * lifted up by the Addresses tab.
 */
function AddressCard({ address, onEdit, onDelete }) {
  return (
    <article className="relative rounded-2xl border border-[#E8E0CF] bg-white p-5 shadow-sm transition hover:shadow-md">
      {address.isDefault && (
        <span className="absolute right-4 top-4 rounded-full bg-[#6B7A58]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6B7A58]">
          Default
        </span>
      )}

      <div className="pr-16">
        <h3 className="text-sm font-bold text-[#2F2F2F]">{address.name}</h3>
        <div className="mt-2 space-y-0.5 text-sm leading-6 text-[#5C5A52]">
          <p>{address.line1}</p>
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}, {address.state} — {address.pin}
          </p>
          <p className="text-[#9A927F]">{address.phone}</p>
        </div>
      </div>

      {/* Edit / Delete actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-[#F0EAE0] pt-3">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#6B7A58] transition hover:bg-[#6B7A58]/10"
        >
          <FiEdit2 size={13} aria-hidden="true" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#D04545] transition hover:bg-[#D04545]/10"
        >
          <FiTrash2 size={13} aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  )
}

export default AddressCard

