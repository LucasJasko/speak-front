import { useEffect } from "react";
import { useNavigate } from "react-router";

const Loader = () => {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);
  return (
    <div className="loader__container">
      <div className="honeycomb">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
