import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ConfirmModal from "./components/ConfirmModal";
import AddingUser from "./components/AddingUser";
import UpdateUser from "./components/UpdateUser";
import { User } from "./types";
import SpecialAccess from "./components/SpecialAccess";
import { useQuery } from "react-query"

function App() {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<number>();
  const [updatePannel, setUpdatePannel] = useState<number|undefined>();

  
  async function callApi() {
    const res = await fetch("http://localhost:8000/api/customer");
    return res.json();
  }
  
  const { data, status } = useQuery("userData", callApi, {
    keepPreviousData: true
  })

  const deleteUser = (userId: number) => {
    setDeleteModal(true);
    setDeleteUserId(userId);
  };
  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error...</div>
  }

  return (
    <div className="App">
      <SpecialAccess />
      <div>{deleteModal && (
        <ConfirmModal
          deleteUserId={deleteUserId}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      )}
      <h2>Handle Users</h2>
      {data &&
        data.map((user:User, index:number) => (
          <div key={user._id}>
            <p className="username_txt">{user.userName}</p>
            <Stack className="ctn_buttons" direction="row" spacing={4}>
              <Button
                onClick={() => {
                  deleteUser(user._id);
                }}
                variant="contained"
              >
                Delete the user
              </Button>
              <Button onClick={() => {
                  setUpdatePannel(index);
              }}
                variant="contained">Update the user</Button>
             <UpdateUser user={user} updatePannel={updatePannel} index={index} />
            </Stack>
          </div>
        ))}
        <AddingUser />
      </div>
      <div />
    </div>
  );
}

export default App;
