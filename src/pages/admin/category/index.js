import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CategoryPage = () => {
  const classes = useStyles();
  const [openDialogCreate, setOpenDialogCreate] = useState(false)
  useEffect(() => {
    
  }, [])
  return (
    <div>
      <Container>
        <Button style={{ margin: 20 }} onClick={()=>setOpenDialogCreate(true)} variant="contained" color="primary">
          Create
        </Button>
        <Dialog open={openDialogCreate} onClose={()=>{setOpenDialogCreate(false)}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding category of product for store
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category name"
            type="email"
            fullWidth
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDialogCreate(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>setOpenDialogCreate(false)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ margin: 20 }}
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button variant="contained" color="secondary">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
export default CategoryPage;
