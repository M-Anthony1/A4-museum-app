import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/History.module.css";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    let historyItem = searchHistory[index];
    if (!historyItem.startsWith("/artwork")) {
      historyItem = "/artwork?" + historyItem;
    }
    router.push(historyItem);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <p>
              <strong>Nothing Here</strong>, Try searching for some artwork.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              onClick={(e) => historyClicked(e, index)}
              key={index}
              className={styles.historyListItem}
            >
              {Object.keys(historyItem).map((key, index) => (
                <span key={index}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}

              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
