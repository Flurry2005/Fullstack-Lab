import { Link } from "react-router-dom";
import { useAuth } from "./Context/useAuth";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <>
      <header className="flex justify-between px-10 pt-3">
        <h2 className="text-[#CCFF00] text-l ">KINETIC EDGE</h2>
        <nav>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 rounded-2xl text-xs w-15 h-7"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="bg-lime-500 rounded-2xl text-xs w-15 flex justify-center items-center text-center h-7"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default NavBar;
