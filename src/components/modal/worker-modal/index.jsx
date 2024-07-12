import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import worker from "../../../service/worker";
import { WorkervalidationSchema } from "../../../utils/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

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

export default function BasicModal({ open, handleClose , item }) {
  const initialValues = {
    email: item.email ? item.email : "" ,
    first_name: item.first_name ? item.first_name: "",
    last_name: item.last_name ? item.last_name :"",
    gender: item.gender ? item.gender :  "",
    phone_number: item.phone_number ? item.phone_number :"",
    password: item.password ? item.password : "",
    age: item.age ? item.age :"", 
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      age: parseInt(values.age, 10), // Convert age to number
    };

    if(item && item.id){
      try {
        const response = await worker.update({id:item.id ,...payload})
        if(response.status === 201 || response.status === 200){
          window.location.reload()
        }
      }catch (error){
        console.log(error);
      }
    }else{
      
    try {
      const response = await worker.create({...payload });

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
    }

  };

  return (
    <div>
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
            Add Workers
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={WorkervalidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col justify-center m-auto gap-3 w-[500px]">
                   <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="first_name"
                    label="First Name"
                    helperText={<ErrorMessage name="first_name" component="div" />}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="last_name"
                    label="Last Name"
                    helperText={<ErrorMessage name="last_name" component="div" />}
                  />
                  <div className="form flex gap-5">
                    <div className="form_left">
                    <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="email"
                    label="Email"
                    helperText={<ErrorMessage name="email" component="div" />}
                  />
                   <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="phone_number"
                    label="Phone Number"
                    helperText={<ErrorMessage name="phone_number" component="div" />}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    helperText={<ErrorMessage name="password" component="div" />}
                  />
                    </div>
                    <div className="form_right">
                    <Field
                    as={TextField}
                    fullWidth
                    type="number" // Change type to number
                    name="age"
                    label="Age"
                    helperText={<ErrorMessage name="age" component="div" />}
                  />
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <Field as={RadioGroup} name="gender">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </Field>
                    <ErrorMessage name="gender" component="div" />
                  </FormControl>
                
                    </div>
                    
                  </div>
                
                 
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ background: "#FF6E30" }}
                    className="w-full"
                    endIcon={<SendIcon />}
                    disabled={isSubmitting}
                  >
                    Add Worker
                  </Button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
