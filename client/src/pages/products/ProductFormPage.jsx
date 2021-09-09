import { useState } from "react";
import { useProducts } from "../../context/providers/ProductsContext";

import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const ProductFormPage = ({ history }) => {
  const { addNewProduct, isLoading, errorMessage } = useProducts();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productCreated = await addNewProduct(product);

      if (!productCreated) throw new Error(errorMessage);

      toast.success("🚀 New product added", { position: "bottom-right" });
      history.push("/");
    } catch (err) {
      errorMessage
        ? toast.error(errorMessage, { position: "bottom-right" })
        : toast.error(err, { position: "bottom-right" });
    }
  };

  return (
    <div className="row h-100">
      <div className="col-md-8 offset-md-2 my-auto">
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Save product</h1>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!product.name || isLoading}
              >
                {isLoading ? <Spinner /> : "Save"}
              </button>
            </div>
            <div className="col-md-7">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control mb-3"
                name="name"
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                className="form-control mb-3"
                value={product.price}
                name="price"
                onChange={handleChange}
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                className="form-control mb-3"
                name="quantity"
                onChange={handleChange}
              />

              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="2"
                id="description"
                className="form-control"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-5 my-auto">
              <img src="/assets/no-image.png" alt="" className="img-fluid" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;