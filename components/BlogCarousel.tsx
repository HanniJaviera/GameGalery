"use client";

import React from "react";
// Importamos solo lo necesario, o usamos el import * as si el error persiste.
import Carousel from "react-bootstrap/Carousel";

// Tipado para hacer el componente más seguro
interface ImageProps {
  src: string;
  alt: string;
}

interface BlogCarouselProps {
  images: ImageProps[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ images }) => {
  return (
    // Utilizamos un div simple para envolver la instancia del carrusel
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
