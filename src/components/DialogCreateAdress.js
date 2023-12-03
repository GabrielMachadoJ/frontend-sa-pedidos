import { Dialog, DialogContent } from "@mui/material";

export default function DialogCreateAdress({ isOpen, handleClose }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <h1>Cadastrar endereço</h1>
      </DialogContent>
    </Dialog>
  );
}
