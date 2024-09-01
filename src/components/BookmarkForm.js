import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_BOOKMARKS_QUERY } from "../util/graphql";

function BookmarkForm() {
  const { values, onChange, onSubmit } = useForm(createBookmarkCallback, {
    url: "",
  });
  const [errors, setErrors] = useState({});

  const [createBookmark, { error }] = useMutation(CREATE_BOOKMARK_MUTATION, {
    variables: values,
    update(proxy, result) {
      try {
        // Read the current cache
        const data = proxy.readQuery({
          query: FETCH_BOOKMARKS_QUERY,
        });

        const newData = {
          ...data,
          getBookmarks: [result.data.createBookmark, ...data.getBookmarks],
        };

        proxy.writeQuery({ query: FETCH_BOOKMARKS_QUERY, data: newData });

        // Reset the form value
        values.url = "";
      } catch (err) {
        console.error("Error updating cache", err);
      }
    },
    onError(err) {
      const errorMessages = err.graphQLErrors?.[0]?.extensions?.errors || {};
      setErrors(errorMessages);
    },
  });

  function createBookmarkCallback() {
    createBookmark();
  }

  return (
    <>
      <Form onSubmit={onSubmit} error={!!error}>
        <h2>Create a Bookmark:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Enter a URL"
            name="url"
            onChange={onChange}
            value={values.url}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {error.graphQLErrors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

//mutation
const CREATE_BOOKMARK_MUTATION = gql`
  mutation createBookmark($url: String!) {
    createBookmark(url: $url) {
      id
      image
      url
      title
      description
      username
    }
  }
`;

export default BookmarkForm;
