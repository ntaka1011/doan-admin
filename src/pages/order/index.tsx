import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
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
import { useEffect, useState } from "react"
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker"
import { useOrder } from "hooks/useOrder"

// ** Toast Component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertPrice } from "utils/convertPrice"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TablePagination from "@mui/material/TablePagination"

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "OrderId",
    numeric: false,
    disablePadding: true,
    label: "Order Name",
  },
  {
    id: "Product",
    numeric: true,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "User",
    numeric: true,
    disablePadding: false,
    label: "UserName",
  },
  {
    id: "Price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "Quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "CreateAt",
    numeric: true,
    disablePadding: false,
    label: "Create At",
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
    numSelected,
    rowCount
  } = props;
  console.log("🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ numSelected:", numSelected)
  console.log("🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ rowCount:", rowCount)

  return (
    <TableHead>
      <TableRow>

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
  const { getOrders, getOrder, updateOrder, deleteOrder } = useOrder()
  const { data: orders, mutate } = getOrders()
  console.log("🚀 ~ file: index.tsx:116 ~ Page ~ categories:", orders)
  const rows = orders
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState({
    page: 0,
    page_size: 10,
  });
  console.log("!111")
  const [keepId, setKeepId] = useState("")
  const { data: order, mutate: orderMuate } = getOrder(keepId)
  console.log("🚀 ~ file: index.tsx:135 ~ Page ~ keepId:", keepId)
  const [status, setStatus] = useState(order?.status)
  console.log("🚀 ~ file: index.tsx:136 ~ Page ~ status:", status)
  console.log("🚀 ~ file: index.tsx:135 ~ order:", order)
  let total = 1

  // ** Customs
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // ** useEffects
  useEffect(() => {
    loadata()
  }, [order])

  const loadata = async () => {
    setStatus(order?.status)
    await orderMuate()
  }

  // ** Handler 
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage({
      ...page,
      page: newPage
    })
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({
      page_size: parseInt(event.target.value),
      page: 0
    });
  };

  const handleClickOpen = (id: string) => {
    setKeepId(id)
    setTimeout(() => {
      setOpen(true);
    }, 2000)
  };

  const handleClickOpenDelete = (id: string) => {
    setKeepId(id)
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectAllClick = (e: any) => {
    if (e.target.checked) {
      const checkes = rows.map((row: any) => row._id)
      setSelected(checkes)
    } else { setSelected([]) }
  }

  const handChangeStatus = (e: any) => {
    setStatus(e.target.value)
  };

  const handleUpdateStatus = async () => {
    const order = await updateOrder(keepId, { status: status })
    if (order?.status === 200) {
      toast.success("You have update success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      mutate();
      setOpen(false);
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

  const handleDelete = async () => {
    const order = await deleteOrder(keepId)
    if (order?.status === 200) {
      toast.success("You delete success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      mutate();
      setOpenDelete(false);
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
            onClose={handleClose}
          >
            <DialogTitle>Update Status</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: "25px" }}>
                You can set order of user and whether to adapt or not.
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <InputLabel htmlFor="Status">Status</InputLabel>
                  {console.log("lopiip", status)}
                  <Select
                    autoFocus
                    value={status}
                    onChange={handChangeStatus}
                    label="Status"
                    inputProps={{
                      name: 'Status',
                      id: 'Status',
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>

                  </Select>
                  {/* {console.log("lopiip", Select)} */}
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="inherit">Cancel</Button>
              <Button onClick={handleUpdateStatus} variant="contained" color="success">Update</Button>
            </DialogActions>
          </Dialog>
          {/* Delete */}
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
          >
            <DialogTitle>Delete Status</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} variant="contained" color="inherit">Cancel</Button>
              <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
            </DialogActions>
          </Dialog>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={orders?.length}
                />
                {rows?.slice(page.page * page.page_size, page.page * page.page_size + page.page_size).map((row: any) => {
                  const isName = isSelected(row._id)
                  const dateString = row.createdAt;
                  const date = new Date(dateString);
                  const year = date.getFullYear();
                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                  const day = date.getDate().toString().padStart(2, '0');
                  const formattedDate = `${year}/${month}/${day}`;

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

                      <TableCell component='th' scope='row'>
                        <Box sx={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {total++}
                        </Box>
                      </TableCell>

                      <TableCell align='right'>{row.orderItems.map((item: any) => <Box key={item._id}>{item.product.title}</Box>)}</TableCell>
                      <TableCell align='right'>{row.user.lastName} {row.user.firstName}</TableCell>
                      <TableCell align='right'>{convertPrice(row?.total)}</TableCell>
                      <TableCell align='right'>{row.orderItems.map((item: any) => <Box key={item._id}>{item.quantity}</Box>)}</TableCell>
                      <TableCell align='right'>{row.status}</TableCell>
                      <TableCell align='right'>{formattedDate}</TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => handleClickOpen(row._id)} variant="contained" sx={{ marginRight: "10px" }} color={"info"}>
                          Edit
                        </Button>
                        <Button onClick={() => handleClickOpenDelete(row._id)} variant="contained" color="error" >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows?.length}
              rowsPerPage={page.page_size}
              page={page.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box >

      </Grid>
    </DatePickerWrapper>

  )
}

export default Page
