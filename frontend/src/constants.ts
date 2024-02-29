
import {
    UserCircleIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon
  } from "@heroicons/react/24/solid";



export const protocol: string = window.location.protocol
export const host: string = window.location.hostname
export const backendPort: string = "8000"
export const staticPath: string = "static"
export const logoFilePath: string = "logo/logo.svg"

const logoPath: string = `${protocol}//${host}:${backendPort}/${staticPath}/${logoFilePath}`

// needed?
export const BACKEND_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000/api' : ''



export const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    // {
    //   label: "Edit Profile",
    //   icon: Cog6ToothIcon,
    // },
    // {
    //   label: "Inbox",
    //   icon: InboxArrowDownIcon,
    // },
    // {
    //   label: "Help",
    //   icon: LifebuoyIcon,
    // },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];


export const navbarLinks = []
// if (process.env.NODE_ENV === "development") {
//   export const logoPathNew = logoPath

// }
// else {
//     export const logoPath
// }