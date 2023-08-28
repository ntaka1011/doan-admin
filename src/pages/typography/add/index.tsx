// ** Styled Component
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'

const Page = () => {
  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <FormLayoutsSeparator text="Add Product" action="onCreate"
        />
      </Grid>
    </DatePickerWrapper>
  )
}

export default Page
