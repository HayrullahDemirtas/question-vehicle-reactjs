import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ProductCard = ({ products }) => {
  return (
    <div
      className="row row-cols-1 row-cols-md-2 g-4"
      style={{ marginTop: "2rem" }}
    >
      {products.map((product) => (
        <div className="col" key={product.model}>
          <div className="card">
            <img
              src={product.image}
              className="card-img-top"
              alt="product-image"
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p class="card-text">{product.description}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Ne kadar satıldı: {product.count}</li>
                <li class="list-group-item">Bir araçtaki kullanım sayısı: {product.quantity}</li>
                <li class="list-group-item">Fiyat: {product.price}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductCard.propTypes = {
    products: PropTypes.array
};

export default ProductCard;
