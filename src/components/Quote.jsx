import React, { useState, useEffect } from "react";


const Quote = () => {
  const [quote, setQuote] = useState("");


  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
    };
    fetchQuote(); }, []);




  return (
    <>
      <h4 style={{fontFamily:"fantasy", color:"pink",
        textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>{quote}</h4>
    </>
  );
};


export default Quote;