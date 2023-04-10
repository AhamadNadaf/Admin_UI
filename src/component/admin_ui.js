import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import "./admin.css";
import Edit from "./edit";

//MUI
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Grid from '@mui/material/Grid';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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



const Admin = () => {

  const [userData, setUserData] = useState();
  const [updateState, setUpdateState] = useState(-1);
  const [filterData, setFilterData] = useState();
  const [page, setPage] = useState(1)
  const [checkedRows, setCheckedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState();

  const retrieveUserData = async () => {
    const response = await axios.get(config.backendEndpoint);
    const responseData = response.data;
    setUserData(responseData);
    setFilterData(responseData);
  };
  

  useEffect(() => {
    retrieveUserData();
    console.log(isSelectedAll)
  }, []);

  //Search
  const handleSearch = (searchUser) => {
    const dataFilter = userData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        item.email.toLowerCase().includes(searchUser.toLowerCase()) ||
        item.role.toLowerCase().includes(searchUser.toLowerCase())
    );
    setFilterData(dataFilter);
  };

  // Delete Function
  const userDelete = (id) => {
    const updateUser = filterData.filter((userId) => {
      return userId.id !== id;
    });
    setUserData(updateUser);
    setFilterData(updateUser);
  };

  //Edit function
  const editUser = (id) => {
    setUpdateState(id);
  };


  //Pagination
  const selectPage = (selectedPage) => {
    if(
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(filterData.length / 10) &&
      selectedPage !== page
    )
    setPage(selectedPage)
  }

  // Handle CheckBox
  function handleCheckChange(event, id) {
    if (event.target.checked) {
      setCheckedRows([...checkedRows, id]);
      console.log("from if" ,isSelectedAll)
      if(!isSelectedAll){      
        setIsSelectedAll(isSelectedAll)
        }
    } else {
      setCheckedRows(checkedRows.filter((i) => i !== id));
      if(isSelectedAll){      
      setIsSelectedAll(false)
      }
    }
  }
  function handleCheckAll(event) {
    
    console.log("from handleCheckAll before",isSelectedAll)
    setIsSelectedAll(!isSelectedAll);
    console.log("from handleCheckAll",isSelectedAll)
    if (event.target.checked) {
      const dataView = filterData.slice(
        page * 10 - 10,
        page * 10
      );
      const checkVisibleData = dataView.map((item) => item.id);
      setCheckedRows(checkVisibleData);
    } else {
      setCheckedRows([]);
    }
  }

 const handleSelectedDelete = () => {
    if(checkedRows.length){
      const newData = filterData.filter((data) => !checkedRows.includes(data.id));
      setFilterData(newData);
      setCheckedRows([]);
      setIsSelectedAll(false)
    }
 }

  return (
    <div>
      <div className="admin_div">
        <h1 className="header">Geektrust </h1>
        <h1 className="header"> Admin UI Challenge</h1>
        <hr></hr>
        <div className="searchDiv">
          <input
            className="searchBar"
            type="text"
            placeholder="Search by any property"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {
          filterData ? (
            <div>
              <TableContainer
                xs={2}
                sm={4}
                md={4}
                sx={{minWidth: "100%" }}
                component={Paper}
                >
                <Table
                  sx={{ minWidth: "100%", marginTop: "10px" }}
                  aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          <input
                            type="checkbox"
                            className="selectedAllData"
                            id="allSelect"
                            checked={isSelectedAll}
                            onChange={handleCheckAll}
                          ></input>
                        </StyledTableCell>
                        <StyledTableCell align="center">{isSelectedAll}Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Role</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                    {
                      filterData.slice(page  * 10 - 10, page * 10).map((user) =>
                        updateState === user.id ? (
                        <Edit
                          user={user}
                          userData={userData}
                          setUserData={setFilterData}
                          setUpdateState={setUpdateState}
                        />
                        ) : 
                        (
                          <StyledTableRow key={user.name}>
                            <StyledTableCell className={checkedRows.includes(user.id) ? "checkedColumn" : ""} align="center">
                              <input
                                type="checkbox"
                                className={checkedRows.includes(user.id) ? "checkboxx" : "checkbox"}
                                id={user.id}
                                checked={checkedRows.includes(user.id)}
                                onChange={(e) => handleCheckChange(e,user.id)}
                              ></input>
                            </StyledTableCell>
                            <StyledTableCell className={checkedRows.includes(user.id) ? "checkedColumn" : ""} align="center">
                              {user.name}
                            </StyledTableCell>
                            <StyledTableCell className={checkedRows.includes(user.id) ? "checkedColumn" : ""} align="center">
                              {user.email}
                            </StyledTableCell>
                            <StyledTableCell className={checkedRows.includes(user.id) ? "checkedColumn" : ""} align="center">
                              {user.role}
                            </StyledTableCell>
                            <StyledTableCell className={checkedRows.includes(user.id) ? "checkedColumn" : ""} align="center">
                              <ButtonGroup className={checkedRows.includes(user.id) ? "checkedColumn" : ""}
                                variant="text"
                                aria-label="text button group"
                              >
                                <Button onClick={() => editUser(user.id)}>
                                  <BorderColorOutlinedIcon />
                                </Button>
                                <Button onClick={() => userDelete(user.id)}>
                                  <DeleteOutlinedIcon />
                                </Button>
                              </ButtonGroup>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )
                    }
                      
                  </TableBody>
                </Table>
              </TableContainer>
              <div onClick={handleSelectedDelete} className={checkedRows.length > 0 ? "deleteSelectedDiv" : "selectDeleteDiv"}>
                <span className="deleteSelected">Delete Selected</span>
              </div>
              <div className="Pagination"> 
                <span className={page !== 1 ? "" : "pageinationDisable"} onClick={() => selectPage(1)}><FirstPageIcon/></span>
                <span className={page > 1 ? "" : "pageinationDisable"} onClick={() => selectPage(page - 1 )}><NavigateBeforeIcon/></span>
                  {
                    [...Array(Math.ceil(filterData.length / 10))].map((_,i) => {
                      return <span className={page===i+1 ? "selectedPagination" : ""}
                        onClick={() => selectPage(i+1)} key={i}>{i + 1}</span>
                    })
                  }
                <span className={page < Math.ceil(filterData.length / 10) ? "" : "pageinationDisable"} onClick={() => selectPage(page + 1)}><NavigateNextIcon/></span>
                <span className={page < Math.ceil(filterData.length / 10) ? "" : "pageinationDisable"} onClick={() => selectPage(Math.ceil(filterData.length / 10))}><LastPageIcon/></span>
              </div>
            </div>
          ) : 
          (
            <div>
              <h1>No data found</h1>
            </div>
          )
        }        
      </div>
      <footer className="footer">
      |  Geektrust Challenge:- Admin UI  &#169; Ahamad Nadaf  (Tezzz)|
      </footer>
    </div>
  );
};

export default Admin;
