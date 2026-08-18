import airbnbLogo from "../assets/airbnb.png";

function Navbar() {
  return (
    <nav className="h-17.5 flex items-center px-9 shadow-md ">
      <img src={airbnbLogo} alt="Airbnb Logo" className="w-25" />
    </nav>
  );
}

export default Navbar;
