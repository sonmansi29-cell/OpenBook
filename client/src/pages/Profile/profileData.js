/**
 * profileData.js
 * --------------
 * Mock data for the Profile dashboard. There is no backend yet, so these
 * arrays stand in for a real orders/addresses API. Book covers referenced
 * by `items` (book ids) are resolved against src/data/books.js in the
 * components that need them.
 */

/* Date the mock account was created — shown in the quick-stats row. */
export const MEMBER_SINCE = 'March 2024'

/* Colour-coded pill classes per order status, matching the site palette. */
export const statusStyles = {
  Delivered: 'bg-[#E7F2E3] text-[#2E7D32]',
  Shipped: 'bg-[#E8F0FA] text-[#1F5FA8]',
  Processing: 'bg-[#FBF3DF] text-[#A67C00]',
}

/* Mock order history — newest first. `items` are book ids from books.js. */
export const mockOrders = [
  {
    id: 'OB-1042',
    date: '12 Jan 2025',
    status: 'Delivered',
    total: 1798,
    items: [1, 3, 5],
  },
  {
    id: 'OB-1031',
    date: '28 Dec 2024',
    status: 'Shipped',
    total: 849,
    items: [4],
  },
  {
    id: 'OB-1018',
    date: '14 Nov 2024',
    status: 'Processing',
    total: 1148,
    items: [2, 8],
  },
]

/* Mock saved shipping addresses. Only one can carry the Default badge. */
export const mockAddresses = [
  {
    id: 'addr-1',
    name: 'Priya Sharma',
    line1: '14, Rosewood Apartments',
    line2: 'MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560038',
    phone: '+91 98450 12345',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Priya Sharma',
    line1: 'B-204, Palm Meadows',
    line2: 'Outer Ring Road, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560103',
    phone: '+91 98450 12345',
    isDefault: false,
  },
]

