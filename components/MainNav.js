import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function MainNav() {
  const [searchForm, setSearchForm] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${searchForm}`);
    setSearchForm("");
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        variant="dark"
        bg="dark"
        expand="lg"
        fixed="top"
      >
        <Container>
          <Navbar.Brand>Marco Schiralli</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
              </Link>

              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={() => setIsExpanded(false)}>
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchForm}
                aria-label="Search"
                onChange={(e) => setSearchForm(e.target.value)}
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>
            &nbsp;
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
