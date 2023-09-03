
import Product from './Product';
//import { useState, useEffect } from 'react';

const Products = () => {

//const [products, setProducts] = useState([]);
//useEffect(() => {
//   fetch('/api/products')
  // .then(response => response.json())
   //.then(products => {
    const products= [{
        
          "_id": "608c27f3e165f6137f02b549"
        ,
        "name": "Avocado",
        "price": 205,
        "size": "Medium",
        "image": "/images/avocado.jpg"
        
      },{
        
          "_id": "608c280ce165f6137f02b54a"
        ,
        "name": "Tomato",
        "price": 80,
        "size": "Medium",
        "image": "/images/tomato.jpg"
      },{
        
          "_id": "608c2878e165f6137f02b54b"
        ,
        "name": "Potato",
        "price": 20,
        "size": "Medium",
        "image": "/images/potato.jpg"
      },{
        
          "_id": "608c288ae165f6137f02b54c"
        ,
        "name": "Cucumber",
        "price": 18,
        "size": "Medium",
        "image": "/images/cucumber.jpg"
      },{
        
          "_id": "608c2899e165f6137f02b54d",
          "name": "Ladyfinger",
          "price": 30,
          "size": "Medium",
          "image": "/images/ladyfinger.jpg"
      },{
        
          "_id": "608c28b3e165f6137f02b54e",
        
          "name": "Onion",
          "price":25 ,
          "size": "Medium",
          "image": "/images/onion.jpg"
      },{
        
          "_id": "608c28d0e165f6137f02b54f",
          "name": "Ginger",
          "price": 240,
          "size": "Medium",
          "image": "/images/ginger.jpg"
      },{
        
          "_id": "608c28e8e165f6137f02b550",
      
          "name": "Mango",
          "price": 60,
          "size": "Medium",
          "image": "/images/mango.jpg"
      },{
        
          "_id": "608c2904e165f6137f02b551",
        
          "name": "Cauliflower",
        "price": 30,
        "size": "Medium",
        "image": "/images/cauli.jpg"
      },{
          "_id": "608c2960e165f6137f02b552",
          "name": "Broccoli",
          "price": 200,
          "size": "Medium",
          "image": "/images/broc.jpg"
      }]
  //  setProducts(products);
  // });
//}, []);


    return (
        <div className="container mx-auto pb-24">
            <h1 className="text-lg font-bold my-8">Products</h1>
            <div className="grid grid-cols-5 my-8 gap-24">
                {
                   products.map(product => <Product key={product._id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default Products;
