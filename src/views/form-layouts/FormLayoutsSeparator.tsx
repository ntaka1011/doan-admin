// ** React Imports
import { ChangeEvent, ElementType, FC, useEffect, useState } from 'react'

// ** Toast Component
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button, { ButtonProps } from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useProducts } from 'hooks/useProduct'
import { useRouter } from 'next/router'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))
interface FormLayoutProps {
  title: string
  desc: string
  price: number
  quantity: number
  original_price?: number | null | undefined
  origin: string
  material: string
  categories: [string]
  color: [string] | null | undefined
}
interface FormLayoutMaProps {
  text: string
  action: string
  product?: any
}

const FormLayoutsSeparator: FC<FormLayoutMaProps> = ({ text, action, product }) => {
  // ** States
  const router = useRouter()
  const [name, setName] = useState('Add Product')
  const [size6, setSize6] = useState({
    size: 6,
    quantity: 0
  })
  console.log('🚀 ~ file: FormLayoutsSeparator.tsx:74 ~ size6:', size6)
  const [size6_5, setSize6_5] = useState({
    size: 6.5,
    quantity: 0
  })
  console.log('🚀 ~ file: FormLayoutsSeparator.tsx:79 ~ size6_5:', size6_5)
  const [size7, setSize7] = useState({
    size: 7,
    quantity: 0
  })
  console.log('🚀 ~ file: FormLayoutsSeparator.tsx:84 ~ size7:', size7)
  const [size7_5, setSize7_5] = useState({
    size: 7.5,
    quantity: 0
  })
  const [size8, setSize8] = useState({
    size: 8,
    quantity: 0
  })
  const [size8_5, setSize8_5] = useState({
    size: 8.5,
    quantity: 0
  })
  const [size9, setSize9] = useState({
    size: 9,
    quantity: 0
  })
  const [size9_5, setSize9_5] = useState({
    size: 9.5,
    quantity: 0
  })
  const [size10, setSize10] = useState({
    size: 10,
    quantity: 0
  })
  const [size10_5, setSize10_5] = useState({
    size: 10.5,
    quantity: 0
  })
  const [size11, setSize11] = useState({
    size: 11,
    quantity: 0
  })

  // ** hooks
  const { createProduct, editProduct } = useProducts()

  // ** React Hooks Form
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1, 'Title min 1 charactor')
      .max(255, 'Title max 25 charactor'),
    desc: Yup.string()
      .required('Description is required ')
      .min(1, 'Description min 1 charactor')
      .max(500, 'Description max 25 charactor'),
    price: Yup.number().typeError('Price is required'),
    quantity: Yup.number().typeError('Quantity is required'),
    original_price: Yup.number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable(),
    origin: Yup.string().required('Origin is required'),
    material: Yup.string().required('Material is required'),
    categories: Yup.array().typeError('Category is required').of(Yup.string()).required('Categories is required'),
    color: Yup.array().typeError('Color is required').of(Yup.string().required('Color is required')).nullable()
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, reset, handleSubmit, formState } = useForm<FormLayoutProps>(formOptions)
  const { errors } = formState
  const [feature, setFeature] = useState('false')
  const [images, setImages] = useState<any>([])
  console.log('🚀 ~ file: FormLayoutsSeparator.tsx:49 ~ FormLayoutsSeparator ~ images:', images)
  const [color, setColor] = useState([])
  const [categories, setCategories] = useState([])
  console.log('🚀 ~ file: FormLayoutsSeparator.tsx:112 ~ FormLayoutsSeparator ~ categories:', categories)

  // ** useEffects
  useEffect(() => {
    if (action === 'onEdit') {
      setName(text)
    }
  }, [action, text])

  useEffect(() => {
    reset(product)
    setImages(product?.images)
    setCategories(product?.categories)
    setFeature(String(product?.feature))
    setColor(product?.color)
    product?.size?.map((item: any) => {
      console.log('🚀 ~ file: FormLayoutsSeparator.tsx:133 ~ product?.size.map ~ item:', item)
      switch (item.size) {
        case 6:
          setSize6({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 6.5:
          setSize6_5({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 7:
          setSize7({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 7.5:
          setSize7_5({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 8:
          setSize8({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 8.5:
          setSize8_5({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 9:
          setSize9({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 9.5:
          setSize9_5({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 10:
          setSize10({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 10.5:
          setSize10_5({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        case 11:
          setSize11({
            size: +item.size,
            quantity: +item.quantity
          })
          break
        default:
          break
      }
    })
  }, [product, reset])

  // ** handleSubmit
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files)
      setImages(_files)
    }
  }

  // ** Handle Select
  const handleSelectChange = (event: any) => {
    setColor(event.target.value)
  }
  const handleCategoryChange = (event: any) => {
    setCategories(event.target.value)
  }

  const handleRegister = async (data: FormLayoutProps) => {
    console.log('!!!!!!!')
    console.log('1111', data)

    try {
      if (action === 'onCreate') {
        const list = await Promise.all(
          images.map(async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'upload')
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/coca1/image/upload', formData)

            const { url } = uploadRes.data
            console.log('🚀 ~ file: FormLayoutsSeparator.tsx:122 ~ images.map ~ url:', url)

            return url
          })
        )
        console.log('🚀 ~ file: FormLayoutsSeparator.tsx:139 ~ handleRegister ~ list:', list)
        const params = {
          ...data,
          images: list,
          size: [size6, size6_5, size7, size7_5, size8, size8_5, size9, size9_5, size10, size10_5, size11]
        }
        console.log('🚀 ~ file: FormLayoutsSeparator.tsx:140 ~ handleRegister ~ params:', params)

        const res = await createProduct(params)
        if (res.status === 200) {
          toast.success('You have successfully registered!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })

          router.push('/typography')
        } else {
          toast.error('Create Product error. Please try again!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
      } else if (action === 'onEdit') {
        const list = await Promise.all(
          images.map(async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'upload')
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/coca1/image/upload', formData)

            const { url } = uploadRes.data
            console.log('🚀 ~ file: FormLayoutsSeparator.tsx:122 ~ images.map ~ url:', url)

            return url
          })
        )

        const params = {
          ...data,
          images: list,
          size: [size6, size6_5, size7, size7_5, size8, size8_5, size9, size9_5, size10, size10_5, size11],
          feature: feature
        }
        console.log('🚀 ~ file: FormLayoutsSeparator.tsx:327 ~ handleRegister ~ params:', params)

        const res = await editProduct(String(router.query.slug), params)
        if (res?.status === 200) {
          toast.success('You have update successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })

          router.push('/typography')
        } else {
          toast.error('Update Product error. Please try again!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title={name} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit(handleRegister)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mr: '5px' }}
                {...register('title', { required: true })}
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                label='Title'
                placeholder='Nike Air Jordan 1 High Golf ‘Panda’ DQ0660-101'
              />

              {errors.title && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.title?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                InputLabelProps={{
                  shrink: true
                }}
                {...register('desc', { required: true })}
                label='Description'
                placeholder='description...........'
              />
              {errors.desc && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.desc?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                InputLabelProps={{
                  shrink: true
                }}
                {...register('price', { required: true })}
                label='Price'
                placeholder='500000'
              />
              {errors.price && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.price?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                InputLabelProps={{
                  shrink: true
                }}
                {...register('quantity', { required: true })}
                label='Quantity'
                placeholder='4'
              />
              {errors.quantity && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.quantity?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                InputLabelProps={{
                  shrink: true
                }}
                {...register('original_price', { required: false })}
                label='Original Price'
                placeholder='100000000'
              />
              {errors.original_price && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.original_price?.message}
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {images?.map((image: any) => {
                  return action === 'onEdit' ? (
                    <ImgStyled
                      key={image}
                      src={image ? image : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                      alt='Profile Pic'
                    />
                  ) : (
                    <ImgStyled
                      key={image}
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                      }
                      alt='Profile Pic'
                    />
                  )
                })}
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      multiple
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Product details
              </Typography>
            </Grid>
            {action === 'onEdit' && (
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id='demo-row-radio-buttons-group-label'>Feature</FormLabel>
                  <RadioGroup
                    row
                    onChange={e => setFeature(e.target.value)}
                    value={feature}
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel value='true' control={<Radio />} label='True' />
                    <FormControlLabel value='false' control={<Radio />} label='False' />
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                {...register('origin', { required: true })}
                InputLabelProps={{
                  shrink: true
                }}
                label='Origin'
                placeholder='Viet Nam'
              />
              {errors.origin && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.origin?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Material'
                InputLabelProps={{
                  shrink: true
                }}
                {...register('material', { required: true })}
                placeholder='Vai'
              />
              {errors.material && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.material?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-Categories'>Categories</InputLabel>
                <Select
                  {...register('categories', { required: true })}
                  labelId='demo-multiple-name-Categories'
                  id='demo-multiple-name'
                  multiple
                  value={Array.isArray(categories) ? categories : []}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label='Name' />}
                >
                  <MenuItem value='64daf1be8c4090ab51de7e4e'>Giày sandal bitis</MenuItem>
                  <MenuItem value='64daf1d08c4090ab51de7e51'>Giày Converes</MenuItem>
                  <MenuItem value='64daf1e68c4090ab51de7e53'>Giày Sneaker</MenuItem>
                  <MenuItem value='64dd7b6d8f8a45999fa78f04'>Giày loafer</MenuItem>
                </Select>
              </FormControl>
              {errors.categories && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.categories?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Color</InputLabel>
                <Select
                  {...register('color', { required: true })}
                  value={Array.isArray(color) ? color : []}
                  multiple
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='color' id='select-multiple-color' />}
                >
                  <MenuItem value='Black'>Black</MenuItem>
                  <MenuItem value='Red'>Red</MenuItem>
                  <MenuItem value='Brown'>Brown</MenuItem>
                  <MenuItem value='Blue'>Blue</MenuItem>
                  <MenuItem value='Orange'>Orange</MenuItem>
                  <MenuItem value='Pink'>Pink</MenuItem>
                  <MenuItem value='White'>White</MenuItem>
                </Select>
              </FormControl>
              {errors.color && (
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {errors.color?.message}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Size
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 6</InputLabel>
                <Select
                  label='Size 6'
                  defaultValue=''
                  value={String(size6?.quantity)}
                  onChange={e =>
                    setSize6({
                      ...size6,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 6.5</InputLabel>
                <Select
                  label='Size 6.5'
                  defaultValue=''
                  value={String(size6_5?.quantity)}
                  onChange={e =>
                    setSize6_5({
                      ...size6_5,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 7</InputLabel>
                <Select
                  label='Size 7'
                  defaultValue=''
                  value={String(size7?.quantity)}
                  onChange={e =>
                    setSize7({
                      ...size7,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 7.5</InputLabel>
                <Select
                  label='Size 7.5'
                  defaultValue=''
                  value={String(size7_5?.quantity)}
                  onChange={e =>
                    setSize7_5({
                      ...size7_5,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 8</InputLabel>
                <Select
                  label='Size 8'
                  defaultValue=''
                  value={String(size8?.quantity)}
                  onChange={e =>
                    setSize8({
                      ...size8,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 8.5</InputLabel>
                <Select
                  label='Size 8.5'
                  defaultValue=''
                  value={String(size8_5?.quantity)}
                  onChange={e =>
                    setSize8_5({
                      ...size8_5,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 9</InputLabel>
                <Select
                  label='Size 9'
                  defaultValue=''
                  value={String(size9?.quantity)}
                  onChange={e =>
                    setSize9({
                      ...size9,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 9.5</InputLabel>
                <Select
                  label='Size 9.5'
                  defaultValue=''
                  value={String(size9_5?.quantity)}
                  onChange={e =>
                    setSize9_5({
                      ...size9_5,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 10</InputLabel>
                <Select
                  label='Size 10'
                  value={String(size10?.quantity)}
                  defaultValue=''
                  onChange={e =>
                    setSize10({
                      ...size10,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 10.5</InputLabel>
                <Select
                  label='Size 10.5'
                  value={String(size10_5?.quantity)}
                  defaultValue=''
                  onChange={e =>
                    setSize10_5({
                      ...size10_5,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Size 11</InputLabel>
                <Select
                  label='Size 11'
                  defaultValue=''
                  value={String(size11?.quantity)}
                  onChange={e =>
                    setSize11({
                      ...size11,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='9'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
