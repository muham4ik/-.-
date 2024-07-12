import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import categories from "../../../service/categories";
import product from "../../../service/product";
import Modal from "@mui/material/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { ProductvalidationSchema } from "../../../utils/validation"; // Yangi validatsiya faylini import qilish

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White"];
const sizes = ["S", "M", "L", "X", "XXL"];

export default function BasicModal({ open, handleClose, item }) {
  const initialValues = {
    age_max: item?.age_max || 0,
    age_min: item?.age_min || 0,
    category_id: item?.category_id || "",
    color: item?.color || [],
    cost: item?.cost || 0,
    count: item?.count || 0,
    description: item?.description || "",
    discount: item?.discount || 0,
    for_gender: item?.for_gender || "",
    made_in: item?.made_in || "",
    product_name: item?.product_name || "",
    size: item?.size || [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      age_max: parseInt(values.age_max, 10),
      age_min: parseInt(values.age_min, 10),
      cost: parseFloat(values.cost),
      count: parseInt(values.count, 10),
      discount: parseFloat(values.discount),
    };

    try {
      if (item && item.id) {
        // Update the existing product
        const response = await product.update({ id: item.id, ...payload });
        if (response.status === 201 || response.status === 200) {
          window.location.reload();
        }
      } else {
        // Create a new product
        const response = await product.create({ ...payload });
        if (response.status === 200 || response.status === 201) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await categories.get();
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center font-bold fs-1 text-[36px]"
        >
          Add Products
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={ProductvalidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className="flex flex-col justify-center m-auto gap-3 w-[500px]">
                <div className="form">
                  <div className="form_main flex gap-6">
                    <div className="form_main-left">
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="age_max"
                        label="Age Max"
                        helperText={<ErrorMessage name="age_max" component="div" />}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="age_min"
                        label="Age Min"
                        helperText={<ErrorMessage name="age_min" component="div" />}
                      />
                      <FormControl fullWidth>
                        <InputLabel shrink>Category</InputLabel>
                        <Field
                          as={Select}
                          name="category_id"
                          label="Category"
                          value={values.category_id}
                          onChange={handleChange}
                          input={<OutlinedInput label="Category" />}
                        >
                          {data.map((category) => (
                            <MenuItem key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>
                          <ErrorMessage name="category_id" component="div" />
                        </FormHelperText>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                          multiple
                          value={values.color}
                          onChange={handleChange}
                          input={<OutlinedInput label="Color" />}
                          renderValue={(selected) => selected.join(", ")}
                          name="color"
                        >
                          {colors.map((color) => (
                            <MenuItem key={color} value={color}>
                              <Checkbox checked={values.color.indexOf(color) > -1} />
                              <ListItemText primary={color} />
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          <ErrorMessage name="color" component="div" />
                        </FormHelperText>
                      </FormControl>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="cost"
                        label="Cost"
                        helperText={<ErrorMessage name="cost" component="div" />}
                      />
                      <FormControl fullWidth>
                        <FormLabel>For Gender</FormLabel>
                        <Field as={RadioGroup} name="for_gender">
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </Field>
                        <FormHelperText>
                          <ErrorMessage name="for_gender" component="div" />
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="form_main-right">
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="count"
                        label="Count"
                        helperText={<ErrorMessage name="count" component="div" />}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="discount"
                        label="Discount"
                        helperText={<ErrorMessage name="discount" component="div" />}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        type="text"
                        name="made_in"
                        label="Made In"
                        helperText={<ErrorMessage name="made_in" component="div" />}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        type="text"
                        name="product_name"
                        label="Product Name"
                        helperText={<ErrorMessage name="product_name" component="div" />}
                      />
                      <FormControl fullWidth>
                        <InputLabel>Size</InputLabel>
                        <Field
                          as={Select}
                          name="size"
                          multiple
                          label="Size"
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              <Checkbox checked={values.size.indexOf(size) > -1} />
                              <ListItemText primary={size} />
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>
                          <ErrorMessage name="size" />
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  name="description"
                  label="Description"
                  helperText={<ErrorMessage name="description" component="div" />}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ background: "#FF6E30" }}
                  className="w-full"
                  endIcon={<SendIcon />}
                  disabled={isSubmitting}
                >
                  Add Products
                </Button>
              </Form>
            )}
          </Formik>
        </Typography>
      </Box>
    </Modal>
  );
}
