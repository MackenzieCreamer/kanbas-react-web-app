import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const notActive = "list-group-item text-white bg-black text-center border-0"
  const active = "list-group-item text-center border-0 text-danger bg-white"
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
         className="list-group rounded-0 position-fixed
         bottom-0 top-0 d-none d-md-block z-2 bg-black">
      <a id="wd-neu-link" target="_blank" 
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0">
        <img src="/images/NEU.png" width="75px" /></a><br />
      <Link to="/Kanbas/Account" id="wd-account-link"
        className={`nav-link ${pathname.includes("Account") ? active : notActive}`}>
        <FaRegCircleUser className="fs-1 text text-white" /><br />
        Account </Link>
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link"
        className={`nav-link ${pathname.includes("Dashboard") ? active : notActive}`}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard </Link>
      <Link to="/Kanbas/Dashboard" id="wd-course-link"
        className={notActive}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses </Link>
      <Link to="/Kanbas/Calendar" id="wd-calendar-link"
        className={`nav-link ${pathname.includes("Calendar") ? active : notActive}`}>
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar </Link>
      <Link to="/Kanbas/Inbox" id="wd-inbox-link"
        className={`nav-link ${pathname.includes("Inbox") ? active : notActive}`}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox </Link>
      <Link to="/Labs" id="wd-labs-link"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs </Link>
    </div>
);}
