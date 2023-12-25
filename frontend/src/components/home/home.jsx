import { Grid } from "@mui/material";
import Posts from "./post/posts.jsx"

//components
import Banner from "../banner/banner";
import Cat from "./cat";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Cat />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Posts/>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
