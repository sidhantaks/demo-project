import React, { useEffect } from 'react'
import {crudApi, DOMAIN, PRODUCTS_ENDPOINT} from '../helpers/api';

function Products() {
    useEffect(() => {
       crudApi.get(DOMAIN, PRODUCTS_ENDPOINT)
        .then((res) => {
            console.log("Products:", res);
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
        }); 
    }, []);
  return (
    <div>
     Hello World!   
    </div>
  )
}

export default Products