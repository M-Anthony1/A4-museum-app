import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favourites, setFavourites] = useAtom(favouritesAtom);

  return (
    <>
      <Row className="gy-4">
        {favourites.length > 0 ? (
          favourites.map((id) => (
            <Col lg={3} key={id}>
              <ArtworkCard objectID={id} />
            </Col>
          ))
        ) : (
          <>
            <p>
              <strong>Nothing Here</strong>, Try adding some new artwork to the
              list.
            </p>
          </>
        )}
      </Row>
    </>
  );
}
