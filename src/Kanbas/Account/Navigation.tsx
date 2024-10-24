import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={"/Kanbas/Account/" + link} className={`list-group-item  border border-0
        ${pathname.includes(link) ? "active" : "text-danger"}`}>{link}</Link>
      ))}
      {/* <Link to={`/Kanbas/Account/Signin`} className="list-group-item text-danger border border-0" > Signin  </Link> <br/>
      <Link to={`/Kanbas/Account/Signup`}  className="list-group-item text-danger border border-0"> Signup  </Link> <br/>
      <Link to={`/Kanbas/Account/Profile`} className="list-group-item text-danger border border-0"> Profile </Link> <br/> */}
    </div>
);}

// {links.map((link) => (
//   <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
//         ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
//     {link.icon({ className: "fs-1 text-danger"})}
//     <br />
//     {link.label}
//   </Link>
// ))}