import React, { useEffect, useState } from "react";
import WorkerModal from "../../components/modal/worker-modal/index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import worker from "../../service/worker";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";
const index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });
  const getData = async () => {
    try {
      const response = await worker.get(params);
      if (response.status === 200 && response?.data?.user) {
        setData(response?.data?.user);
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
    console.log(id);
    try {
      const response = await worker.delete(id);
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

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  return (
    <>
      <div className="container">
        <WorkerModal
          open={open}
          handleClose={() => setOpen(false)}
          item={item}
        />
        <div className="category_main flex items-center justify-between">
          <button className="btn-add-category" onClick={() => setOpen(true)}>
            Add Workers
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
                  First name
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="center"
                  className="text-white p-3"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Age
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
                    sx={{ fontSize: "19px", fontWeight: "500" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{ fontSize: "19px", fontWeight: "500" }}
                  >
                    {item.first_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{ fontSize: "19px", fontWeight: "500" }}
                  >
                    {item.last_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{ fontSize: "19px", fontWeight: "500" }}
                  >
                    {item.gender}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-black p-3"
                    sx={{ fontSize: "19px", fontWeight: "500" }}
                  >
                    {item.age}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "50px",
                      padding: "20px",
                    }}
                  >
                    <button
                      className="p-3 bg-transparent rounded-md  hover:bg-gray-500"
                      onClick={() => editItem(item)}
                    >
                      <box-icon
                        type="solid"
                        color="black"
                        name="pencil"
                      ></box-icon>
                    </button>
                    <button
                      className="p-3 bg-trasnparent rounded-md  hover:bg-[black]"
                      onClick={() => deleteItem(item.id)}
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

export default index;
