import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../../components/modal/product-modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import product from "../../service/product";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FileModal from "../../components/modal/file-modal";
import "./index.css";
import SingleProduct from "../single-product";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [id, setId] = useState(null);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await product.get(params);
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
        const total = Math.ceil(response.data.total / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const deleteItem = async (id) => {
    try {
      const response = await product.delete(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setOpen(true);
    setItem(item);
  };

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const singleNavigate = (id) => {
    navigate("/main/single-product", { state: { id } });
  };
  

  const createFile = (id) => {
    setId(id);
    setOpenn(true);
  };

  return (
    <>
      <div className="container">
        <ProductModal
          open={open}
          handleClose={() => setOpen(false)}
          item={item}
        />
        <FileModal open={openn} handleClose={() => setOpenn(false)} id={id} />

       <div className="d-none">
       {id && (
          <SingleProduct id={id} />
        )}
       </div>
        <div className="category_main flex items-center justify-between">
          <button className="btn-add-category" onClick={() => setOpen(true)}>
            Add Products
          </button>
          <div className="inpt">
            <input
              type="text"
              placeholder="Searching"
              className="styled-input"
            />
          </div>
        </div>
        <TableContainer component={Paper} className="my-4">
          <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
            <TableHead sx={{ background: "#FF6E30" }}>
              <TableRow>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  T/R
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Product name
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Color
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Size
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Count
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Cost
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {item.product_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {item.color}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {item.size}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {item.count}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{
                      fontSize: "19px",
                      fontWeight: "500",
                      padding: "20px",
                    }}
                  >
                    {item.cost}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "20px",
                    }}
                  >
                    <button
                      className="p-3 bg-transparent rounded-md hover:bg-[black]"
                      onClick={() => createFile(item.product_id)}
                    >
                      <box-icon name="image-add" color="black"></box-icon>
                    </button>
                    <button
                      className="p-3 bg-transparent rounded-md hover:bg-gray-500"
                      onClick={() => singleNavigate(item.product_id)}
                    >
                      <box-icon name="show" color="black"></box-icon>
                    </button>
                    <button
                      className="p-3 bg-transparent rounded-md hover:bg-[black]"
                      onClick={() => deleteItem(item.product_id)}
                    >
                      <box-icon name="trash-alt" color="black"></box-icon>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          spacing={2}
          sx={{ display: "flex", alignItems: "end", marginTop: "10px" }}
        >
          <Typography>Page: {params.page}</Typography>
          <Pagination
            count={count}
            page={params.page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
};

export default Index;
