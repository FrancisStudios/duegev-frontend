import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './post.component.css';
import { Article } from "../../type/article.type";

export type PostComponentProps = {
  data: Article
}

const Post = (props: PostComponentProps) => {
    return (
        <Card className="post_card" key={props.data.article_id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.data.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
    )
}

export default Post