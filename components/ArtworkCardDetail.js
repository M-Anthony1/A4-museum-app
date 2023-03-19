import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function ArtworkCardDetail({ objectID }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favourites?.includes(objectID));

  const favouritesClicked = () => {
    if (showAdded) {
      setFavourites((current) => current.filter((fav) => fav != objectID));
      setShowAdded(false);
    } else {
      setFavourites((current) => [...current, objectID]);
      setShowAdded(true);
    }
  };

  const buttonVar = showAdded ? "primary" : "outline-primary";

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  return data ? (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>

        <Card.Text>
          <strong>Date: </strong> {data.objectDate ? data.objectDate : "N/A"}
          <br />
          <strong>Classification: </strong>
          {data.classification ? data.classification : "N/A"}
          <br />
          <strong>Medium: </strong>
          {data.medium ? data.medium : "N/A"}
          <br />
          <br />
          <strong>Artist: </strong>
          {data.artistDisplayName ? data.artistDisplayName : "N/A"}
          {data.artistDisplayName && (
            <>
              {" "}
              {data.artistWikidata_URL ? (
                <span>
                  ({" "}
                  <a
                    href={data?.artistWikidata_URL}
                    style={{ color: "#18bc9c" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    wiki
                  </a>{" "}
                  )
                </span>
              ) : null}
            </>
          )}
          <br />
          <strong>Credit Line: </strong>
          {data.creditLine ? data.creditLine : "N/A"}
          <br />
          <strong>Dimensions: </strong>
          {data.dimensions ? data.dimensions : "N/A"}
          <Button
            variant={buttonVar}
            style={{ display: "flex", marginTop: "20px" }}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite ( added )" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  ) : null;
}
