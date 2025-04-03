
const ProductDetailsSkeleton = (): JSX.Element => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {/* Product Images Section Skeleton */}
                    <div className="lg:w-2/5 w-full">
                        {/* Main product image skeleton */}
                        <div className="w-full lg:h-96 h-64 bg-gray-200 rounded border border-gray-200 mb-4 animate-pulse"></div>

                        {/* Product image gallery skeleton */}
                        <div className="flex flex-wrap">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="w-1/2 md:w-1/4 p-1">
                                    <div className="w-full h-20 bg-gray-200 rounded border border-gray-200 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section Skeleton */}
                    <div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {/* Category and Brand skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>

                        {/* Product Title skeleton */}
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>

                        {/* Product Rating skeleton */}
                        <div className="flex mb-4">
                            <div className="flex items-center">
                                <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="w-4 h-4 mr-1 bg-gray-200 rounded-full animate-pulse"></div>
                                    ))}
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-20 ml-3 animate-pulse"></div>
                            </div>
                            <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Product Description skeleton */}
                        <div className="space-y-2 mb-5">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        </div>

                        {/* Product Features/Details skeleton */}
                        <div className="border-t border-b py-4 mb-5">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index}>
                                        <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing skeleton */}
                        <div className="flex items-center mb-5">
                            <div className="flex flex-col mr-auto">
                                <div className="flex items-center">
                                    <div className="h-7 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20 ml-2 animate-pulse"></div>
                                    <div className="ml-2 px-2 py-1 bg-gray-200 rounded-full w-16 h-6 animate-pulse"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
                            </div>

                            {/* Button skeletons */}
                            <div className="h-10 bg-gray-200 rounded w-28 animate-pulse"></div>
                            <div className="rounded-full w-10 h-10 bg-gray-200 ml-4 animate-pulse"></div>
                        </div>

                        {/* Shipping & Return Info skeleton */}
                        <div className="flex flex-col space-y-2 mb-5">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-5 h-5 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        {/* Related Products skeleton */}
                        <div className="mt-8">
                            <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-56 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsSkeleton;