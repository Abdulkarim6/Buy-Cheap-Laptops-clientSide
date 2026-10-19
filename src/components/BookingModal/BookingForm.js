import React from 'react';

const BookingForm = ({handleBooking, user, date, bookingProduct}) => {
    const { title, recelPrice } = bookingProduct;

    return (
      <form onSubmit={handleBooking} className="grid grid-cols-1 gap-1">
        {/* Active Inputs */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Your Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm"
            required
          />
        </div>

        {/* readOnly Inputs */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Email Address
          </label>
          <input
            name="email"
            type="text"
            defaultValue={user?.email}
            className="input w-full bg-slate-900/60 border border-slate-800 text-slate-400 cursor-not-allowed rounded-lg text-sm"
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">
              Booking Date
            </label>
            <input
              name="date"
              type="text"
              value={date}
              className="input w-full bg-slate-900/60 border border-slate-800 text-slate-400 cursor-not-allowed rounded-lg text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Price</label>
            <input
              name="sellPrice"
              type="text"
              value={`৳ ${recelPrice}`}
              className="input w-full bg-slate-900/60 border border-slate-800 text-cyan-400 font-bold cursor-not-allowed rounded-lg text-sm"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Product Name
          </label>
          <input
            name="productName"
            type="text"
            value={title}
            className="input w-full bg-slate-900/60 border border-slate-800 text-slate-400 cursor-not-allowed rounded-lg text-sm"
            readOnly
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            placeholder="Enter phone number"
            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm"
            required
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Meeting Location
          </label>
          <input
            name="location"
            type="text"
            placeholder="Enter location"
            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value="Submit Booking"
          className="btn bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-none rounded-lg mt-2 w-full transition-all duration-200"
        />
      </form>
    );
};

export default BookingForm;