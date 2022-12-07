import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
import EmployeeForm from "./add-job";
import { useEffect } from "react";
import Edit from "@mui/icons-material/Edit";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import './job-details.scss';

import SearchIcon from '@mui/icons-material/Search';

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const headCells = [
  {
    id: "Job Title",
    label: "Job Title",
    minWidth: 170
  },
  {
    id: "Company",
    label: "Company",
    minWidth: 100
  },
  {
    id: "Job-Link",
    
    label: "Job-Link",
    minWidth: 170, align: 'right'
  },
  {
    id: "Job-Type",
    
    label: "Job-Type",
    minWidth: 170, align: 'right'
  },
  {
    id: "Actions",
    
    label: "Actions",
    minWidth: 170, align: 'right'
  },
];



export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(!isModalOpen);
  const [updateData, setUpdateData] = useState({})
  const [tableData, setTableData] = useState([])
  const [listingsFilter, setListingsFilter] = useState([])
  const [listings, setListings] = useState([])
  const [companyFilter, setCompanyFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const baseUri = `https://prep-buddy-backend.herokuapp.com/job-listings`
  const fetchTableDetails = async () => {
    
    const response = await fetch(baseUri);
    const jsonData = await response.json((data) => data);
    console.log("the json data", jsonData)
    setTableData(jsonData)
    setListings(jsonData)
  };

  useEffect(()=>{
    fetchTableDetails()

  },[])

  const handleDelete = async (id)=>{
    console.log("the url",baseUri+id)
     const response = fetch(`${baseUri+"/"+id}`, {
      method: 'DELETE',
    })
    if((await response).json){
      fetchTableDetails()
    }
  }

  useEffect(()=>{
    // setUpdateData(updateData)
    // console.log("Object.keys(updateData).length > 0", Object.keys(updateData).length > 0)
    // if(Object.keys(updateData).length > 0) {
    //   handleModalOpen()
    // }
  }, [])

  const handleUpdate = async (data)=>{
    handleModalOpen()
    setUpdateData(data)
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()

    console.log("company: ", companyFilter.toLowerCase())
    console.log("type: ", typeFilter.toLowerCase())

    let returnedData = listings.filter((data)=>data.company === companyFilter).filter((subData)=>subData.jobType === typeFilter.toLowerCase())
    console.log("the returned data", returnedData)

    if (companyFilter !== "" && typeFilter !== "") {
      setListings(listings.filter((data)=>data.company === companyFilter).filter((subData)=>subData.jobType === typeFilter.toLowerCase()))
  } else if (companyFilter !== "") {
        console.log("2: ", listings)
        setListings(listings.filter((data)=>data.company === companyFilter))
    } else if (typeFilter !== "") {
        console.log("3: ", listings.filter(listing => listing.type === typeFilter))
        setListings(listings.filter(listing => listing.jobType === typeFilter.toLowerCase()))
    } else {
        setListings(listings)
    }
    console.log("listings", listings)
}

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


  return (
    <div>
    
{/* 
  <SearchBar
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  /> */}

     
      <div className="add-job-listings-btn" align="right">
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<AddOutlinedIcon fontSize="small"/>}
                    onClick={handleModalOpen}
                >Add Job Openings</Button>
      </div>
      <EmployeeForm isModalOpen={isModalOpen} handleModal={handleModalOpen} fetchTableDetails={fetchTableDetails} updateData = {updateData}/>
      <div className="search-form" style={{display: 'flex', flexDirection: 'row', marginBottom: 15, marginLeft: 200}}>
                <form onSubmit={handleFilterSubmit}>
                    <FilterListIcon fontSize="medium" />
                    <TextField id="standard-basic" label="Company" variant="standard"
                               onChange={(e) => setCompanyFilter(e.target.value)} style={{marginRight: 15}} />

                    <FormControl variant="standard" sx={{ minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            label="Type"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"Internship"}>Internship</MenuItem>
                            <MenuItem value={"FullTime"}>FullTime</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        startIcon={<SearchIcon fontSize="small"/>}
                    >Search</Button>
                    </form>
              </div>
      <div className="custom-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            {headCells.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                // align={headCell.numeric ? "right" : "left"}
                // padding={headCell.disablePadding ? "none" : "normal"}
                // sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  // active={orderBy === headCell.id}
                  // direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listings.map((data, index) => (
            <StyledTableRow
              key={index}
            >
              <StyledTableCell >{data.jobTitle}</StyledTableCell>
              <StyledTableCell >{data.company}</StyledTableCell>
              <StyledTableCell >{data.jobLink}</StyledTableCell>
              <StyledTableCell >{data.jobType}</StyledTableCell>
              <StyledTableCell>
                <Edit color="primary" fontSize="medium" onClick={()=>handleUpdate(data)} />
                <DeleteIcon color="error" fontSize="medium" onClick={()=>handleDelete(data.id)}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
      

      </div>
    </div>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

