import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import product from "../../service/porductes";
import "./index.css"; // Customize the styles in this CSS file

const SingleProduct = () => {
  const location = useLocation();
  const id = location.state?.id;

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await product.get(id);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  if (!id) {
    return <div>Error: No product ID provided</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="product-details">
        <h1 className="product-title">{data.product_name}</h1>
        <div className="product-info">
          <div className="product-image">
            <img src={data.image_url && data.image_url.length > 0 ? data.image_url[0] : "No result"} alt="" />
          </div>
          <div className="product-meta">
            <p><strong>Category:</strong> {data.category_id}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Made in:</strong> {data.made_in}</p>
            <p><strong>For gender:</strong> {data.for_gender}</p>
            <p><strong>Colors:</strong> {data.color ? data.color.join(", ") : "N/A"}</p>
            <p><strong>Sizes:</strong> {data.size ? data.size.join(", ") : "N/A"}</p>
            <p><strong>Cost:</strong> ${data.cost}</p>
            <p><strong>Discount:</strong> {data.discount}%</p>
            <p><strong>Count:</strong> {data.count}</p>
            <p><strong>Age Range:</strong> {data.age_min} - {data.age_max}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
