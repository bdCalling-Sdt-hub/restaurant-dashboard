import { BsMenuButtonWideFill } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCheckToSlot, FaTable, FaTableList } from "react-icons/fa6";
import { MdDining, MdPreview, MdScheduleSend } from "react-icons/md";
import { RiCalendarScheduleFill, RiPieChart2Fill, RiRestaurantLine } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";

export const menuItems = [
  // {
  //     title: "Dashboard",
  //     path: '/',
  //     icon: RiPieChart2Fill
  // },
  {
    title: "Restaurant",
    path: "/",
    icon: RiRestaurantLine,
  },
  // {
  //   title: "Location Form",
  //   path: "/map",
  //   icon: RiRestaurantLine,
  // },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: RiPieChart2Fill,
  },
  {
    title: "Slots",
    path: "/slots",
    icon: FaCheckToSlot,
  },
  {
    title: "Schedules",
    path: "/schedules",
    icon: MdScheduleSend,
  },
  {
    title: "Table List",
    path: "/tables",
    icon: FaTable,
  },
  {
    title: "Booking Schedule (App)",
    path: "/reservation-calendar",
    icon: RiCalendarScheduleFill,
  },
  {
    title: "Booking Management",
    path: "/booking-management",
    icon: TbBrandBooking,
  },
  {
    title: "Waitlist",
    path: "/waitlist",
    icon: CiNoWaitingSign,
  },
  {
    title: "Table Booking List",
    path: "/table-booking-list",
    icon: FaTableList,
  },
  {
    title: "Menu",
    path: "/menu",
    icon: BsMenuButtonWideFill,
  },
  {
    title: "Dining",
    path: "/dining",
    icon: MdDining,
  },
   {
    title: "Reviews",
    path: "/reviews",
    icon: MdPreview,
  }
];




