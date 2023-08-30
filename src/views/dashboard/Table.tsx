// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { useUsers } from 'hooks/useUser'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'

interface RowType {
  _id: string
  lastName: string
  firstName: string
  updatedAt: string
  email: string
  phoneNumber: string
}

// interface StatusObj {
//   [key: string]: {
//     color: ThemeColor
//   }
// }



// const statusObj: StatusObj = {
//   applied: { color: 'info' },
//   rejected: { color: 'error' },
//   current: { color: 'primary' },
//   resigned: { color: 'warning' },
//   professional: { color: 'success' }
// }

const DashboardTable = () => {
  const [open, setOpen] = useState(false)
  const [keepId, setKeepId] = useState('')

  const { getUsers, deleteUser } = useUsers()

  const { data, mutate } = getUsers()

  // ** Handle
  const handleClickOpen = (id: string) => {
    setKeepId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async () => {
    await deleteUser(keepId)
    mutate()
    setOpen(false)
  }

  return (
    <Card>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success" variant="contained">No</Button>
          <Button onClick={handleDeleteProduct} color="error" variant="contained">Yes</Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label=''>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users.map((row: RowType) => {
              const dateString = row.updatedAt;
              const date = new Date(dateString);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const formattedDate = `${year}/${month}/${day}`;

              return (<TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.firstName} {row.lastName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={'Delete'}
                    color={'error'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                    onClick={() => handleClickOpen(row._id)}
                  />
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
