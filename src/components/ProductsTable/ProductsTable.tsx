import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from "./ProductsTable.module.css";
import { useProductsStore } from "../../store/store";
// import { useNavigate } from "react-router-dom";

interface Column {
  id: string;
}

interface Data {
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
  const [rowsPerPage] = React.useState(20);
  const getData = useProductsStore((store) => store.getData);
  const products = useProductsStore((store) => store.data);
  console.log(products);

  // const navigate = useNavigate();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newArrColums =
    products &&
    Object.keys(products[0]).map((product) => {
      return {
        id: product,
        label: product,
        minWidth: `${(100 / Object.keys(products[0]).length).toFixed(2)}%`,
      };
    });
  const rows = products.map((row) =>
    createData(
      row.id,
      row.title,
      `$${row.price}`,
      row.description,
      row.category,
      row.image,
      `⭐️${row.rating.rate}` as string
    )
  );

  console.log(products);

  return (
    <>
      <h2
        style={{ fontSize: "3rem", textAlign: "center", marginBottom: "2px" }}
      >
        Productos
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
                        // onClick={() => navigate(`/products/${row.id}`)}
                      >
                        {newArrColums.map((column: Column) => {
                          return (
                            <>
                              {column.id === "image" ? (
                                <TableCell>
                                  <img
                                    src={row[column.id]}
                                    alt={column.id}
                                    width={30}
                                    height={30}
                                  />
                                </TableCell>
                              ) : (
                                <TableCell align={"center"}>
                                  {row[column.id as keyof Data]}
                                </TableCell>
                              )}
                            </>
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
    </>
  );
}
