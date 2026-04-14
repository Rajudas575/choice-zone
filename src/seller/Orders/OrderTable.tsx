import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../tempReduxToolkit/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../tempReduxToolkit/features/seller/sellerOrderSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main, // ✅ primary color
    color: theme.palette.primary.contrastText, // ✅ readable text
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const OrderStatus = [
  { color: "#FFA500", label: "PENDING" },
  { color: "#F58CBA", label: "PLACED" },
  { color: "#F58CBA", label: "CONFIRMED" },
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERED" },
  { color: "#FF0000", label: "CANCELLED" },
];

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.sellerOrder);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder = (orderId: number, orderStatus: any) => {
    // console.log("updated order", id, status);
    handleClose();
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt"),
        orderId,
        orderStatus,
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shopping Address</StyledTableCell>
            <StyledTableCell align="right">Ordert Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell component="th" scope="row">
                {order._id}
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex gap-1 flex-wrap">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-5">
                      <img
                        className="w-20 rounded-md"
                        src={item.product.images[0]}
                      />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title: {item.product.title}</h1>
                        <h1>Price: ₹{item.product.sellingPrice}</h1>
                        <h1>Color: {item.product.color}</h1>
                        <h1>Size: {item.product.size}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                {order?.shippingAddress?.address},
                {order?.shippingAddress?.locality},
                {order?.shippingAddress?.pincode},
                {order?.shippingAddress?.state},
              </StyledTableCell>
              <StyledTableCell align="right">
                <Chip label={order.OrderStatus} />
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={handleClick} color="primary">
                  Status
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}>
                  {OrderStatus.map((status) => (
                    <MenuItem
                      key={status.label}
                      onClick={() =>
                        handleUpdateOrder(order._id, status.label)
                      }>
                      {status.label}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
