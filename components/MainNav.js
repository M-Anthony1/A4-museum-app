import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link';

export default function MainNav(){

    const [searchForm, setSearchForm] = useState()
    const router = useRouter();

    const handleSubmit = (e) =>{
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchForm}`)
    }

    return (
    <>
    
     <Navbar variant="dark" bg="dark" expand="lg" fixed="top">
        <Container>
                <Navbar.Brand>Marco Schiralli</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link> 
                        <Link href="/about" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>             
                    </Nav>

                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchForm(e.target.value)}
                        />
                        <Button variant="success" type='submit'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />
        <br />
    </>
    );
  };