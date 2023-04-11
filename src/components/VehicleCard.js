import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const VehicleCard = ({ vehicles }) => {
  console.log(vehicles);
  return (
    <div
      className="row row-cols-1 row-cols-md-2 g-4"
      style={{ marginTop: "2rem" }}
    >
      {vehicles.map((vehicle) => (
        <div className="col" key={vehicle.model}>
          <div className="card">
            <img
              src={vehicle.image}
              className="card-img-top"
              alt="vehicle-image"
            />
            <div className="card-body">
              <h5 className="card-title">{vehicle.userName}</h5>
              <ul class="list-group list-group-flush" key={vehicle.brand}>
                <li class="list-group-item">Marka: {vehicle.brand}</li>
                <li class="list-group-item">Model: {vehicle.model}</li>
                <li class="list-group-item">Fiyat: {vehicle.price}</li>
                <li class="list-group-item">Yıl: {vehicle.year}</li>
                <li class="list-group-item">Kasa tipi: {vehicle.caseType}</li>
                <li class="list-group-item">Motor: {vehicle.engine}</li>
                <li class="list-group-item">Yakıt: {vehicle.fuel}</li>
                <li class="list-group-item">Vites: {vehicle.gear}</li>
                <li class="list-group-item">Km: {vehicle.km}</li>
                <li class="list-group-item">
                  Paket Adı: {vehicle.packageName}
                </li>
              </ul>
              {vehicle.additionalProducts.map(product => (
                <ul class="list-group list-group-flush" key={product.name}>
                <li class="list-group-item">Adı: {product.name}</li> 
                <li class="list-group-item">Açıklaması: {product.description}</li> 
                <li class="list-group-item">Bir araçtaki kullanım sayısı: {product.quantity}</li>
                <li class="list-group-item">Fiyat: {product.price}</li>
              </ul>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

VehicleCard.propTypes = {
  vehicles: PropTypes.array
};

export default VehicleCard;
