import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchForm, setSearchForm] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsExpanded(false);
    const queryString = `/artwork?title=true&q=${searchForm}`;
    router.push(queryString);
    setSearchForm("");
    setSearchHistory(await addToHistory(`title=true&q=${searchForm}`));
  }

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
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>

                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            &nbsp;
            {token && (
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
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/favourites"}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/history"}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
