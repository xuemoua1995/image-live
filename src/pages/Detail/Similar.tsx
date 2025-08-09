import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import {APIPOST } from "../../helper/api";
type SimilarProps = {
   keyToFind: string;
 }
 const Similar: React.FC<SimilarProps> = ({ keyToFind }) => {
   const [properties, setProperties] = useState<Properties[]>([]);
   const getProperty = useCallback(async () => {
      const res = await APIPOST(`/property/?limit=3`, {search: keyToFind}); // search by provice
      if (res.statusCode === 200) {
        setProperties(res.data.properties);
      } else {
        //toast.warn('Something went wrong!,');
      }
    }, []);
  // Auto call
    useEffect(() => {
      getProperty();
    }, [getProperty])
   return (
      <div className='property-similiar-items'>
            { properties.length > 0 ?  properties.map((item, i) => (
                <Card key={i} id={i} btn={false}  item={item} footer={false} />
            )) : <p>No similar</p>}
     </div>
     
   );
 };
 
 export default Similar;