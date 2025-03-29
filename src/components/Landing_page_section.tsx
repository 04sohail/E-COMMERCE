import { useEffect, useState } from 'react'
import { Product_services } from '../services/product_services'
import { Product, ProductResponse } from '../types/types'
import { useNavigate } from "react-router-dom";
const PRODUCT_SERVICES = new Product_services()


const Landing_page_section = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const getProducts = async () => {
        const products: ProductResponse = await PRODUCT_SERVICES.GetProducts()
        setProducts(products.products)
    }
    useEffect(() => {
        getProducts()
    }, [])
    const handleCart = (id: number) => {
        const selectedProduct = products.find((product) => product.id === id);
        if (selectedProduct) {
            console.log(selectedProduct);
            navigate("/landing_page/product_details", { state: { product: selectedProduct } });
        } else {
            console.error("Product not found");
        }
    }
    return (
        <>
            <section className="text-gray-600 body-font ml-20 cursor-pointer">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products.map((product: Product, index: number) => (
                            <div key={index} id={product.id.toString()} onClick={() => handleCart(product.id)} className="lg:w-1/4 md:w-1/2 p-4 w-full ">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt="ecommerce"
                                        className="object-cover object-center w-full h-full"
                                        style={{ objectFit: 'contain' }}
                                        src={product.thumbnail || 'https://dummyimage.com/420x260'}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                        {product.category || 'CATEGORY'}
                                    </h3>
                                    <p className="text-gray-900 title-font  font-medium">
                                        {product.title || 'Product Name'}
                                    </p>
                                    <p className="mt-1 text-2xl text-black">${product.price || '0.00'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing_page_section

