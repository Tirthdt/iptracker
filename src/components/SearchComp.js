import React, { useState } from "react";
import "./SearchComp.css";

const SearchComp = ({ data, searchIPDomain }) => {
  const [value, setValue] = useState("");

  const ip4 = new RegExp(
    "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$",
    "gm"
  );

  const ipv6 = new RegExp(
    "((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}",
    "g"
  );

  const domain = new RegExp(
    "^(?!-)[A-Za-z0-9-]+([\\-\\.]{1}[a-z0-9]+)*\\.[A-Za-z]{2,6}$",
    "g"
  );

  const checkForIporDomain = () => {
    console.log(value);
    if (ip4.test(value)) {
      console.log("IPv4 address");
      searchIPDomain("ipv4", value);
    } else if (ipv6.test(value)) {
      console.log("IPV6 address");
      searchIPDomain("ipv6", value);
    } else if (domain.test(value)) {
      console.log("domain");
      searchIPDomain("domain", value);
    } else {
      alert("Please enter valid domain or ip");
    }
  };

  return (
    <section>
      <h3>IP Address Tracker</h3>
      <img src="/assets/pattern-bg.png" alt="" />
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for any IP address or domain"
        />
        <button id="search" onClick={checkForIporDomain}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
            <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="info-container">
        <div className="info">
          <h4>IP Address</h4>
          <p>{data && data.ip}</p>
        </div>
        <div className="info">
          <h4>Location</h4>
          <p>
            {data &&
              data.location.city +
                "," +
                data.location.region +
                " " +
                data.location.postalCode}
          </p>
        </div>
        <div className="info">
          <h4>Timezone</h4>
          <p>{data && "UTC " + data.location.timezone}</p>
        </div>
        <div className="info">
          <h4>ISP</h4>
          <p>{data && data.isp}</p>
        </div>
      </div>
    </section>
  );
};

export default SearchComp;
