import React, { useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Input,
  Button,
  Form,
  Grid,
  Transition,
  Segment,
} from "semantic-ui-react";
import BookmarkCard from "./BookmarkCard";
import { AuthContext } from "../context/auth";

function BookmarkSearch() {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error, refetch } = useQuery(SEARCH_BOOKMARKS_QUERY, {
    variables: { query: searchQuery },
    skip: !searchQuery,
  });

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    refetch();
  }

  // Filter bookmarks by the logged-in user's username
  const userBookmarks = user
    ? data?.searchBookmarks.filter(
        (bookmark) => bookmark.username === user.username
      ) || []
    : [];

  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        <h2>Search Bookmark:</h2>
        <Form.Field>
          <Input
            icon="search"
            iconPosition="left"
            placeholder="Search bookmarks..."
            name="query"
            value={searchQuery}
            onChange={handleSearchChange}
            fluid
          />
          {error && (
            <div className="ui error message" style={{ marginTop: 10 }}>
              <ul className="list">
                {error.graphQLErrors.map((err, index) => (
                  <li key={index}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
          <Button
            type="submit"
            color="teal"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            Search
          </Button>
        </Form.Field>
      </Form>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {error.graphQLErrors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      {data && data.searchBookmarks.length === 0 && <p>No bookmarks found.</p>}

      <Grid stackable columns={2}>
        <Transition.Group>
          {userBookmarks &&
            userBookmarks.map((bookmark) => (
              <Grid.Column
                key={bookmark.id}
                style={{ marginBottom: 20 }}
                className="bookmark-column"
              >
                <Segment raised>
                  <BookmarkCard bookmark={bookmark} />
                </Segment>
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid>
    </>
  );
}

const SEARCH_BOOKMARKS_QUERY = gql`
  query searchBookmarks($query: String!) {
    searchBookmarks(query: $query) {
      id
      image
      url
      title
      description
      username
    }
  }
`;

export default BookmarkSearch;
