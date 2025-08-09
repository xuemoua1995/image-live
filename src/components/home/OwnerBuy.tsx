//import { useState } from 'react'
import Land from "../Card/Land";
//import { useTranslation } from 'react-i18next';
import { useQuery } from "@tanstack/react-query";
import { APIGET } from "../../helper/api";
// import emptyImage from "../../assest/empty.png";
import emptyImage from '../../assest/empty.png'
import { useMediaQuery, useTheme } from "@mui/material";

// import { useTranslation } from "react-i18next";
interface LandsComponentProps {
  type: number; // or whatever type you expect for 'type'
  title: string;
}

const Owner: React.FC<LandsComponentProps> = ({ title }) => {
  // const { t } = useTranslation();
  //const [properties, setProperties] = useState<Properties[] | null>(null);
  //const { t } = useTranslation();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, error, data } = useQuery<Properties[]>({
    queryKey: ["repoData"],
    queryFn: async () => {
      // const res = await APIGET('/property/?limit=7&type=4&type=5');

      const res = await APIGET(
        `/property/?limit=${isXs ? 4 : 3}&type=newTomarket`
      );

      const sortedData = [...res.data.properties.reverse()];

      //  console.log("owner buy:", sortedData)

      // const sortedData = [...res.data.properties.reverse()];

      if (res.statusCode === 200) {
       //  const sortedData = [...res.data.properties.reverse()].sort((a, b) => a.price - b.price );

         
        // const sortedProperties = res.data.properties.sort((a, b) => new Date(b.createDate) - new Date(a.updateDate));

        // console.log("Sorted properties:", sortedProperties);
        // setProperties(res.data.properties);
        return sortedData; // Return the fetched properties
      } else {
        throw new Error("Failed to fetch data"); // Throw an error for React Query to handle
      }
    },
  });

  if (isLoading) return <div style={{ margin: 0 }}>Loading...</div>;
  if (error)
    return (
      <div style={{ margin: 0, textAlign: "center" }}> {error.message}</div>
    );

  return (
    <section className="land-section section-padding" style={{display:'none'}}>
      <div className="container">
        <h1>{title}</h1>
        {data && data.length > 0 ? (
          <div className="land-container">
            {data.map((property, i) => (
              <Land key={i} imgUrl={property.images[0]} property={property} />
            ))}
            {/*<Land key={2} imgUrl={data[0].images[0]} property={data[0]} />
              <Land key={3} imgUrl={data[0].images[0]} property={data[0]} />
              <Land key={4} imgUrl={data[0].images[0]} property={data[0]} />*/}
          </div>
        ) : (
          <>
            <img
              className="img-empty"
              style={{ width: 200, marginLeft: 0, marginRight: 0 }}
              src={emptyImage}
              alt="Empty"
            />
            {/* Additional logic for empty data */}
          </>
        )}
       
      </div>
    </section>
  );
};

export default Owner;
