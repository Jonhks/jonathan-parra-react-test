import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Divider,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useProductsStore } from "../store/store";

const CreateProductContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  backgroundColor: "#0a0a0a",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    color: "red",
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const CreateProducts = () => {
  const [errorText, setErrorText] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [errorPrice, setErrorPrice] = useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [errorCategory, setErrorCategory] = useState(false);
  const [categoryMessage, setCategoryErrorMessage] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [errorUrl, setErrorUrl] = useState(false);
  const [urlErrorMessage, setUrlErrorMessage] = useState("");

  const addNewProduct = useProductsStore((store) => store.addNewProduct);

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      errorText ||
      errorPrice ||
      errorCategory ||
      errorDescription ||
      errorUrl
    ) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const newProduct = {
      title: data.get("title")! as string,
      price: data.get("price")! as string,
      category: data.get("category")! as string,
      description: data.get("description")! as string,
      image: data.get("urlImage")! as string,
    };
    navigate("/products");
    addNewProduct(newProduct);
  };

  // ! Todo este código se puede re-factorizar!!!

  const validateInputText = () => {
    const title = document.getElementById("title") as HTMLInputElement;

    let isValid = true;

    if (!title.value || title.value.trim().length <= 2) {
      setErrorText(true);
      setTextErrorMessage("require more than two characters");
      isValid = false;
    } else {
      setErrorText(false);
      setTextErrorMessage("");
    }
    return isValid;
  };
  const validateInputCategory = () => {
    const category = document.getElementById("category") as HTMLInputElement;

    let isValid = true;

    if (!category.value || category.value.trim().length <= 2) {
      setErrorCategory(true);
      setCategoryErrorMessage("require more than two characters");
      isValid = false;
    } else {
      setErrorCategory(false);
      setCategoryErrorMessage("");
    }
    return isValid;
  };

  const validateInputDescription = () => {
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;

    let isValid = true;

    if (!description.value || description.value.trim().length <= 2) {
      setErrorDescription(true);
      setDescriptionErrorMessage("require more than two characters");
      isValid = false;
    } else {
      setErrorDescription(false);
      setDescriptionErrorMessage("");
    }
    return isValid;
  };

  const validateInputUrlImage = () => {
    const urlImage = document.getElementById("urlImage") as HTMLInputElement;

    let isValid = true;

    if (!urlImage.value || urlImage.value.trim().length <= 2) {
      setErrorUrl(true);
      setUrlErrorMessage("require more than two characters");
      isValid = false;
    } else {
      setErrorUrl(false);
      setUrlErrorMessage("");
    }
    return isValid;
  };

  const validateInputPrice = () => {
    const price = document.getElementById("price") as HTMLInputElement;

    let isValid = true;

    if (!price.value || +price.value === 0) {
      setErrorPrice(true);
      setPriceErrorMessage("requires a value greater than 0");
      isValid = false;
    } else {
      setErrorPrice(false);
      setPriceErrorMessage("");
    }
    return isValid;
  };

  const runValidations = () => {
    validateInputText();
    validateInputPrice();
    validateInputCategory();
    validateInputDescription();
    validateInputUrlImage();
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <CreateProductContainer
        direction="column"
        justifyContent="space-between"
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Create Product
          </Typography>
          <Divider></Divider>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                error={errorText}
                helperText={textErrorMessage}
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                autoComplete="title"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorText ? "error" : "primary"}
                sx={{ ariaLabel: "title" }}
                onChange={validateInputText}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="category">Price</FormLabel>
              <TextField
                error={errorPrice}
                helperText={priceErrorMessage}
                id="price"
                type="number"
                name="price"
                placeholder="price"
                autoComplete="price"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorPrice ? "error" : "primary"}
                sx={{ ariaLabel: "price" }}
                onChange={validateInputPrice}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="category">Category</FormLabel>
              <TextField
                error={errorCategory}
                helperText={categoryMessage}
                id="category"
                type="text"
                name="category"
                placeholder="Category"
                autoComplete="category"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorCategory ? "error" : "primary"}
                sx={{ ariaLabel: "category" }}
                onChange={validateInputCategory}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="description">Description</FormLabel>
              </Box>
              <TextField
                error={errorDescription}
                helperText={descriptionErrorMessage}
                name="description"
                placeholder="Description"
                type="text"
                id="description"
                autoComplete="description"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorDescription ? "error" : "primary"}
                onChange={validateInputDescription}
                sx={{ ariaLabel: "description" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="description">Url image</FormLabel>
              </Box>
              <TextField
                error={errorUrl}
                helperText={urlErrorMessage}
                name="urlImage"
                placeholder="url Image"
                type="text"
                id="urlImage"
                autoComplete="urlImage"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorUrl ? "error" : "primary"}
                onChange={validateInputUrlImage}
                sx={{ ariaLabel: "urlImage" }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                runValidations();
              }}
              style={{ backgroundColor: "#0a0a0a" }}
            >
              Save product
            </Button>
          </Box>
        </Card>
      </CreateProductContainer>
    </>
  );
};

export default CreateProducts;
