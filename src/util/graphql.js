import gql from "graphql-tag";

export const FETCH_BOOKMARKS_QUERY = gql`
  {
    getBookmarks {
      id
      image
      url
      title
      description
      username
    }
  }
`;
