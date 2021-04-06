import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 220,
    height: 420,
    boxShadow: '0 3px 5px 2px gray',
  },
  media: {
    height: 240,
  },
  cardContent: {
    marginRight :'40px',
  },
});

const Books = (props) => {
  const classes = useStyles();
    const books = props.book;
    const {name,author,imageURL,price} = books ;
    return (
      <Grid item xs={6} md={4} lg={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography><Typography gutterBottom variant="h6" component="h2">
            A. {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Typography className={classes.cardContent} gutterBottom variant="h6" component="h2">{price}$</Typography>
        <Link size="small" onClick={() => props.handleCart(books)} to="/review" className="btn btn-primary" >Buy Now</Link>
      </CardActions>
      
    </Card>
      </Grid>
      
    );
};

export default Books;