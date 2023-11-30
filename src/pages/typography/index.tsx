// ** MUI Imports
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useProducts } from 'hooks/useProduct'
import { convertPrice } from 'utils/convertPrice'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import React from 'react'
import { useRouter } from 'next/router'

// ** Demo Components Imports

interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'productName',
    numeric: false,
    disablePadding: true,
    label: 'Product Name'
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'Price',
    numeric: true,
    disablePadding: false,
    label: 'price'
  },
  {
    id: 'selled',
    numeric: true,
    disablePadding: false,
    label: 'Selled'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'details',
    numeric: true,
    disablePadding: false,
    label: ''
  }
]
interface Category {
  name: string
}

interface Product {
  _id: string
  title: string
  price: number
  desc: string
  categories: [Category]
  new: boolean
  quantity: number
  size: [object]
  images: [string]
  thumbnail: string
  original_price: number
  feature: boolean
  slug: string
  createAt: Date
  UpdateAt: Date
  selled: number
}

interface EnhancedTableProps {
  onSelectAllClick: (e: any) => void
  numSelected: number
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props
  console.log('🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ numSelected:', numSelected)
  console.log('🚀 ~ file: index.tsx:96 ~ EnhancedTableHead ~ rowCount:', rowCount)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const TypographyPage = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [keepId, setKeepId] = useState('')
  console.log('🚀 ~ file: index.tsx:141 ~ TypographyPage ~ keepId:', keepId)
  const { getProducts, deleteProduct } = useProducts()
  const { data: products, mutate } = getProducts({
    limit: 99
  })
  console.log('🚀 ~ file: index.tsx:141 ~ TypographyPage ~ products:', products)
  const [page, setPage] = useState({
    page: 0,
    page_size: 10
  })
  console.log('🚀 ~ file: index.tsx:127 ~ TypographyPage ~ selected:', selected)

  const rows = products?.data

  const handleSelectAllClick = (e: any) => {
    if (e.target.checked) {
      const checkes = rows.map((row: Product) => row._id)
      setSelected(checkes)
    } else {
      setSelected([])
    }
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage({
      ...page,
      page: newPage
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({
      page_size: parseInt(event.target.value),
      page: 0
    })
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }
  const [open, setOpen] = useState(false)

  const handleClickOpen = (id: string) => {
    setKeepId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDeleteProduct = () => {
    deleteProduct(keepId)
    mutate()
    setOpen(false)
  }

  // ** mutate
  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <Box sx={{ width: '100%' }}>
      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{'Confirmation'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='success' variant='contained'>
            No
          </Button>
          <Button onClick={handleDeleteProduct} color='error' variant='contained'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 5
        }}
      >
        <Button variant='contained' onClick={() => router.push('/typography/add')}>
          Create Product
        </Button>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={products?.metaData?.[0]?.totalDocuments}
            />
            {rows
              ?.slice(page.page * page.page_size, page.page * page.page_size + page.page_size)
              .map((row: Product) => {
                const isName = isSelected(row._id)

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isName}
                    tabIndex={-1}
                    key={row._id}
                    selected={isName}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' onClick={() => handleClick(row._id)} checked={isName} />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textDecoration: 'none',
                          width: '300px'
                        }}
                      >
                        <Avatar
                          alt='John Doe'
                          sx={{ width: 40, height: 40, marginRight: '15px' }}
                          src={`${row.images[0]}`}
                        />
                        {row.title}
                      </Box>
                    </TableCell>
                    <TableCell align='right'>{row?.categories[0]?.name}</TableCell>
                    <TableCell align='right'>{convertPrice(row?.price)}</TableCell>
                    <TableCell align='right'>{row.selled}</TableCell>
                    <TableCell align='right'>
                      {row.quantity < 1 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            justifyContent: 'center',
                            backgroundColor: '#cef5d3',
                            borderRadius: '999999px',
                            color: '#2eb146'
                          }}
                        >
                          Out Of Stock
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            justifyContent: 'center',
                            backgroundColor: '#ffd2cc',
                            borderRadius: '999999px',
                            color: '#ff8e7c'
                          }}
                        >
                          Active
                        </Box>
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        sx={{ marginRight: '10px' }}
                        onClick={() => router.push(`/typography/${row.slug}/edit`)}
                        color={'info'}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => handleClickOpen(row._id)} variant='contained' color='error'>
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
          component='div'
          count={rows?.length}
          rowsPerPage={page.page_size}
          page={page.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default TypographyPage
