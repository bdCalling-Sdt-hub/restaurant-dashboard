
const EditProfileLoading = () => {
    return (
      <>
        <div className="p-3 bg-[#f6f6f6] rounded-lg text-center animate-pulse">
          <div className="max-w-[400px] mx-auto">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto" />
            <div className="h-5 w-32 bg-gray-300 rounded mt-4 mx-auto" />
            <div className="h-4 w-16 bg-gray-300 rounded mt-2 mx-auto" />
  
            <div className="text-left mx-auto mt-4 space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
              <div>
                <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
                <div className="h-4 w-44 bg-gray-200 rounded" />
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                <div className="h-4 w-52 bg-gray-200 rounded" />
              </div>
            </div>
  
            <div className="mt-6 w-32 h-10 bg-gray-300 rounded-lg mx-auto" />
          </div>
        </div>
      </>
    );
  };
  
  export default EditProfileLoading;
  