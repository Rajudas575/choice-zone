import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../tempReduxToolkit/store";
import { useEffect } from "react";
import {
  deleteDeal,
  getAllDeals,
} from "../../tempReduxToolkit/features/admin/dealSlice";

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

export default function DealTable() {
  const dispatch = useAppDispatch();

  const deal = useAppSelector((store) => store.deal);

  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteDeal(id));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deal?.deals.map((item, index) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>

              <StyledTableCell align="right">
                <img className="w-20 rounded-md" src={item.category.image} />
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.category.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.discount}%</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                  <EditDocumentIcon sx={{ color: "#25920a" }} />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton onClick={() => handleDelete(item._id)}>
                  <Delete color="error" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
