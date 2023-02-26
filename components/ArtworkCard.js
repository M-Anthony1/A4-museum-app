import useSWR from 'swr';


export default function ArtworkCard({objectID}){


const { data,error } = useSWR (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)


}