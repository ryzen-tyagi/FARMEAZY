import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import { useHistory, Link } from "react-router-dom"
const Cart = () => {
    const history=useHistory();

    let total = 0;
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);
    const products1= [{
        
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
    

    useEffect(() => {
    
       if (!cart.items) {
           return;
}

        const filteredProducts = products1.filter((product) => Object.keys(cart.items).includes(product._id));

  setProducts(filteredProducts);
       

  }, [cart]);

    const getQty = (productId) => {
        return cart.items[productId];
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = {...cart};
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId];
       if (existingQty === 1) {
            return;
       }
        const _cart = {...cart};
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }

    const getSum = (productId, price) => {
        const sum = price * getQty(productId);
        total += sum;
        
        
        return sum;
    }

    const handleDelete = (productId) => {
        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
        const updatedProductsList = products.filter((product) => product._id !== productId);
        setProducts(updatedProductsList);
    }

    function handleOrderNow() {
        window.alert('Order placed succesfully!');
        setProducts([]);
        //setCart({});
        cart.amount=total;
        history.push('/checkout');
    }

    return (
        !products.length
        ? <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="" />
        :
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
            <h1 className="my-12 font-bold">Cart items</h1>
            <ul>
                {
                    products.map(product => {
                        return (
                            <li className="mb-12" key={product._id}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img className="h-16" src={product.image} alt="" />
                                    <span className="font-bold ml-4 w-48">{ product.name }</span>
                                </div>
                                <div>
                                   <button onClick={() => { decrement(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                                   <b className="px-4">{ getQty(product._id) }</b>
                                   <button onClick={() => { increment(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                                </div>
                                <span>₹ { getSum(product._id, product.price) }</span>
                                <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
            <hr className="my-6"/>
            <div className="text-right">
                <b>Grand Total:</b> ₹ { total }
            </div>
            <div className="text-right mt-6">
                <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
            </div>
        </div>
    )
}

export default Cart;
