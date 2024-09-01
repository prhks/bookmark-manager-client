import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";

import { FETCH_BOOKMARKS_QUERY } from "../util/graphql";

function DeleteButton({ bookmarkId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      try {
        // Read the current data from the cache
        const data = proxy.readQuery({
          query: FETCH_BOOKMARKS_QUERY,
        });

        const newData = {
          ...data,
          getBookmarks: data.getBookmarks.filter((b) => b.id !== bookmarkId),
        };

        proxy.writeQuery({ query: FETCH_BOOKMARKS_QUERY, data: newData });
      } catch (err) {
        console.error("Error updating the cache after deletion", err);
      }
    },
    variables: {
      bookmarkId,
    },
  });
  return (
    <>
      <Popup
        content="Delete bookmark"
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            size="mini"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteBookmark}
      />
    </>
  );
}

const DELETE_BOOKMARK_MUTATION = gql`
  mutation deleteBookmark($bookmarkId: ID!) {
    deleteBookmark(bookmarkId: $bookmarkId)
  }
`;

export default DeleteButton;
