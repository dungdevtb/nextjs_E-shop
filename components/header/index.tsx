import { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "components/context/theme-context";
import { actionGetDetailCart } from "pages/common";

type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [haveToken, setHaveToken] = useState(false)

  const [dataCart, setDataCart] = useState<any>([]);
  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    (async () => {
      await actionGetDetailCart({}).then((res) => {
        setDataCart(res)
      })
    })()
  }, [])

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  useEffect(() => {
    if (localStorage?.getItem("token")) {
      setHaveToken(true)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);


  const handleClickLogout = () => {
    try {
      if (window.confirm('Are you sure, you want to logout?')) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.assign('/login')
      }
    } catch (error: any) {
      alert("Logout failed!")
    }
  }

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <a onClick={() => router.push('/')}>
          <h1 className="site-logo">
            <Logo />
            E-Shop
          </h1>
        </a>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <a onClick={() => router.push('/products')}>Product</a>
          <a onClick={() => router.push('/news')}>News</a>
          <a onClick={() => router.push('/rooms')}>Rooms</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""
              }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          <DarkModeSwitch
            className="dark-toggle"
            checked={theme === "light" ? false : true}
            onChange={toggleTheme}
            moonColor={!onTop ? "white" : "black"}
            sunColor={!onTop ? "black" : "white"}
            size={24}
          />
          {/* <Link href="/cart" legacyBehavior> */}
          <a onClick={() => router.push('/cart')}>
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {dataCart?.cart_product?.length > 0 && (
                <span className="btn-cart__count">{dataCart?.cart_product?.length}</span>
              )}
            </button>
          </a>
          {/* </Link> */}
          {/* <Link href="/login" legacyBehavior>
            <button className="site-header__btn-avatar">
              <i className="icon-avatar"></i>
            </button>
          </Link> */}

          {haveToken ?
            <div className="dropdown" style={{ float: 'right' }}>
              <button className="site-header__btn-avatar dropbtn">
                <i className="icon-avatar"></i>
              </button>
              <div className="dropdown-content">
                <a onClick={handleClickLogout}>Logout</a>
              </div>
            </div>
            :
            <div className="dropdown" style={{ float: 'right' }}>
              <button className="site-header__btn-avatar dropbtn">
                <i className="icon-avatar"></i>
              </button>
              <div className="dropdown-content">
                <a onClick={() => router.push('/login')}>Login</a>
                <a onClick={() => router.push('/register')}>Register</a>
              </div>
            </div>
          }
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
