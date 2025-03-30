import { useLocation } from "react-router-dom";
import { Product } from '../types/types';

const Product_details = () => {
    const location = useLocation();
    const product: Product = location.state?.product;
    console.log(product);

    // Calculate discounted price
    const discountedPrice = product ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : 0;

    // Format average rating
    const averageRating = product ? product.rating.toFixed(1) : 0;

    // Generate star rating display
    const renderRatingStars = (rating:number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="halfStarGradient">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="none" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#halfStarGradient)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            }
        }

        return stars;
    };

    if (!product) {
        return <div className="container mx-auto px-5 py-24">Product not found</div>;
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full">
                            {/* Main product image */}
                            <img alt={product.title} className="w-full object-cover object-center rounded mb-4" src={product.thumbnail} />

                            {/* Product image gallery */}
                            <div className="flex flex-wrap">
                                {product.images && product.images.map((img, index) => (
                                    <div key={index} className="w-1/3 p-1">
                                        <img alt={`${product.title} - view ${index + 1}`} className="w-full h-32 object-cover object-center rounded cursor-pointer" src={img} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            {/* Product basic info */}
                            <div className="flex items-center">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                    {product.availabilityStatus}
                                </span>
                            </div>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>

                            {/* Product rating */}
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    {renderRatingStars(product.rating)}
                                    <span className="text-gray-600 ml-3">{averageRating} ({product.reviews ? product.reviews.length : 0} Reviews)</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500 ml-2">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500 ml-2">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>

                            {/* Product description */}
                            <p className="leading-relaxed mb-5">{product.description}</p>

                            {/* Product details */}
                            <div className="border-t border-b py-4 mb-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-500 text-sm">SKU</p>
                                        <p className="font-medium">{product.sku}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Category</p>
                                        <p className="font-medium capitalize">{product.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Weight</p>
                                        <p className="font-medium">{product.weight} g</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Stock</p>
                                        <p className="font-medium">{product.stock} units</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Dimensions</p>
                                        <p className="font-medium">
                                            {product.dimensions ?
                                                `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` :
                                                'Not specified'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Min. Order</p>
                                        <p className="font-medium">{product.minimumOrderQuantity} units</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional info */}
                            <div className="flex flex-col space-y-2 mb-5">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{product.shippingInformation}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                    <span>{product.warrantyInformation}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                    <span>{product.returnPolicy}</span>
                                </div>
                            </div>

                            {/* Product tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-5">
                                    <p className="text-gray-500 text-sm mb-2">Tags</p>
                                    <div className="flex flex-wrap">
                                        {product.tags.map((tag, index) => (
                                            <span key={index} className="mr-2 mb-2 px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color options */}
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing and action buttons */}
                            <div className="flex items-center">
                                <div className="flex flex-col mr-auto">
                                    {product.discountPercentage > 0 ? (
                                        <>
                                            <div className="flex items-center">
                                                <span className="title-font font-medium text-2xl text-gray-900">${discountedPrice}</span>
                                                <span className="title-font font-medium text-lg text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                                                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                    {product.discountPercentage}% OFF
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="title-font font-medium text-2xl text-gray-900">${product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Reviews section */}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                                    <div className="space-y-4">
                                        {product.reviews.map((review, index) => (
                                            <div key={index} className="border-b pb-4">
                                                <div className="flex items-center mb-2">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <svg
                                                                key={star}
                                                                fill={star <= review.rating ? "currentColor" : "none"}
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                className="w-4 h-4 text-indigo-500"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-600 ml-3">{review.reviewerName}</span>
                                                    <span className="text-gray-400 ml-3 text-sm">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product_details;