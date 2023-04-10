import React from 'react';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";



//Tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#a1a9c2",
      color: theme.palette.common.black,
      fontSize: "x-large"    
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16
    }
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0
    }
}));

const Edit = ({ user, userData, setUserData, setUpdateState }) => {
    const handleInput = (event) => {
        const newData = userData.map((data) =>
        data.id === user.id
          ? { ...data, [event.target.name]: event.target.value }
          : data
      );
      setUserData(newData);
    };
  
    const handleUpdate = (event) => {
      event.preventDefault();
      setUpdateState(-1);
    };

    return (
    <StyledTableRow>
        <StyledTableCell align="center"></StyledTableCell>
        <StyledTableCell align="center">
          <input
            className="updateInput"
            type="text"
            name="name"
            onChange={handleInput}
            value={user.name}
            />
        </StyledTableCell>
        <StyledTableCell align="center">
          <input
            className="updateInput"
            type="text"
            name="email"
            onChange={handleInput}
            value={user.email}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <input
            className="updateInput"
            type="text"
            name="role"
            onChange={handleInput}
            value={user.role}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <Button onClick={handleUpdate}>Update</Button>{" "}
        </StyledTableCell>
    </StyledTableRow>
    );
};

export default Edit;