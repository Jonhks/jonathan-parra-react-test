import { useProductsStore } from "../../store/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classes from "./ProductsDetail.module.css";

const ProductsDetail = () => {
  const loading = useProductsStore((store) => store.loading);
  const productDetail = useProductsStore((store) => store.productDetail);

  const {
    category = "",
    description = "",
    image = "",
    price = "",
    rating,
    title = "",
  } = productDetail;
  return (
    <div className={classes.cardContainer}>
      {!loading && productDetail && (
        <Card sx={{ display: "flex", padding: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent
              sx={{
                flex: "1 0 auto",
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="div"
                variant="h5"
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {category}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {description}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.primay" }}
                >
                  {rating?.count} - calificaciones
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ color: "text.primay", fontSize: "38px", marginTop: 1 }}
                >
                  ${price}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={image}
              alt={description}
            />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.primay", marginTop: 5 }}
            >
              ⭐️{rating?.rate && rating?.rate}
            </Typography>
          </Box>
        </Card>
      )}
    </div>
  );
};

export default ProductsDetail;
