import React, {useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import RevenusHeader from "../../../components/admin/header/revenus";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card: {
    margin: 20,
    width: 250,
  },
}));
const HomeAdmin = () => {
  const classes = useStyles();
  const history = useHistory();
  const redirect = (link) => {
    history.push(link);
  };
  const showLoading = useSelector((state) => state.ui.showLoading);
  const data = useSelector((state) => state.user);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      <RevenusHeader />
      <Grid>
        <Grid>
          <Grid container justify="center">
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    User management
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    150 Users
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={() => redirect("/admin/user")}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Product management
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    150 product
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                      redirect("/admin/product");
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Contact management
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    15 ticket processing
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Blog Category
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    3 categories
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => redirect("/admin/category")}
                    size="small"
                    variant="contained"
                    className={classes.button}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Revenus management
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    3 categories
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default HomeAdmin;
