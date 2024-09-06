import { useEffect, useState } from "react";
import "./App.css";

const baseurl = "http://localhost:3999/api/notes";
function App() {
  const [count, setCount] = useState([]);
  useEffect(() => {
    fetch(baseurl)
      .then((res) => res.json())
      .then((res) => {
        // Assuming 'data' is the relevant property in the response
        console.log(res);
        setCount(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(count);
  return <>{count && count?.map((count, key) => <p>{count.name}</p>)}</>;
}

export default App;
