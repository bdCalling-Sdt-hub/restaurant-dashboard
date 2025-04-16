
const MenuLoading = () => {
  const loadingArray = [1, 2, 3, 4, 5, 6,7,8,9, 10];
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {loadingArray?.map((item, i) => (
          <>
            <div className="shadow-md w-[250px] animate-pulse bg-white rounded-md overflow-hidden">
              {/* Image Placeholder */}
              <div className="w-full h-[160px] bg-gray-200"></div>

              <div className="p-4 space-y-3">
                {/* Name and Price */}
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-14 bg-gray-200 rounded"></div>
                </div>

                {/* Description */}
                <div className="h-3 w-full bg-gray-200 rounded"></div>

                {/* Category */}
                <div className="flex items-center gap-x-3 mt-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>

                {/* Ratings */}
                <div className="flex gap-x-2 items-center">
                  <div className="flex gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 bg-gray-200 rounded-full"
                      ></div>
                    ))}
                  </div>
                  <div className="h-3 w-10 bg-gray-200 rounded"></div>
                </div>

                {/* Button */}
                {/* <div className="h-8 w-28 bg-gray-200 rounded mt-4"></div> */}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default MenuLoading;
