import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import http from "../../../service/config";

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

export default function BasicModal({ open, handleClose, id }) {
  const handleChange = (e) => {
    const file = new FormData()
    file.append("file", e.target.files[0])
    http.post(`media/upload-photo?id=${id}`,file)
    setTimeout(()=>{
      handleClose()
    },2500)
    
  };

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
          className="text-center font-bold fs-1 text-[24px]"
        >
          Add Media-file
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
            <input type="file" placeholder="Image" className="w-[500px] p-3" onChange={handleChange} />
           
        </Typography>
      </Box>
    </Modal>
  );
}
