import { useEffect } from "react";
import { useNavigate } from "react-router";

interface LoaderProps {
  path?: string;
}

const Loader: React.FC<LoaderProps> = ({ path }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (path && path !== "/") {
      const timer = setTimeout(() => {
        navigate(path ? path : "/auth");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [path, navigate]);

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
