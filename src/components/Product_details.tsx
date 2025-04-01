import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductDetailsSkeleton from "../loaders/product_details_loader"; // Import the skeleton component
import { CartItem, LocationState, Product } from "../types/types";
import { addCart, removeCart } from "../redux/Slice"
import { useDispatch } from "react-redux";

const ProductDetails = (): React.ReactElement => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const { productId } = useParams<{ productId: string }>();

    // Type assertion for location state
    const locationState = location.state as LocationState;

    useEffect(() => {
        // Try to get product from location state first
        const productFromState = locationState?.product;

        if (productFromState) {
            setProduct(productFromState);
            setLoading(false);
        } else if (productId) {
            // Fetch product data if not available from state
            fetchProductData(productId);
        } else {
            setError("Product ID not found");
            setLoading(false);
        }
    }, [productId, locationState]);

    const fetchProductData = async (id: string): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }

            const data: Product = await response.json();
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
            setLoading(false);
        }
    };

    // Handle adding product to cart
    const handleAddToCart = (): void => {
        if (!product) return;

        // Get current cart from localStorage
        const cartJson = localStorage.getItem('cart') || '[]';
        const currentCart: CartItem[] = JSON.parse(cartJson);

        // Check if product is already in cart
        const existingProductIndex = currentCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Increase quantity if product is already in cart
            const updatedCart = [...currentCart];
            updatedCart[existingProductIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            // Add new product to cart with quantity 1
            const updatedCart = [...currentCart, { ...product, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            useDispatch(addCart(updatedCart))
        }
    };

    // Calculate discounted price
    const calculateDiscountedPrice = (price: number, discountPercentage: number): string => {
        return (price - (price * discountPercentage / 100)).toFixed(2);
    };

    // Generate star rating display
    const renderRatingStars = (rating: number): React.ReactElement[] => {
        const stars: React.ReactElement[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <defs>
                            <clipPath id="half-star-clip">
                                <rect x="0" y="0" width="12" height="24" />
                            </clipPath>
                        </defs>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        <path clipPath="url(#half-star-clip)" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            }
        }

        return stars;
    };

    // Show loading state with the new skeleton component
    if (loading) {
        return <ProductDetailsSkeleton />;
    }

    // Show error state
    if (error) {
        return (
            <div className="container mx-auto px-5 py-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-700">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Show not found state
    if (!product) {
        return (
            <div className="container mx-auto px-5 py-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const discountedPrice = product.discountPercentage > 0
        ? calculateDiscountedPrice(product.price, product.discountPercentage)
        : null;

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {/* Product Images Section */}
                    <div className="lg:w-2/5 w-full">
                        {/* Main product image */}
                        <img
                            alt={product.title}
                            className="w-full lg:h-96 h-64 object-cover object-center rounded border border-gray-200 mb-4"
                            src={product.thumbnail}
                        />

                        {/* Product image gallery */}
                        <div className="flex flex-wrap">
                            {product.images && product.images.slice(0, 4).map((img, index) => (
                                <div key={index} className="w-1/2 md:w-1/4 p-1">
                                    <img
                                        alt={`${product.title} - view ${index + 1}`}
                                        className="w-full h-20 object-cover object-center rounded cursor-pointer border hover:border-indigo-500"
                                        src={img}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {/* Category and Brand */}
                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                            {product.category} | {product.brand}
                        </h2>

                        {/* Product Title */}
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
                            {product.title}
                        </h1>

                        {/* Product Rating */}
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {renderRatingStars(product.rating)}
                                <span className="text-gray-600 ml-3">
                                    {product.rating.toFixed(1)} Rating
                                </span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <span className="text-gray-600">
                                    {product.stock} in stock
                                </span>
                            </span>
                        </div>

                        {/* Product Description */}
                        <p className="leading-relaxed mb-5">{product.description}</p>

                        {/* Product Features/Details */}
                        <div className="border-t border-b py-4 mb-5">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Brand</p>
                                    <p className="font-medium">{product.brand}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Category</p>
                                    <p className="font-medium capitalize">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Stock</p>
                                    <p className="font-medium">{product.stock} units</p>
                                </div>
                                {product.stock <= 10 && (
                                    <div>
                                        <p className="text-red-500 font-medium">
                                            Low stock! Order soon.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pricing and Action Buttons */}
                        <div className="flex items-center mb-5">
                            <div className="flex flex-col mr-auto">
                                {product.discountPercentage > 0 && discountedPrice ? (
                                    <>
                                        <div className="flex items-center">
                                            <span className="title-font font-medium text-2xl text-gray-900">
                                                ${discountedPrice}
                                            </span>
                                            <span className="title-font font-medium text-lg text-gray-500 line-through ml-2">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                {product.discountPercentage}% OFF
                                            </span>
                                        </div>
                                        <p className="text-green-600 text-sm mt-1">
                                            You save: ${(product.price - parseFloat(discountedPrice)).toFixed(2)}
                                        </p>
                                    </>
                                ) : (
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            {/* Wishlist Button */}
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Shipping & Return Info */}
                        <div className="flex flex-col space-y-2 mb-5">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                </svg>
                                <span>Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                                <span>30-day return policy</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                <span>1-year warranty</span>
                            </div>
                        </div>

                        {/* Related Products Suggestion */}
                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">You might also like</h3>
                            <p className="text-gray-600">Check out more products in {product.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;