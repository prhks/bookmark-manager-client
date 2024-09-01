import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import BookmarkCard from "../components/BookmarkCard";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkSearch from "../components/BookmarkSearch";
import { FETCH_BOOKMARKS_QUERY } from "../util/graphql";
import bookImage from "../assets/bookmark-logo.webp";

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FETCH_BOOKMARKS_QUERY);

  if (loading) return <h1>Loading bookmarks...</h1>;
  if (error) return <h1>Error loading bookmarks</h1>;

  // Check if data exists and contains getBookmarks
  const userBookmarks = user
    ? data?.getBookmarks.filter(
        (bookmark) => bookmark.username === user.username
      ) || []
    : [];

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Bookmark Manager</h1>
      </Grid.Row>

      {user ? (
        <>
          <Grid.Row>
            <Grid.Column>
              <BookmarkForm />
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <BookmarkSearch />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <h1>Loading bookmarks...</h1>
            ) : (
              <Transition.Group>
                {userBookmarks &&
                  userBookmarks.map((bookmark) => (
                    <Grid.Column key={bookmark.id} style={{ marginBottom: 20 }}>
                      <BookmarkCard bookmark={bookmark} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </>
      ) : (
        <Grid.Row centered textAlign="center" style={{ marginTop: 20 }}>
          <Grid.Column textAlign="center">
            <img
              src={bookImage}
              alt="Bookmark Image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}

export default Home;
