
const RestaurantDetails = ({ data }) => {
  const {
    name,
    address,
    latitude,
    longitude,
    bookingFeePerGuest,
    cancellationCharge,
    keywords,
    features,
    discount,
    image,
    paymentRequired,
  } = data;

  const renderCommaSeparated = (value) =>
    value?.map((item, idx) => (
      <span key={idx} className="bg-gray-100 text-sm px-2 py-1 rounded mr-1">
        {item.trim()}
      </span>
    ));

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Restaurant Details</h2>

        {/* Image */}
        {image && (
          <div className="w-full flex justify-center">
            <img
              src={image}
              alt="Restaurant"
              className="rounded-xl max-h-60 object-cover"
            />
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Name</h4>
            <p>{name || "-"}</p>
          </div>

          <div>
            <h4 className="font-semibold">Address</h4>
            <p>{address || "-"}</p>
          </div>

          {/* <div>
            <h4 className="font-semibold">Latitude</h4>
            <p>{latitude || "-"}</p>
          </div>

          <div>
            <h4 className="font-semibold">Longitude</h4>
            <p>{longitude || "-"}</p>
          </div> */}

          <div>
            <h4 className="font-semibold">Payment Required</h4>
            <p>{paymentRequired ? "Yes" : "No"}</p>
          </div>

          <div>
            <h4 className="font-semibold">Booking Fee Per Guest</h4>
            <p>
              {paymentRequired && bookingFeePerGuest
                ? `$${bookingFeePerGuest}`
                : "-"}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Cancellation Charge (%)</h4>
            <p>
              {paymentRequired && cancellationCharge
                ? `${cancellationCharge}%`
                : "-"}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Discount</h4>
            <p>{discount || "-"}</p>
          </div>
        </div>

        {/* Keywords & Features */}
        <div>
          <h4 className="font-semibold mb-1">Keywords</h4>
          <div className="flex flex-wrap">{renderCommaSeparated(keywords)}</div>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Features</h4>
          <div className="flex flex-wrap">{renderCommaSeparated(features)}</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
