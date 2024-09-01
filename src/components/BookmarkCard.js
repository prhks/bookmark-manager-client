import React, { useContext } from "react";
import {
  Card,
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Image,
  Icon,
  Label,
  Button,
  Grid,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function BookmarkCard({
  bookmark: { id, image, url, title, description, username },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid style={{ width: "300px", height: "300px", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 128, 128, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image src={image} style={{ maxHeight: "100%", maxWidth: "100%" }} />
      </div>
      <Card.Content>
        <Card.Header
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "16px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {url}
        </Card.Header>
        <Card.Meta
          style={{
            fontSize: "14px",
            whiteSpace: "nowrap",
            overflowY: "auto",
            paddingRight: "5px",
            scrollbarWidth: "thin",
          }}
        >
          {title}
        </Card.Meta>
        <Card.Description
          style={{
            fontSize: "12px",
            height: "100px",
            overflowY: "auto",
            paddingRight: "5px",
            scrollbarWidth: "thin",
          }}
        >
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {user && (
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="right" style={{ marginBottom: 20 }}>
                <DeleteButton bookmarkId={id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Card.Content>
    </Card>
  );
}

export default BookmarkCard;
