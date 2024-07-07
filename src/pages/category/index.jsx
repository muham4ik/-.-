import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryModal  from "../../components/modal/category-modal/index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import service from "../../service/service";


const index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const getData = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const inputRef = useMask({
  //   mask: "+998 (__) ___-__-__",
  //   replacement: { _: /\d/ },
  // });
  useEffect(() => {
    getData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await service.delete(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editItem = (item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <>
      <div className="container">
        <CategoryModal
          open={open}
          handleClose={() => setOpen(false)}
          item={item}
        />
        <button className="w-[150px] bg-[#FF6E30] p-3 border border-transparent rounded-md text-[white] text-[18px] font-semibold hover:bg-transparent hover:text-[#FF6E30] hover:border-[#FF6E30] " onClick={() => setOpen(true)}>
        Add Service
        </button>
        <TableContainer component={Paper} className="my-4">
          <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
            <TableHead sx={{background: "#FF6E30"}} >
              <TableRow>
                <TableCell align="center" className="text-white p-3" sx={{fontSize: "18px" , fontWeight: "600"}}>T/R</TableCell>
                <TableCell align="center" className="text-white p-3" sx={{fontSize: "18px" , fontWeight: "600"}}>Service name</TableCell>
                <TableCell align="center" className="text-white p-3" sx={{fontSize: "18px" , fontWeight: "600"}}>Service price</TableCell>
                <TableCell align="center" className="text-white p-3" sx={{fontSize: "18px" , fontWeight: "600"}}>Edit</TableCell>
                <TableCell align="center" className="text-white p-3" sx={{fontSize: "18px" , fontWeight: "600"}}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }  }}
                >
                  <TableCell align="center" className="text-black p-3" sx={{fontSize: "19px" , fontWeight: "500"}}>{index + 1}</TableCell>
                  <TableCell align="center" className="text-black p-3" sx={{fontSize: "19px" , fontWeight: "500"}}>{item.name}</TableCell>
                  <TableCell align="center" className="text-black p-3" sx={{fontSize: "19px" , fontWeight: "500"}}>{item.price}</TableCell>
                  <TableCell
                    align="center"
                    
                  >
                    <button
                      className="p-3 bg-[#FF6E30] rounded-md  hover:bg-gray-500"
                      onClick={() => editItem(item)}
                    >
                      <box-icon type='solid' color="white" name='pencil'></box-icon>
                    </button>
                  </TableCell>
                  <TableCell
                  align="center"
                  >
                     <button
                       className="p-3 bg-[red] rounded-md  hover:bg-[black]"
                      onClick={() => deleteItem(item.id)}
                    >
                     <box-icon name='trash-alt' color="white" ></box-icon>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default index;
