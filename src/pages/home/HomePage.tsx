import { AxiosInstance } from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Pagination,
  TextField,
  Grid2,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

type HomePageProps = {
  api: AxiosInstance;
};

type Post = {
  id: number;
  userId: string;
  title: string;
  description: string;
  status: string;
  createDate: Date;
  updateDate: Date;
};

function HomePage({ api }: HomePageProps) {
  const [postList, setPostList] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get<Post[]>("/Post");
        setPostList(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [api]);

  useEffect(() => {
    const filtered = postList.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(1);
  }, [searchTerm, postList]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <>
      <Container>
        <Navbar />
        <Typography variant="h4" gutterBottom textAlign="center">
          📜 POST LIST
        </Typography>
        <TextField
          fullWidth
          label="🔍 Search..."
          variant="outlined"
          size="small"
          sx={{ marginBottom: 3 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <>
            <Grid2 container spacing={3} justifyContent="flex-start">
              {displayedPosts.map((post) => (
                <Grid2
                 size ={4}
                  key={post.id}
                  component="div"
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {post.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        mt={2}
                        color="textSecondary"
                      >
                        📅 Create Date:
                        {new Date(post.createDate).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default HomePage;
