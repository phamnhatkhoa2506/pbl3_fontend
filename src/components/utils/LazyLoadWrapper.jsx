import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const LazyLoadWrapper = ({ children, fallback = null, rootMargin = '100px' }) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return <div ref={ref}>{isVisible ? children : fallback}</div>;
};

LazyLoadWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    rootMargin: PropTypes.string
};

export default LazyLoadWrapper;
