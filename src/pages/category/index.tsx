import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useState } from "react"
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker"
import { useCategory } from "hooks/useCategories"
import TextField from "@mui/material/TextField"

// ** Toast Component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "categoryName",
    numeric: false,
    disablePadding: true,
    label: "Category Name",
  },
  {
    id: "details",
    numeric: true,
    disablePadding: false,
    label: ""
  }
];


interface EnhancedTableProps {
  onSelectAllClick: (e: any) => void;
  numSelected: number;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    numSelected,
    rowCount
  } = props;
  console.log("🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ numSelected:", numSelected)
  console.log("🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ rowCount:", rowCount)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  )
}

const Page = () => {
  // ** State 
  const { getCategories, deleteCategories, createProduct } = useCategory()
  const { data: categories, mutate } = getCategories()
  console.log("🚀 ~ file: index.tsx:116 ~ Page ~ categories:", categories)
  const rows = categories
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [name, setName] = useState("");
  const [keepId, setKeepId] = useState("")

  // ** Customs
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // ** Handler 
  const handleClickOpen = (id: string) => {
    setKeepId(id)
    setOpen(true);
  };

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleClickCloseProduct = () => {
    setOpenProduct(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectAllClick = (e: any) => {
    if (e.target.checked) {
      const checkes = rows.map((row: any) => row._id)
      setSelected(checkes)
    } else { setSelected([]) }
  }

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  const handleDeleteProduct = async () => {
    await deleteCategories(keepId)
    mutate()
    setOpen(false)
  };

  const handleCategory = async () => {
    const category = await createProduct({
      name: name
    })
    if (category.status === 200) {
      toast.success("You have successfully registered!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Confirmation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="success" variant="contained">No</Button>
              <Button onClick={handleDeleteProduct} color="error" variant="contained">Yes</Button>
            </DialogActions>
          </Dialog>
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 5
          }}>
            <Button variant="contained" onClick={handleClickOpenProduct}>Create Category</Button>
            <Dialog open={openProduct} onClose={handleClickCloseProduct}>
              <DialogTitle>Add Category</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your category here. We
                  will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickCloseProduct} color="error" variant="contained">Cancel</Button>
                <Button onClick={handleCategory} color="success" variant="contained" disabled={!name ? true : false} >Create</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={categories?.length}
                />
                {rows?.map((row: any) => {
                  const isName = isSelected(row._id)

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isName}
                      tabIndex={-1}
                      key={row._id}
                      selected={isName}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={() => handleClick(row._id)}
                          checked={isName}
                        />
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <Box sx={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {row.name}
                        </Box>
                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => handleClickOpen(row._id)} variant="contained" color="error" >
                          Delete
                        </Button>

                      </TableCell>
                    </TableRow>
                  )
                })}

              </Table>
            </TableContainer>
          </Paper>
        </Box >

      </Grid>
    </DatePickerWrapper>

  )
}

export default Page
