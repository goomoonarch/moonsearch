/* eslint-disable react/prop-types */
import { useEffect } from "react";
//import { getERAseg } from "../utils/getERAseg";

export const ERAsegCard = ({ dataResponse }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const data = await getERAseg(dataResponse);
        //console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return <div>ERAsegCard</div>;
};
