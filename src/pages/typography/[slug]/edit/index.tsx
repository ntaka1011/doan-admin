import Grid from "@mui/material/Grid"
import { useProducts } from "hooks/useProduct"
import { useRouter } from "next/router"
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker"
import FormLayoutsSeparator from "src/views/form-layouts/FormLayoutsSeparator"

const Page = () => {
  // ** Statements
  const router = useRouter()

  // ** Data
  const { getProductBySlug } = useProducts()
  const { data: product } = getProductBySlug(String(router.query.slug))
  console.log("🚀 ~ file: index.tsx:14 ~ Page ~ product:", product)

  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <FormLayoutsSeparator text="Edit Product" product={product} action="onEdit" />
      </Grid>
    </DatePickerWrapper>
  )
}

export default Page
