import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminHeader from "../../../components/admin/header";
import request from "../../../connects/axios_config";
import { userUrl, roleUrl } from "../../../connects/url";
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../actions/user";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [userSelected, setUserSelected] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [listRole, setListRole] = useState("");
  const [formSearch, setFormSearch] = useState({
    username: "",
    fullname: "",
    roleId: "",
  });
  const [formCreate, setFormCreate] = useState({
    username: "",
    email: "",
    avatar: "",
    gender: "",
    fullname: "",
    phone: "",
  });
  const fetchRole = async () => {
    const data = await request.get(roleUrl.FETCH);
    console.log(data);
    setListRole(data);
  };
  useEffect(() => {
    fetchRole();
    dispatch(getUser({}));
  }, []);
  const onsubmitCreate = () => {
    const formData = new FormData();
    formData.append("username", formCreate.username);
    formData.append("avatar", formCreate.avatar);
    formData.append("email", formCreate.email);
    formData.append("fullname", formCreate.fullname);
    formData.append("gender", formCreate.gender);
    formData.append("phone", formCreate.phone);
    request.post(userUrl.CREATE, formData);
  };
  const onsubmitUpdate = () => {
    const formData = new FormData();
    formData.append("image", imageUpdate);
    formData.append(
      "inforUser",
      new Blob([JSON.stringify(userSelected)], {
        type: "application/json",
      })
    );
    request.put(userUrl.UPDATE, formData);
  };

  const onChooseImage = (e) => {
    console.log(e.target.files[0].name);
    setFormCreate({ ...formCreate, avatar: e.target.files[0] });
  };
  const onChooseImageUpdate = (e) => {
    console.log(e.target.files[0].name);
    setImageUpdate(e.target.files[0]);
  };
  return (
    <div>
      <AdminHeader />
      <Container>
        <div style={{ display: "flex", margin: 20 }}>
          <TextField label="Username" onChange={e=>setFormSearch({...formSearch,username:e.target.value})}/>
          <TextField label="Fullname" onChange={e=>setFormSearch({...formSearch,fullname:e.target.value})} />
          {listRole ? (
            <RadioGroup
              style={{ flexDirection: "row", margin: 10 }}
              onChange={e=>setFormSearch({...formSearch,roleId:e.target.value})}
            >
              {listRole.map((r) => {
                return (
                  <FormControlLabel
                    key={r.id}
                    value={r.id}
                    control={<Radio />}
                    label={r.name}
                  />
                );
              })}
            </RadioGroup>
          ) : null}
          <Button
            style={{ margin: 20 }}
            variant="contained"
            color="primary"
            onClick={()=>dispatch(getUser(formSearch))}
          >
            Search
          </Button>
          <Button
            style={{ margin: 20 }}
            variant="contained"
            color="primary"
            onClick={()=>dispatch(getUser({}))}
          >
            Get All
          </Button>
        </div>
        <Button
          style={{ margin: 20,backgroundColor:"#07913a",color:"#ffff" }}
          onClick={() => setOpenDialogCreate(true)}
          variant="contained"
        >
          Create
        </Button>

        <Dialog
          open={openDialogCreate}
          onClose={() => {
            setOpenDialogCreate(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Create</DialogTitle>
          <DialogContent>
            <DialogContentText>Adding User for your website</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User name"
              type="text"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setFormCreate({ ...formCreate, username: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full name"
              type="email"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setFormCreate({ ...formCreate, fullname: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setFormCreate({ ...formCreate, email: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone"
              type="email"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setFormCreate({ ...formCreate, phone: e.target.value })
              }
            />
            <RadioGroup
              aria-label="gender"
              name="gender1"
              style={{ flexDirection: "row", margin: 10 }}
              onChange={(e) =>
                setFormCreate({ ...formCreate, gender: e.target.value })
              }
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              style={{ flexDirection: "row", margin: 10 }}
            >
              <FormControlLabel
                value="ADMIN"
                control={<Radio />}
                label="ADMIN"
              />
              <FormControlLabel value="USER" control={<Radio />} label="USER" />
            </RadioGroup>

            <Button variant="contained" component="label">
              {formCreate.avatar ? (
                <span>{formCreate.avatar.name}</span>
              ) : (
                "Upload Avatar"
              )}
              <input type="file" hidden onChange={onChooseImage} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogCreate(false)} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={onsubmitCreate}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialogUpdate}
          onClose={() => {
            setOpenDialogUpdate(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Update</DialogTitle>
          <img
            alt="avatar"
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              alignSelf: "center",
            }}
            src={userSelected.avatar}
          />
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User name"
              value={userSelected.username}
              type="text"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, username: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full name"
              type="email"
              value={userSelected.fullname}
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, fullname: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              value={userSelected.email}
              type="email"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, email: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone"
              value={userSelected.phone}
              type="email"
              fullWidth
              style={{ margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, phone: e.target.value })
              }
              value={userSelected.phone}
            />
            <RadioGroup
              aria-label="gender"
              name="gender1"
              style={{ flexDirection: "row", margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, gender: e.target.value })
              }
              value={userSelected.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={userSelected.roleId}
              style={{ flexDirection: "row", margin: 10 }}
              onChange={(e) =>
                setUserSelected({ ...userSelected, roleId: e.target.value })
              }
            >
              <FormControlLabel value="1" control={<Radio />} label="ADMIN" />
              <FormControlLabel value="0" control={<Radio />} label="USER" />
            </RadioGroup>
            <Button variant="contained" component="label">
              "Upload Avatar"
              <input type="file" hidden onChange={onChooseImageUpdate} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogUpdate(false)} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={onsubmitUpdate}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="center">Fullname</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.response
                ? data.response.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">
                        <Avatar alt={user.fullname} src={user.avatar} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.username}
                      </TableCell>
                      <TableCell align="center">{user.fullname}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      {user.status === "ACTIVE" ? (
                        <TableCell align="center">
                          <div
                            style={{
                              borderRadius: 10,
                              textAlign: "center",
                              backgroundColor: "#00a105",
                              color: "#ffff",
                            }}
                          >
                            {user.status}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          align="right"
                          style={{ backgroundColor: "#c4044e" }}
                        >
                          {user.status}
                        </TableCell>
                      )}

                      <TableCell align="center">
                        <Button
                          style={{ margin: 20 }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setUserSelected(user);
                            setOpenDialogUpdate(true);
                          }}
                        >
                          Update
                        </Button>
                        <Button variant="contained" color="secondary">
                          BLOCK
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
export default UserPage;
