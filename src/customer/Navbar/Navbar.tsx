import {
  AccountCircle,
  AddShoppingCart,
  FavoriteBorder,
  Menu,
  Search,
  Storefront,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import { mainCategory } from "../../data/Category/mainCategory";
import CategorySheet from "./CategorySheet";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../tempReduxToolkit/store";
import DrawerList from "./DrawerList";

const Navbar = () => {
  // const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const { user, auth, cart, seller } = useAppSelector((store) => store);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (seller.profile?._id) {
      navigate("/seller");
    } else navigate("/become-seller");
  };
  return (
    // <Box className="sticy  top-0 right-0 bg-white blur-bg bg-opacity-80">
    //   <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b border-gray-200">
    //     <div className="flex items-center gap-9">
    //       <div className="flex items-center gap-2">
    //         {!isLarge && (
    //           <IconButton>
    //             <Menu className="text-gray-700" sx={{ fontSize: 29 }} />
    //           </IconButton>
    //         )}
    //         <h1
    //           onClick={() => navigate("/")}
    //           className="logo text-lg md:text-2xl cursor-pointer">
    //           Choice Bazaar
    //         </h1>
    //       </div>
    //       <ul className="flex items-center font-medium text-gray-800">
    //         {mainCategory.map((item) => (
    //           <li
    //             onMouseLeave={() => setShowSheet(false)}
    //             onMouseEnter={() => {
    //               setShowSheet(true);
    //               setSelectedCategory(item.categoryid);
    //             }}
    //             key={item.categoryid}
    //             className="mainCategory hover:text-[#004e98] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#004e98] flex items-center">
    //             {item.name}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="flex items-center gap-5">
    //       <IconButton>
    //         <Search sx={{ fontSize: 29 }} />
    //       </IconButton>
    //       {user.user?.fullName ? (
    //         <Button
    //           onClick={() => navigate("/account")}
    //           className="flex items-center gap-2">
    //           <Avatar
    //             src="https://media.istockphoto.com/id/496193549/vector/young-boy-using-laptop.jpg?s=612x612&w=0&k=20&c=3K3GAvi4x4q5goS1hU0agLMJm5s3wrk-h3RPD2WA8bs="
    //             sx={{ width: 29, height: 29 }}
    //           />
    //           <h1>{user.user?.fullName}</h1>
    //         </Button>
    //       ) : (
    //         <Button
    //           onClick={() => navigate("/login")}
    //           variant="contained"
    //           startIcon={<AccountCircle />}>
    //           Login
    //         </Button>
    //       )}
    //       <IconButton>
    //         <FavoriteBorder sx={{ fontSize: 29 }} />
    //       </IconButton>
    //       <IconButton onClick={() => navigate("/cart")}>
    //         <AddShoppingCart sx={{ fontSize: 29 }} />
    //       </IconButton>
    //       <Button
    //         onClick={() => navigate("/become-seller")}
    //         variant="outlined"
    //         startIcon={<Storefront />}>
    //         Become Seller
    //       </Button>
    //     </div>
    //   </div>
    //   {showSheet && (
    //     <div
    //       onMouseLeave={() => setShowSheet(false)}
    //       onMouseEnter={() => setShowSheet(true)}
    //       className="categorySheet absolute top-[4.4rem] left-20 right-20">
    //       <CategorySheet
    //         selectedCategory={selectedCategory}
    //         setShowSheet={setShowSheet}
    //       />
    //     </div>
    //   )}
    // </Box>

    <Box
      sx={{ zIndex: 2 }}
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 ">
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()}>
                <Menu className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg md:text-2xl  text-[#00927c]">
              Choice zone
            </h1>
          </div>

          {isLarge && (
            <ul
              className="flex it
          ems-center font-medium text-gray-800 ">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => {
                    // setSelectedCategory("")
                    setShowSheet(false);
                  }}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  className="mainCategory hover:text-[#00927c] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center">
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={() => navigate("/search-products")}>
            <Search className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2">
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                // src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc0abe627/homepage/ShopByGender/Woman.jpg"
              />
              <h1 className="font-semibold hidden lg:block">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircle sx={{ fontSize: "12px" }} />}
              onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorder sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <AddShoppingCart sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<Storefront />}
              variant="outlined">
              Become Seller
            </Button>
          )}
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20 ">
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
