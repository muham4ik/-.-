import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement } from "react";
import { Button, TextField } from "@mui/material";
import category from "../../../service/category";
import { createCategoryValidationSchema } from "@validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";

const Fade = forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose, item }) {
  const initialValues = {
    category_name: item?.category_name ? item?.category_name : "",
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Submitted values:", values);
      if (item && item.category_id) {
        try {
          const response = await category.update({ category_id: item.category_id, ...values });
          if (response.status === 201 || response.status === 200) {
            Notification({
              title: "Successfully edited",
              type: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 2300);
           
          }
         
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await category.create(values);
          if (response.status === 201) {
            Notification({
              title: "Successfully added",
              type: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 2300);
            
          }
         
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
            <ToastContainer />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h5"
              sx={{ textAlign: "center" }}
              component="h2"
              className="fs-1"
            >
              Create Category
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={createCategoryValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="category_name"
                    type="text"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="category_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
