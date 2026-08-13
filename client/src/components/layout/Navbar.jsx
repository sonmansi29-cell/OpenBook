import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import logo from "../../assets/images/logo/logo.png";
import books from "../../data/books";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

/**
 * Debounces a rapidly-changing value (e.g. keystrokes in the search input).
 * The live results dropdown only recomputes after the user pauses typing.
 */
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, initials, logout } = useAuth();
  const navigate = useNavigate();

  const wishlistCount = wishlist.length;

  // ---- Search panel state ----
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // ---- Mobile menu + account dropdown state ----
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const accountMenuRef = useRef(null);

  const debouncedQuery = useDebouncedValue(searchValue, 250);

  // Live-filtered suggestions from the existing static books data.
  const searchResults = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return books
      .filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Closes the search panel and clears its input in one go.
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchValue("");
  }, []);

  // Clicking outside the search box or account dropdown closes them.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(event.target)) {
        closeSearch();
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSearch]);

  // Escape key closes the search panel, mobile menu and account dropdown.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        setMobileMenuOpen(false);
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSearch]);

  // Auto-focus the input whenever the search panel opens.
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ---- Search handlers ----
  const openSearch = () => setSearchOpen(true);

  // Enter key / "View all results" -> navigate to the search results page.
  const submitSearch = (event) => {
    event.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  // Clicking a suggestion -> navigate straight to that book's page.
  const goToBook = (id) => {
    closeSearch();
    navigate(`/book/${id}`);
  };

  // ---- Account dropdown handlers ----
  const handleAccountNav = (path) => {
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F8F5EF]/95 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 shadow-md shadow-black/5"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="OpenBook"
              className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className="text-2xl xl:text-3xl font-bold text-[#6B7A58] transition-colors duration-300 group-hover:text-[#556248]"
              style={{ fontFamily: "Playfair Display" }}
            >
              OpenBook
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `group relative py-2 text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-[#6B7A58] after:transition-all after:duration-300 after:w-0 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B7A58] ${
                    isActive
                      ? "text-[#6B7A58] after:w-full"
                      : "text-[#2F2F2F] hover:text-[#6B7A58]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {/* ---------- SEARCH ---------- */}
            <div ref={searchWrapRef} className="relative">
              {!searchOpen ? (
                <button
                  type="button"
                  onClick={openSearch}
                  aria-label="Open search"
                  className="text-[#2F2F2F] transition-colors duration-300 hover:text-[#6B7A58] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
                >
                  <FiSearch size={22} />
                </button>
              ) : (
                <form onSubmit={submitSearch} role="search" className="navbar-search-form">
                  <FiSearch size={17} className="navbar-search-form-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search books…"
                    aria-label="Search books"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    aria-label="Close search"
                    className="navbar-search-close"
                  >
                    <FiX size={18} />
                  </button>

                  {/* Live results dropdown (only while there is a query) */}
                  {searchValue.trim() && (
                    <div className="navbar-search-dropdown">
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((book) => (
                            <button
                              key={book.id}
                              type="button"
                              className="navbar-search-result"
                              onClick={() => goToBook(book.id)}
                            >
                              <img src={book.image} alt="" className="navbar-search-result-img" />
                              <span className="navbar-search-result-info">
                                <span className="navbar-search-result-title">{book.title}</span>
                                <span className="navbar-search-result-author">{book.author}</span>
                              </span>
                            </button>
                          ))}
                          <button
                            type="button"
                            className="navbar-search-all"
                            onClick={submitSearch}
                          >
                            View all results for “{searchValue.trim()}”
                          </button>
                        </>
                      ) : (
                        <p className="navbar-search-empty">
                          No books match “{searchValue.trim()}”.
                        </p>
                      )}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* ---------- WISHLIST ---------- */}
            <Link
              to="/wishlist"
              className="relative text-[#2F2F2F] transition-colors duration-300 hover:text-[#6B7A58] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="navbar-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* ---------- CART ---------- */}
            <Link
              to="/cart"
              className="relative text-[#2F2F2F] transition-colors duration-300 hover:text-[#6B7A58] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
              aria-label={`Cart (${cartCount})`}
            >
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="navbar-badge">{cartCount}</span>
              )}
            </Link>

            {/* ---------- LOGIN / ACCOUNT DROPDOWN ---------- */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hidden lg:block bg-[#6B7A58] text-white px-6 py-2.5 rounded-full hover:bg-[#556248] transition-colors duration-300 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#556248]"
              >
                Login
              </Link>
            ) : (
              <div ref={accountMenuRef} className="relative hidden lg:block">
                {/* Avatar button with the user's initials */}
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B7A58] text-sm font-bold text-white shadow-sm transition hover:bg-[#556248] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#556248]"
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                >
                  {initials || <FiUser size={18} />}
                </button>

                {/* Dropdown: Profile / Orders / Logout */}
                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#E8E0CF]"
                  >
                    <div className="border-b border-[#F0EAE0] px-4 py-3">
                      <p className="truncate text-sm font-bold text-[#2F2F2F]">
                        {user?.name || "User"}
                      </p>
                      <p className="truncate text-xs text-[#9A927F]">{user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <button
                        type="button"
                        role="menuitem"
                        className="navbar-account-item"
                        onClick={() => handleAccountNav("/profile")}
                      >
                        <FiUser size={16} />
                        Profile
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="navbar-account-item"
                        onClick={() => handleAccountNav("/orders")}
                      >
                        <FiPackage size={16} />
                        Orders
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="navbar-account-item navbar-account-item-danger"
                        onClick={handleLogout}
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---------- MOBILE MENU TOGGLE ---------- */}
            <button
              type="button"
              className="lg:hidden text-[#2F2F2F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7A58]"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- MOBILE MENU PANEL ---------- */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E0CF] bg-[#F8F5EF] px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                    isActive
                      ? "bg-[#6B7A58]/10 text-[#6B7A58]"
                      : "text-[#2F2F2F] hover:bg-[#6B7A58]/5 hover:text-[#6B7A58]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 border-t border-[#E8E0CF] pt-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-full bg-[#6B7A58] py-3 text-center text-sm font-bold text-white transition hover:bg-[#556248]"
              >
                Login
              </Link>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="px-4 pb-2 text-sm font-bold text-[#2F2F2F]">
                  {user?.name || "User"}
                </p>
                <button
                  type="button"
                  className="rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#2F2F2F] transition hover:bg-[#6B7A58]/5 hover:text-[#6B7A58]"
                  onClick={() => handleAccountNav("/profile")}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#2F2F2F] transition hover:bg-[#6B7A58]/5 hover:text-[#6B7A58]"
                  onClick={() => handleAccountNav("/orders")}
                >
                  Orders
                </button>
                <button
                  type="button"
                  className="rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#D04545] transition hover:bg-[#D04545]/5"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

