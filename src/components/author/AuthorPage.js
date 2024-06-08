import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import sanitizeHtml from "sanitize-html";

import { GET_AUTHOR_INFO } from "../../graphql/queries";
import CardEL from "../shared/CardEL";
import Loader from "../shared/Loader";

function AuthorPage() {
  const { slug } = useParams();

  const { loading, data, errors } = useQuery(GET_AUTHOR_INFO, {
    variables: { slug },
  });

  if (loading) return <Loader />;

  if (errors) return <Loader />;

  console.log(data);

  const {
    author: { name, field, avatar, description, posts },
  } = data;

  return (
    <Container maxWidth="lg">
      <Grid container mt={10}>
        <Grid
          xs={12}
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar src={avatar.url} sx={{ width: 200, height: 200 }} />
          <Typography component="h3" variant="h5" fontWeight={700} mt={4}>
            {name}
          </Typography>
          <Typography component="p" variant="p" color="text.secondary" mt={2}>
            {field}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(description.html),
            }}
          ></div>
        </Grid>
        <Grid item xs={12} mt={6}>
          <Typography component="h3" variant="h5" fontWeight={700}>
            مقالات {name}
          </Typography>
          <Grid container spacing={2} mt={2}>
            {posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={6} md={4}>
                <CardEL {...post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        
      </Grid>
    </Container>
  );
}

export default AuthorPage;
