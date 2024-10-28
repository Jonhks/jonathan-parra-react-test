import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import classes from "./ProductsTable.module.css";
import { useProductsStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";
import Modal from "../Modal";

interface Column {
  id: string;
}

export interface Data {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: string;
}

function createData(
  id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  image: string,
  rating: string
): Data {
  return { id, title, price, description, category, image, rating };
}

export default function ColumnGroupingTable() {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(25);
  const products = useProductsStore((store) => store.data);
  const getProductDetail = useProductsStore((store) => store.getProductDetail);
  const getSortData = useProductsStore((store) => store.getSortData);
  const getIdProduct = useProductsStore((store) => store.getIdProduct);
  const idProduct = useProductsStore((store) => store.idProduct);
  const deleteProduct = useProductsStore((store) => store.deleteProduct);
  const getUpdateProduct = useProductsStore((store) => store.getUpdateProduct);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Filtrar productos por titulo del producto usando el valor con debounce
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Retraso de 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();
  const newArrColums =
    products &&
    Object.keys(products[0]).map((product) => {
      return {
        id: product,
        label: product,
        minWidth: `${(100 / Object.keys(products[0]).length).toFixed(2)}%`,
      };
    });

  const rows = filteredProducts.map((row) =>
    createData(
      row.id,
      row.title,
      `$${row.price}`,
      row.description,
      row.category,
      row.image,
      `⭐️${row?.rating?.rate}` as string
    )
  );

  const renderCompoente = (id: string, row: Data) => {
    let component;
    if (id === "image") {
      component = (
        <img
          src={row[id] as keyof Data}
          alt={id}
          width={30}
          height={30}
        />
      );
    } else {
      component = row[id as keyof Data];
    }
    return component;
  };

  const showProductDetail = () => {
    getProductDetail(idProduct);
    navigate(`/products/${idProduct}`);
  };

  return (
    <>
      <h2
        style={{ fontSize: "3rem", textAlign: "center", marginBottom: "2px" }}
      >
        Products
      </h2>
      <div className={classes.containerTable}>
        <Paper sx={{ width: "80%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align={"center"}>
                    <button onClick={() => getSortData()}>
                      <SortIcon />
                    </button>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="filter"
                      type="text"
                      name="filter"
                      placeholder="Filter by name"
                      autoComplete="filter"
                      fullWidth
                      variant="standard"
                      sx={{ ariaLabel: "filter" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>{rows.length} Products</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  {newArrColums.map((column) => (
                    <TableCell
                      key={column.id}
                      align={"center"}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        background: "#ccc",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => {
                          handleOpen();
                          getIdProduct(row.id);
                        }}
                      >
                        {newArrColums.map((column: Column) => {
                          return (
                            <TableCell key={column.id}>
                              {renderCompoente(column.id, row)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Modal
        idProduct={idProduct}
        open={openModal}
        handleClose={handleClose}
        showProductDetail={showProductDetail}
        deleteProduct={deleteProduct}
        getUpdateProduct={getUpdateProduct}
      />
    </>
  );
}
