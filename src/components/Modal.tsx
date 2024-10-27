import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  borderRadius: "10px",
};

export default function BasicModal({
  idProduct,
  open,
  showProductDetail,
  handleClose,
  deleteProduct,
}: {
  idProduct: number;
  open: boolean;
  handleClose: () => void;
  showProductDetail: () => void;
  deleteProduct: () => void;
  urlNavigate: string;
}) {
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
          >
            TestTech
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            ¿Quieres <strong>ver el detalle</strong>, <strong>eliminar</strong>{" "}
            o <strong>editar</strong> el producto con el id {idProduct}?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            mt={2}
          >
            <Button
              variant="contained"
              startIcon={<InfoIcon />}
              color="secondary"
              onClick={() => showProductDetail()}
            >
              Show detail
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => {
                handleClose();
                deleteProduct();
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
