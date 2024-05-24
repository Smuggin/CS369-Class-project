import React from 'react';
import './styles.css';

const products = [
  {
    id: 1,
    imgSrc: 'https://i.imgur.com/oYiTqum.jpg',
    name: 'Product name',
    price: 'Price $',
  },
  {
    id: 2,
    imgSrc: 'https://i.imgur.com/2DhmtJ4.jpg',
    name: 'Product name',
    price: 'Price $',
  },
  {
    id: 3,
    imgSrc: 'https://i.imgur.com/oYiTqum.jpg',
    name: 'Product name',
    price: 'Price $',
  },
  {
    id: 4,
    imgSrc: 'https://i.imgur.com/2DhmtJ4.jpg',
    name: 'Product name',
    price: 'Price $',
  },
];

const ProductCard = () => {
  return (
    <div>
      <header>
      </header>
      <main>
        <ul className="cards">
          {products.map(product => (
            <li key={product.id}>
              <a href="#" className="card">
                <img src={product.imgSrc} className="card__image" alt={product.name} />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                    <div className="card__header-text">
                      <h3 className="card__title">{product.name}</h3>
                      <span className="card__price">{product.price}</span>
                    </div>
                  </div>
                  <p className="card__description">
                    <button className="button-17" role="button">More details</button>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ProductCard;
