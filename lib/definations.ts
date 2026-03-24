export interface User {
    id: string; // Will be created on the database
    name: string | null;
    email: string; // Stored in cents
    emailVerified: Date | null,
    password: string | null;
    image: string | null;
    role: string;
    addressId: number | null;
    createdAt: Date,
    updatedAt: Date,
  };

  export interface AuthenticatedUser {
    id: string;
    name: string;
    email: string;
    role: string;
};


export interface Address {
  id: number;
  userId: string | null;
  completeAddress: string;
  nearbyLandmark: string;
  phone: string;
  city: string;
  state: string;
  pinCode: string | null;
};

export interface CheckoutAddress {
  email: string;
  country: string;
  name: string,
  completeAddress: string,
  nearbyLandmark: string,
  city: string,
  state: string,
  pinCode: string,
  phone: string,
  saveAddress: boolean,
  paymentMethod: string,
};

export type UserProfile = {
  id: string; // Will be created on the database
  name: string | undefined;
  email: string; // Stored in cents
  emailVerified: Date | null,
  password: string | null;
  image: string | null;
  role: ["ADMIN" | "USER"];
  addressId: number | null;
  createdAt: Date,
  updatedAt: Date,
  address: {
    id: number;
    userId: string | null;
    completeAddress: string;
    nearbyLandmark: string;
    phone: string;
    city: string;
    state: string;
    pinCode: string;
  } | null
}

export interface SessionUser {
  name?: string | null;
  email: string;
  image?: string | null | undefined;
  id?: string | undefined;
  role: 'USER' | 'ADMIN'; 
}

export type UserReviews = {
  id: string; 
  name: string | null;
  email: string; 
  emailVerified: Date | null,
  password: string | null;
  image: string | null;
  role: string;
  addressId: number | null;
  createdAt: Date,
  updatedAt: Date,
  reviews: Array<{
    id: number;
    name: string;
    email: string;
    message: string;
    images: string[] | null;
    productId: number;
    rating: number;
    createdAt: Date;
  }>
}

export type CustomerWithOrderCount = {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
  addressId: number | null;
  _count: string[] | any; // Adding the order count
};


export interface InputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];  // Standard input types
  placeholder?: string; 
  name?: string;  
  id?: React.InputHTMLAttributes<HTMLInputElement>['id'];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export interface LabelProps {
  htmlFor?: React.LabelHTMLAttributes<HTMLLabelElement>['htmlFor'];  // Standard input types
  title?: string;  // Name attribute is optional
}

export interface FormData {
  title: string;
  description: string;
  modelNumber: string;
  stock: number;
  sku: string;
  originalPrice: number;
  sellingPrice: number;
  collection: string;
  color: string;
  feature: string[];
  images: File[]; 
  dimension: {
    width: number;
    height: number;
    depth: number;
  }
}

export interface Product {
  id: number;
  title: string;
  description: string;
  modelNumber: string;
  stock: number;
  sku: string;
  originalPrice: number;
  sellingPrice: number;
  collection: string;
  color: string;
  feature: string[];
  images: string[];
  createdAt: Date; // You might also use Date if you're handling date objects
  updatedAt: Date; // Same as above
  rating: number | null;
  review: Review[];
  dimension?: {
    width : number;
    height: number;
    dept: number;
  }
}

export interface Review {
  id: number;
  name: string;
  email: string;
  message: string;
  images: string[] | null;
  productId: number;
  rating: number;
  createdAt: Date; // You might also use Date here
}


export interface CustomFormData {
  title: string;
  description: string;
  modelNumber: string;
  stock: number;
  originalPrice: number;
  sellingPrice: number;
  collection: string;
  color: string;
  feature: string[];
  images: File[]; 
}

export interface AddFeaturelProps {
  formData: {
   feature: string[],
  };
}


export interface Collections {
  id: number,
  title: string,
  image: string
}


export interface CartItem {
  productId: number;
  title: string;
  price: number;
  stock: number;
  sku: string;
  modelNumber: string;
  image: string; 
  color: string;
  rating: number,
  quantity: number;
}


export interface Orders {
  id: number, 
  subTotal: number | null,
  shippingCharge: number | null,
  totalAmount: number,
  discountPrice: number | null,
  status: string, 
  paymentInfoId: number | null,
  userId: number,
  createdAt: Date,
  deliverAt: Date,
}


export interface StatusHistory {
  id: number;
  orderId: number;
  status: string;
  changedAt: Date;
}


export interface Items {
  id: number;
  orderId: number;
  productId: number;
  title: string;
  price: number;
  stock: number;
  modelNumber: string;
  image: string;
  rating: number;
  // color: string;
  quantity: number;
  
}



export interface UserOrders {
  id: number,
  subTotal: number | null,
  shippingCharge: number | null,
  totalAmount: number,
  discountPrice: number | null,
  status: string,
  paymentInfoId: number | null,
  userId: string | null,
  createdAt: Date,
  deliverAt: Date,
  statusHistory: Array<{
    id: number,
    orderId: number,
    status: string,
    changedAt: Date,
  }> | [],
  items: Array<{
      id: number,
      orderId: number,
      productId: number,
      title: string,
      price: number,
      stock: number,
      modelNumber: string,
      image: string,
      color: string,
      rating: number,
      quantity: number,
    }>,
  user: {
    id: string,
    name: string | null,
    email: string,
    password: string | null,
    image: string | null,
    role: string | null,
    createdAt: Date,
    addressId: number | null,
  } | null,
}

export type OrderSingleItem = {
  color: string,
  id: number,
  image: string,
  modelNumber: string,
  orderId: number,
  price: number,
  productId: number,
  quantity: number,
  rating: number,
  stock: number,
  title: string,
  }



export interface AdminOrders {
  id: number,
  subTotal: number | null,
  shippingCharge: number | null,
  totalAmount: number,
  discountPrice: number | null,
  status: string,
  paymentInfoId: number | null,
  userId: number,
  createdAt: Date,
  deliverAt: Date,
  user: {
    name: string,
  } | null,
}

export interface EventCreate {
  title: string,
  description: string,
  discount: number,
  endDate: Date,
}


export interface AllEventData {
  id: number,
  title: string,
  description: string,
  discount: number,
  endDate: Date,
  createdAt: Date,
  products: Array<{
    id: number,
    eventId: number,
    productId: number,
    Product: Array<{
      id: number;
      title: string;
      description: string;
      modelNumber: string;
      stock: number;
      originalPrice: number;
      sellingPrice: number;
      collection: string;
      color: string;
      feature: string[];
      images: string[];
      rating: number;
      reviewId: number | null;
      createdAt: string;
      updatedAt: string;
      review: Review[] | null;
    }>
  }>
}

export interface CouponCreate {
  code: string,
  discount: number,
  expirationDate: Date,
}
export interface AllCouponData {
  id: number,
  code: string,
  discount: number,
  isActive: boolean,
  expirationDate: Date,
  createdAt: Date,
  updatedAt: Date,
}

export interface BannerData {
  id: number,
  url: string,
  image: string,
}


export type ImageItem = {
  preview: string;
  url?: string;
  loading: boolean;
};