import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaCheckToSlot, FaTable, FaTableList } from "react-icons/fa6";
import { GiStabbedNote } from "react-icons/gi";
import { MdDining, MdSchedule, MdScheduleSend } from "react-icons/md";
import { RiPieChart2Fill } from "react-icons/ri";


export const menuItems = [
    {
        title: "Dashboard",
        path: '/',
        icon: RiPieChart2Fill
    },
    {
        title: "Booking Management",
        path: '/booking-management',
        icon: GiStabbedNote
    },
    {
      title: "Slots",
      path: '/slots',
      icon: FaCheckToSlot
    },
    {
      title: "Create Restaurant",
      path: '/create-restaurant',
      icon: FaCheckToSlot
    },
    {
      title: "Dining",
      path: '/dining',
      icon: MdDining
    },
    {
      title: "Schedules",
      path: '/schedules',
      icon: MdScheduleSend
    },
    {
      title: "Table List",
      path: '/tables',
      icon: FaTable
    },
    {
      title: "Table Booking Schedule",
      path: '/table-booking-schedule',
      icon: MdSchedule
    },
    {
      title: "Table Booking List",
      path: '/table-booking-list',
      icon: FaTableList
    },
    // {
    //   title: "Table Booking",
    //   path: '/table-booking',
    //   icon: MdSchedule
    // },
    {
        title: "Menu", 
        path: '/menu',
        icon: BsMenuButtonWideFill
    },
    // {
    //     title: "Add Category",
    //     path: '/add-category',
    //     icon: MdOutlineCategory
    // },
  
]


export const subMenuItems = [
  {
    title: "Terms & Conditions",
    path: "/terms-conditions",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "FAQS",
    path: "/faqs",
  },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
];