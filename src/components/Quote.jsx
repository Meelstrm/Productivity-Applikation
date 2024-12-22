import React, { useState, useEffect } from "react"; // Add this import

const Quote = () => {
  const [quote, setQuote] = useState(""); // useState hook for managing quote state

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random");
      const data = await response.json();
      setQuote(data[0].q); // Set the quote in the state
    };
    fetchQuote();
  }, []);

  return (
    <>
      <h2 style={{
        fontStyle: "italic",
        color: "darkgrey",
        textShadow: "-1px 0 pink, 0 1px pink, 1px 0 pink, 0 -1px pink",
      }}>
        ''{quote}''
      </h2>
    </>
  );
};

export default Quote;
