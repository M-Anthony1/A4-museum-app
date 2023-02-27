import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useRouter } from 'next/router'
import { Row, Col, Pagination } from 'react-bootstrap'
import useSWR from 'swr'
import ArtworkCard from "../../components/ArtworkCard"

const PER_PAGE = 12

export default function Artwork (){

    const [page, setPage] = useState(1)
    const [artworkList, setArtworkList] = useState()

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data,error } = useSWR (`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    const previousPage = () =>{
        if (page > 1){
          setPage(page - 1)
        } 
      }
    
      const nextPage = () => {
    
        if (page < artworkList.length)
        setPage(page + 1)
      }



      useEffect(() =>{

        if(data){
            const results = []
        

        for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
            results.push(chunk);
          }

          setArtworkList(results)
          setPage(1)
        }
      }, [data])

      if (error){
        return <Error statusCode={404} />
      }

      if(!artworkList){
        return null;
      }

      return (
        artworkList.length == 0 ?
        <>
          <Card>
              <Card.Body>
                  <Card.Title>Nothing Here</Card.Title>
                  <Card.Text>
                      Try search for something else.
                  </Card.Text>
              </Card.Body>
          </Card>
      
      
        </>: 
        <>
          <Row className="gy-4">
              {artworkList[page - 1].map((objectID) => {
                  return <Col lg={3} key={objectID}>
                      <ArtworkCard objectID={objectID} />
                  </Col>
              })}
          </Row>
           <br/>
           
          <Row>
              <Col>
                  <Pagination>
                      <Pagination.Prev onClick={previousPage} />
                      <Pagination.Item >{page}</Pagination.Item>
                      <Pagination.Next  onClick={nextPage} />
                  </Pagination>
              </Col>
          </Row>
       </>

      )

      
      


  












}