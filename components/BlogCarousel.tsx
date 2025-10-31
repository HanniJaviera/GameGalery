"use client";

import React from "react";
import Carousel from "react-bootstrap/Carousel";


interface ImageProps {
  src: string;
  alt: string;
}

interface BlogCarouselProps {
  images: ImageProps[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ images }) => {
  return (
    <div className="my-4">
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={`carousel-item-${index}`}>
            <img className="d-block w-100" src={image.src} alt={image.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BlogCarousel;
