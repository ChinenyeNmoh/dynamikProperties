'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { logOut } from '@/app/actions/register';
import Swal from 'sweetalert2';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showRent, setShowRent] = useState(false)
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [showShortlet, setShowShortlet] = useState(false)
  const { data, status } = useSession();
  const user = data?.user;
  
  useEffect(() => {
    if ( typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setSession(JSON.parse(storedUser));
      }
    } 
  }, [ ]);

  const deleteHandler = async () => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F8444F",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Delete"
    });

    if (result.isConfirmed) {
        setShowProfileMenu(false);
        localStorage.removeItem('userInfo');
        if (user) {
         
            signOut({ callbackUrl: '/' });
        } else {
            await logOut();
            router.push('/');
            window.location.reload(); // Refresh the page
        }
    }
};


//Lets close the mobile menu when the screen is resized to a larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  



  const pathName = usePathname();
  const isActive = (path) =>
    pathName === path
      ? 'bg-blue-600 hover:bg-slate-500 text-white hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:text-white rounded-md px-3 py-2';

  return (
    <nav 
    className="bg-slate-900 border-b border-slate-900 "
    onMouseLeave={() => {
      setShowRent(false)
      setShowBuy(false)
      setShowShortlet(false)
    }
    }
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex  items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={showMobileMenu ? 'true' : 'false'}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                src="/images/logo-white.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2 mr-10 md:mr-0">
                dynamik Properties
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-10 md:block">
              <div className="flex space-x-2"
              
              >
              <div 
                className="relative"
                >
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                    aria-controls="buy-menu"
                    aria-expanded={showBuy ? 'true' : 'false'}
                    onMouseEnter={() => {
                      setShowBuy(!showBuy)
                      setShowRent(false)
                      setShowShortlet(false)
                    }
                    }
                    
                    
                  >
                    <span className="sr-only">Open buy menu</span>
                    <span className="text-white">Buy</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showBuy && (
                    <div
                      id="buy-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="buy-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/properties" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-0">
                        All
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-2">
                        Lands
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-3">
                        Commercial Properties
                      </Link>
                    </div>
                  )}
                </div>
                {/* rent button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative ml-4 md:ml-0 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                    aria-controls="buy-menu"
                    aria-expanded={showRent ? 'true' : 'false'}
                    onMouseEnter={() => {
                      setShowRent(!showRent)
                      setShowBuy(false)
                      setShowShortlet(false)
                    }
                  }
                    
                  >
                    <span className="sr-only">Open rent menu</span>
                    <span className="text-white">Rent</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showRent && (
                    <div
                      id="rent-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="rent-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/properties" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-0">
                        All
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-2">
                        Lease Lands
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-3">
                        Commercial Properties
                      </Link>
                    </div>
                  )}
                </div>
                {/* shortlet button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative ml-4 md:ml-0 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                    aria-controls="shortlet-menu"
                    aria-expanded={showShortlet ? 'true' : 'false'}
                    onMouseEnter={() => {
                      setShowShortlet(!showShortlet)
                      setShowBuy(false)
                      setShowRent(false)
                    }
                    }
                  >
                    <span className="sr-only">Open shortlet menu</span>
                    <span className="text-white">Shortlet</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showShortlet && (
                    <div
                      id="shortlet-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="shortlet-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-0">
                        All
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-2">
                        House
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {(!session  && !user && status !== 'loading') && (
            <>
            <Link href="/register" className="hidden md:block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
            Sign Up
            </Link>
            <Link href="/login" className="hidden md:block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
            Sign In
            </Link>
            </>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {(session  || user) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="messages.html" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                </span>
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-6 mr-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={showProfileMenu ? 'true' : 'false'}
                    aria-haspopup="true"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src="/images/profile.png"
                      alt="Profile picture"
                      width={100}
                      height={40}
                    />
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {showProfileMenu && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link href="/profile" className="block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                      Your Profile
                    </Link>
                    <Link href="/properties/add" className="block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                      Add Properties
                    </Link>
                    <Link href="/saved-properties" className="block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                      Saved Properties
                    </Link>
                    <button
                      onClick={deleteHandler}
                     className="block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600" role="menuitem" tabIndex="-1" id="user-menu-item-2"
                     >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {showMobileMenu && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
          <div className="relative">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-buy-menu"
                    aria-expanded={showBuy ? 'true' : 'false'}
                    onClick={() => {
                      setShowBuy(!showBuy)
                      setShowRent(false)
                      setShowShortlet(false)
                    }
                    }
                  >
                    <span className="sr-only">Open buy menu</span>
                    <span className="text-white">Buy</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showBuy && (
                    <div
                      id="mobile-buy-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="buy-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/properties" className={`${isActive('/')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-0">
                        All
                      </Link>
                      <Link href="/properties" className={`${isActive('/properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="/properties" className={`${isActive('/properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-2">
                        House
                      </Link>
                      <Link href="/commercial-properties" className={`${isActive('/commercial-properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="buy-menu-item-3">
                        Commercial Properties
                      </Link>
                    </div>
                  )}
                </div>
                {/* rent button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative  inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="buy-menu"
                    aria-expanded={showRent ? 'true' : 'false'}
                    onClick={() => {
                      setShowRent(!showRent)
                      setShowBuy(false)
                      setShowShortlet(false)
                    }
                    }
                  >
                    <span className="sr-only">Open rent menu</span>
                    <span className="text-white">Rent</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showRent &&  (
                    <div
                      id="rent-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="rent-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/properties" className={`${isActive('/')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-0">
                        All
                      </Link>
                      <Link href="/properties" className={`${isActive('/properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="/properties" className={`${isActive('/properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-2">
                        House
                      </Link>
                      <Link href="/commercial-properties" className={`${isActive('/commercial-properties')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="rent-menu-item-3">
                        Commercial Properties
                      </Link>
                    </div>
                  )}
                  
                </div>
                {/* shortlet button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative  inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="shortlet-menu"
                    aria-expanded={showShortlet ? 'true' : 'false'}
                    onClick={() => {
                      setShowShortlet(!showShortlet)
                      setShowBuy(false)
                      setShowRent(false)
                    }
                    }
                  >
                    <span className="sr-only">Open shortlet menu</span>
                    <span className="text-white">Shortlet</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showShortlet && (
                    <div
                      id="shortlet-menu"
                      className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="shortlet-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-0">
                        All
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-1">
                        Flats & Apartments
                      </Link>
                      <Link href="#" className={`${isActive('#')} block px-4 py-2 text-sm text-white font-bold hover:bg-blue-600`} role="menuitem" tabIndex="-1" id="shortlet-menu-item-2">
                        House
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            {(!session && !user && status !== 'loading') && (
               <>
               <Link href="/register" className="block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
               Sign Up
               </Link>
               <Link href="/login" className="block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
               Sign In
               </Link>
               </>
            )}
          </div>
      )}
    </nav>
  );
};

export default Header;
