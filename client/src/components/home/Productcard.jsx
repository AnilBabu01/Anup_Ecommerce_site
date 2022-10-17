import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 305 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.images[0].Url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Typography>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">{product.price}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={`/product/${product._id}`}
          id="view_btn"
          className="btn btn-block"
        >
          View Details
        </Link>
      </CardActions>
    </Card>
  );
}
