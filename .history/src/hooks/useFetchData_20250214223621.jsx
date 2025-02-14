import { useState, useEffect } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10`);
      const result = await response.json();
      setData(result.results);
      setFilteredData(result.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, filteredData, setFilteredData };
};

export default useFetchData;
