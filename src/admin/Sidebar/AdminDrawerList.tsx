import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Category,
  Dashboard,
  Home,
  IntegrationInstructions,
  Inventory,
  LocalOffer,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../tempReduxToolkit/store";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard sx={{ color: "primary.main" }} />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructions sx={{ color: "primary.main" }} />,
    activeIcon: <IntegrationInstructions className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <Add sx={{ color: "primary.main" }} />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Home Page",
    path: "/admin/home-grid",
    icon: <Home sx={{ color: "primary.main" }} />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <OfflineBoltIcon sx={{ color: "primary.main" }} />,
    activeIcon: <OfflineBoltIcon className="text-white" />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category sx={{ color: "primary.main" }} />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer sx={{ color: "primary.main" }} />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <Logout sx={{ color: "primary.main" }} />,
    activeIcon: <Logout className="text-white" />,
  },
];

const AdminDrawerList = () => {
  const user = useAppSelector((store) => store.user);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handle logout");
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      handleLogout();
    }
    navigate(item.path);
    // if(toggleDrawer) toggleDrawer(false)
  };
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r border-gray-200 py-5">
        <div className="space-y-2">
          {menu.map((item) => {
            const isActive = item.path === location.pathname;
            return (
              <div
                key={item.path}
                onClick={() => handleClick(item)}
                className="pr-9 cursor-pointer">
                <div
                  className={`flex items-center px-5 py-3 rounded-r-full ${
                    isActive ? "bg-sky-700 text-white" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "white"
                      : "var(--mui-palette-primary-main)",
                  }}>
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "primary.main",
                    }}>
                    {isActive ? item.activeIcon : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <DoubleArrowIcon
                    sx={{
                      color: isActive ? "white" : "primary.main",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <Divider />
          {menu2.map((item) => {
            const isActive = item.path === location.pathname;

            return (
              <div
                key={item.path}
                onClick={() => handleClick(item)}
                className="pr-9 cursor-pointer">
                <div
                  className={`flex items-center px-5 py-3 rounded-r-full ${
                    isActive ? "bg-sky-800 text-white" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "white"
                      : "var(--mui-palette-primary-main)",
                  }}>
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "primary.main",
                    }}>
                    {isActive ? item.activeIcon : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <DoubleArrowIcon />
                  {user.user?.fullName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDrawerList;
