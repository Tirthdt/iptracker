import { useEffect, useState } from "react";
import Map from "./components/Map";
import SearchComp from "./components/SearchComp";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_CI2njBsZKbhCHjbKGv5LX3DytSAKw&escapedUnicode=1"
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {}, [data]);

  const searchIPDomain = (type, value) => {
    let url =
      "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_CI2njBsZKbhCHjbKGv5LX3DytSAKw";
    if (type === "ipv4" || type === "ipv6") {
      url += `&ipAddress=${value}`;
    } else {
      url += `&domain=${value}`;
    }

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <SearchComp data={data} searchIPDomain={searchIPDomain} />
      {!loading && data && (
        <Map lat={data.location.lat} long={data.location.lng} />
      )}
    </div>
  );
}

export default App;
