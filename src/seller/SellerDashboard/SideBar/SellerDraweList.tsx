import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../../tempReduxToolkit/store";
import { performLogout } from "../../../tempReduxToolkit/features/Auth/AuthSlice";

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard sx={{ color: "primary.main" }} />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag sx={{ color: "primary.main" }} />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory sx={{ color: "primary.main" }} />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <AddBoxIcon sx={{ color: "primary.main" }} />,
    activeIcon: <AddBoxIcon className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet sx={{ color: "primary.main" }} />,
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt sx={{ color: "primary.main" }} />,
    activeIcon: <Receipt className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox sx={{ color: "primary.main" }} />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout sx={{ color: "primary.main" }} />,
    activeIcon: <Logout className="text-white" />,
  },
];

const SellerDraweList = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
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
    // <div className="h-full">
    //   <div className="flex flex-col justify-between h-full w-[300px] border-r border-gray-200 py-5">
    //     <div className="space-y-2">
    //       {menu.map((item) => (
    //         <div
    //           key={item.path}
    //           onClick={() => handleClick(item)}
    //           className="pr-9 cursor-pointer">
    //           <div
    //             className={`${item.path === location.pathname ? "bg-sky-700 text-white " : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full`}>
    //             <ListItemIcon>
    //               {location.pathname === item.path
    //                 ? item.activeIcon
    //                 : item.icon}
    //             </ListItemIcon>
    //             <ListItemText primary={item.name} />
    //             <DoubleArrowIcon />
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     <div className="space-y-2">
    //       <Divider />
    //       {menu2.map((item) => (
    //         <div
    //           key={item.path}
    //           onClick={() => handleClick(item)}
    //           className="pr-9 cursor-pointer">
    //           <div
    //             className={`${item.path === location.pathname ? "bg-sky-800 text-white " : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full`}>
    //             <ListItemIcon>
    //               {location.pathname === item.path
    //                 ? item.activeIcon
    //                 : item.icon}
    //             </ListItemIcon>
    //             <ListItemText primary={item.name} />
    //             <DoubleArrowIcon />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

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
      </div>
    </div>
  );
};

export default SellerDraweList;
