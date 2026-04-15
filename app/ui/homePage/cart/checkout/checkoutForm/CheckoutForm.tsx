import React from 'react';
import Link from 'next/link';
import { CheckoutAddress, UserProfile } from '@/lib/definations';
import { addressSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';

type Props = {
  orderHandler: (data: CheckoutAddress) => void,
  paymentInfoHandler: React.ChangeEventHandler<HTMLInputElement> | any,
  saveAddress: boolean,
  setSaveAddress: React.Dispatch<React.SetStateAction<boolean>>,
  paymentInfo: {
    type: string,
    status: string,
  },
  user: UserProfile,
  loading: boolean,
}

const CheckoutForm = ({orderHandler, paymentInfoHandler, saveAddress, setSaveAddress,paymentInfo, user, loading }: Props) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<CheckoutAddress>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      country: "India",
      completeAddress: user?.address?.completeAddress,
      nearbyLandmark: user?.address?.nearbyLandmark,
      city: user?.address?.city,
      state: user?.address?.state,
      pinCode: user?.address?.pinCode,
      phone: user?.address?.phone
    }
  });

  
  return (
    <div className="checkout-form-container mx-auto bg-white rounded-lg px-6 max-sm:px-0">
      <div className="flex justify-between items-center mb-2">
        <h2 className={`text-lg font-semibold mb-2`}>Contact</h2>
        <Link href="/auth/sign-in" className="text-gray-500 text-sm underline">Log in</Link>
      </div>
      <form onSubmit={handleSubmit(orderHandler)}>
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register("name")}
            type="text"
            id="first-name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className='text-red-500 text-[13px]'>{errors.name.message}</p>}
        </div>
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <p className='text-red-500 text-[13px]'>{errors.email.message}</p>}
        </div>

        {/* Delivery Section */}
        <h2 className="text-lg font-semibold mb-2">Delivery</h2>
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country/Region</label>
          <select
            {...register("country")}
            id="country"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="India">India</option>
            {/* Add other countries if needed */}
          </select>
          {errors.country && <p className='text-red-500 text-[13px]'>{errors.country.message}</p>}
        </div>

        {/* Address Section */}
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="completeAddress" className="block text-sm font-medium text-gray-700">Complete Address</label>
          <textarea
            {...register("completeAddress")}
            id="completeAddress"
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.completeAddress && <p className='text-red-500 text-[13px]'>{errors.completeAddress.message}</p>}
        </div>

        {/* Landmark Section */}
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="nearbyLandmark" className="block text-sm font-medium text-gray-700">Nearby Landmark ( Optional ? )</label>
          <input
            {...register("nearbyLandmark")}
            type="text"
            id="nearbyLandmark"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.nearbyLandmark && <p className='text-red-500 text-[13px]'>{errors.nearbyLandmark.message}</p>}
        </div>

        {/* City, State, PIN Code Section */}
        <div className="grid grid-cols-3 gap-4 mb-4 max-sm:mb-2">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city")}
              type="text"
              id="city"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.city && <p className='text-red-500 text-[13px]'>{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <select
              {...register("state")}
              id="state"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="rajasthan">Rajasthan</option>
              <option value="aagra">Aagra</option>
              {/* Add other states if needed */}
            </select>
            {errors.state && <p className='text-red-500 text-[13px]'>{errors.state.message}</p>}
          </div>
          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code</label>
            <input
              {...register("pinCode")}
              type="number"
              id="pinCode"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.pinCode && <p className='text-red-500 text-[13px]'>{errors.pinCode.message}</p>}
          </div>
        </div>

        {/* Phone Section */}
        <div className="mb-4 max-sm:mb-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            {...register("phone")}
            type="number"
            id="phone"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.phone && <p className='text-red-500 text-[13px]'>{errors.phone.message}</p>}
        </div>

        {/* Save Info Checkbox */}
        <div className="flex items-center mb-4 max-sm:mb-2">
          <input
            {...register("saveAddress")}
            type="checkbox"
            id="saveInfo"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-500">Save this information for next time</label>
        </div>

        {/* Payment Section */}
        <div>
          <h2 className="text-[18px] font-semibold mb-4">Payment</h2>
          <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
          <div className="mb-4">
            <div className={`flex items-center border border-gray-200 px-2 rounded-lg shadow-sm ${paymentInfo.type === "pay" ? 'bg-gray-100' : ''}`}>
              <input
                {...register("paymentMethod")}
                type="radio"
                id="razorpay"
                value="pay"
                checked={paymentInfo.type === "pay"}
                className="h-4 w-4 text-gray-500 border-gray-300 rounded"
                onChange={paymentInfoHandler}
              />
              <label htmlFor="razorpay" className="cursor-pointer w-full py-3 ml-2 block text-sm text-gray-900">
                Razorpay Secure (UPI, Cards, Wallets, NetBanking)
              </label>
              {errors.paymentMethod && <p className='text-red-500 text-[13px]'>{errors.paymentMethod.message}</p>}
            </div>
            <div className={`flex items-center border border-gray-200 px-2 rounded-lg shadow-sm ${paymentInfo.type === "cash" ? 'bg-gray-100' : ''}`}>
              <input
                {...register("paymentMethod")}
                type="radio"
                id="codPayment"
                value="cash"
                checked={paymentInfo.type === "cash"}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                onChange={paymentInfoHandler}
              />
              <label htmlFor="codPayment" className="cursor-pointer w-full py-3 ml-2 block text-sm text-gray-900">
                Cash on Delivery (COD)
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-10">
          <ButtonWithSpinner loading={loading}>
          Confirm Order
          </ButtonWithSpinner>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;