import Carousel from 'react-bootstrap/Carousel'

function TrailCarousel({photos}){
    
    const slidePhotos = photos.slice(0, 3)
    
    return (
        <Carousel className="carousel">
            <Carousel.Item className="item">
                <img src={slidePhotos[2].img_link} className="d-block w-100" alt={slidePhotos[2].title}/>
            </Carousel.Item>
            <Carousel.Item className="item">
                <img src={slidePhotos[0].img_link} className="d-block w-100" alt={slidePhotos[0].title}/>
            </Carousel.Item>
            <Carousel.Item className="item">
                <img src={slidePhotos[1].img_link} className="d-block w-100" alt={slidePhotos[1].title}/>
            </Carousel.Item>
        </Carousel>
    )
}

export default TrailCarousel; 