import { DeleteModal } from '../types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ deleteUserId, deleteModal, setDeleteModal}:DeleteModal) {
  const handleOpen = () => setDeleteModal(true);
    const handleClose = () => setDeleteModal(false);
    
  const confirmDelete = async () => {
    let token = localStorage.getItem("token")
      
        const res = await fetch(`http://localhost:8000/api/customer/${deleteUserId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({token:token})
        })
        const data = await res.json()
        console.log("DELETE", data);
        setDeleteModal(false)
    }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete that user? id: {deleteUserId}
          </Typography>
                  <Button onClick={()=>{confirmDelete()}}>
                      Delete
                 </Button>
              </Box>
      </Modal>
    </div>
  );
}