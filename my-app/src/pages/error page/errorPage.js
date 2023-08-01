import { Link } from "react-router-dom";
import "./errorPage.css";

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="row error-page">
        <div className="col-md-6">
          <div className="content-page">
            <h1 className="content-title text-uppercase">Storify</h1>
            <h2>Page Note Found</h2>
            <p>
              <span className="text-danger">Sorry</span>, The page you’re
              looking for doesn’t exist.
            </p>
            <Link to="/dashboard">
              {" "}
              <button
                className="btn btn-primary home-btn"
                style={{
                  backgroundColor: "var(--dark)",
                  borderColor: "var(--dark)",
                }}
              >
                Go Home
              </button>
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/645/645881.png?w=740&t=st=1671470989~exp=1671471589~hmac=2e78e65de93a6cf779cb4feb492d6ba519e3ffcb566f12fea22e1a2ca0cdacc5"
              alt="Error Picture"
              className="pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
