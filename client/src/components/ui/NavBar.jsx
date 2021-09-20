import { Link } from "react-router-dom";
import { useAuth } from "../../context/providers/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Simple ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <Link className="nav-link" to="/products/new">
                  NewProduct
                </Link>
                <Link className="nav-link" to="/" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/auth/signup">
                Signup
              </Link>
            )}

            <Link className="nav-link active" aria-current="page" to="/cart">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
