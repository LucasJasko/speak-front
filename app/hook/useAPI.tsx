import { useEffect, useState } from "react";

export default function useAPI(path: string, payload?: object) {
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const options = {
        method: payload ? "POST" : "GET",
        body: payload ? JSON.stringify(payload) : undefined,
      };

      await fetch(path, options)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
        });
    } catch (error: any) {
      setResponse(error.message);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return response;
}

// payload exemple: {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       }
