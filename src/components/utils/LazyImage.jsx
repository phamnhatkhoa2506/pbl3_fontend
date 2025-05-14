import { LazyLoadImage } from 'react-lazy-load-image-component';


const LazyImage = ({ imageUrl, name }) => {
    return (
        <LazyLoadImage
            src={imageUrl}
            alt={name}
            effect="blur"
            className="w-100 object-fit-cover"
            style={{ borderRadius: '8px', maxHeight: '140px' }}
        />
    )
}

export default LazyImage;