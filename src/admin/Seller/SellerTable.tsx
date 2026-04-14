import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import store, {
  useAppDispatch,
  useAppSelector,
} from "../../tempReduxToolkit/store";
import { fetchSellers } from "../../tempReduxToolkit/features/seller/sellerSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is created but not yet verified",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended, possibly due to violations",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "Account is deactivated, user may have chosen to deactivate it",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned due to severe violations",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed, possibly at user request",
  },
];

export default function SellerTable() {
  const dispatch = useAppDispatch();
  const seller = useAppSelector((store) => store.seller);
  const [status, setstatus] = useState(accountStatuses[0].status);

  const handleChange = (event: SelectChangeEvent) => {
    setstatus(event.target.value as string);
  };

  useEffect(() => {
    dispatch(fetchSellers(status));
  }, [status]);

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleChange}>
            {accountStatuses.map((status) => (
              <MenuItem value={status.status}>{status.status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seller?.sellers.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  <div>{item.sellerName}</div>
                </StyledTableCell>
                <StyledTableCell align="right">{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.mobile}</StyledTableCell>
                <StyledTableCell align="right">{item.GSTIN}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.businessDetails.businessName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <EditDocumentIcon sx={{ color: "#25920a" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
