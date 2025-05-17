import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaCheckToSlot, FaTable, FaTableList } from "react-icons/fa6";
import { GiStabbedNote } from "react-icons/gi";
import { MdDining, MdSchedule, MdScheduleSend } from "react-icons/md";
import { RiPieChart2Fill, RiRestaurantLine } from "react-icons/ri";

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
  // {
  //   title: "Dashboard",
  //   path: "/dashboard",
  //   icon: RiPieChart2Fill,
  // },
  // {
  //   title: "Restaurant",
  //   path: '/restaurant',
  //   icon: RiRestaurantLine
  // },
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
    title: "Booking Calendar (App)",
    path: "/reservation-calendar",
    icon: FaTable,
  },
  {
    title: "Booking Management",
    path: "/booking-management",
    icon: GiStabbedNote,
  },
  {
    title: "Waitlist",
    path: "/waitlist",
    icon: GiStabbedNote,
  },
  // {
  //   title: "Table Booking Schedule",
  //   path: '/table-booking-schedule',
  //   icon: MdSchedule
  // },
  {
    title: "Table Booking List",
    path: "/table-booking-list",
    icon: FaTableList,
  },
  // {
  //   title: "Table Booking",
  //   path: '/table-booking',
  //   icon: MdSchedule
  // },
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
  // {
  //     title: "Add Category",
  //     path: '/add-category',
  //     icon: MdOutlineCategory
  // },
];

export const subMenuItems = [
  {
    title: "Business Hours",
    path: "/restaurant/business-hours",
  },
  {
    title: "Reviews",
    path: "/restaurant/reviews",
  },
  {
    title: "Cuisine",
    path: "/restaurant/cuisine",
  },
  {
    title: "Social Media",
    path: "/restaurant/social-media",
  },
  // {
  //   title: "Restaurant Features",
  //   path: "/restaurant/features",
  // },
];



