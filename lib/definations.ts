export interface User {
  id: string; // Will be created on the database
  name: string | null;
  email: string; // Stored in cents
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Address {
  id: string;
  userId: string | null;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
  addressType: string;
}

export interface CheckoutAddress {
  email: string;
  country: string;
  name: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  saveAddress: boolean;
  paymentMethod: string;
}

export type UserProfile = {
  id: string; // Will be created on the database
  name: string | undefined;
  email: string; // Stored in cents
  phone: string;
  image: string | null;
  role: ["ADMIN" | "USER"];
  addressId: number | null;
  createdAt: Date;
  updatedAt: Date;
  address: {
    id: number;
    userId: string | null;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pinCode: string;
  } | null;
};

export type UserReviews = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: string;
  addressId: number | null;
  createdAt: Date;
  updatedAt: Date;
  reviews: Array<{
    id: number;
    name: string;
    email: string;
    message: string;
    images: string[] | null;
    productId: number;
    rating: number;
    createdAt: Date;
  }>;
};

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
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]; // Standard input types
  placeholder?: string;
  name?: string;
  id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LabelProps {
  htmlFor?: React.LabelHTMLAttributes<HTMLLabelElement>["htmlFor"]; // Standard input types
  title?: string; // Name attribute is optional
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
  brand: string;
  feature: string[];
  images: File[];
  dimension: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  collection?: string;
  brand?: string;
  feature: string[];
  ratings?: number;
  variants: Variant[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Variant {
  id: string;
  sku: string;
  modelNumber?: string;
  capacity?: string;
  power?: string;
  color?: string;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  length?: number;
  breadth?: number;
  height?: number;
  weight?: number;
  images: VariantImage[];
  productId: string;
}

export interface VariantImage {
  id: string;
  url: string;
  variantId?: string;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  message: string;
  images?: ReviewImages[];
  productId: string;
  rating: number;
  createdAt: Date;
}

export interface ReviewImages {
  id: string;
  url: string;
  fileId: string;
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
    feature: string[];
  };
}

export interface Collections {
  id: number;
  title: string;
  image: string;
  fileId: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  stock: number;
  sku: string;
  modelNumber?: string;
  image: string;
  color?: string;
  brand?: string;
  quantity: number;
  power: string;
  capacity: string;
  weight: number;
  height: number;
  length: number;
  breadth: number;
}
export interface Orders {
  id: number;
  subTotal: number | null;
  shippingCharge: number | null;
  totalAmount: number;
  discountPrice: number | null;
  status: string;
  paymentInfoId: number | null;
  userId: number;
  createdAt: Date;
  deliverAt: Date;
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
  color: string;
  brand: string;
  quantity: number;
}

export interface UserOrders {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  razorpayOrderId: string;

  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  couponDiscount?: number;
  cancelReason?: string;
  cancelledAt?: Date;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "PACKED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  paymentMethod:
    | "RAZORPAY"
    | "PHONEPE"
    | "CASHFREE"
    | "COD";

  createdAt: string;
  updatedAt: string;

  statusHistory: {
    id: string;
    orderId: string;
    status: string;
    note: string | null;
    createdAt: string;
  }[];

  items: {
    id: string;
    orderId: string;
    productId: string;
    variantId: string;

    productName: string;
    productImage?: string | null;

    sku: string;
    price: number;
    quantity: number;

    length: number | null;
    breadth: number | null;
    height: number | null;
    weight: number | null;

    total: number;
    createdAt: string;

    variant: {
      id: string;
      sku: string;
      modelNumber: string | null;
      capacity: string | null;
      power: string | null;
      color: string | null;

      originalPrice: number;
      sellingPrice: number;
      stock: number;

      length: number | null;
      breadth: number | null;
      height: number | null;
      weight: number | null;

      productId: string;

      shiprocketProductId: string | null;
      shiprocketVariantId: string | null;

      createdAt: string;

      images: {
        id: string;
        url: string;
        fileId: string | null;
        variantId: string;
      }[];

      product: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        collection: string | null;
        brand: string | null;
        ratings: number;
        feature: string[];
        createdAt: string;
        updatedAt: string;
      };
    };
  }[];

  user: {
    id: string;
    phone: string;
    name: string | null;
    email: string | null;
    role: "ADMIN" | "USER";
    createdAt: string;
    updatedAt: string;
  } | null;

  address: {
    id: string;
    userId: string;
    addressType: string | null;
    pinCode: string;
    city: string;
    state: string;
    country: string;
    address: string;
    landmark: string | null;
    isDefault: boolean;
  };
}

export type OrderSingleItem = {
  color: string;
  id: number;
  image: string;
  modelNumber: string;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
  rating: number;
  stock: number;
  title: string;
};

export interface AdminOrders {
  id: number;
  subTotal: number | null;
  shippingCharge: number | null;
  totalAmount: number;
  discountPrice: number | null;
  status: string;
  paymentInfoId: number | null;
  userId: number;
  createdAt: Date;
  deliverAt: Date;
  user: {
    name: string;
  } | null;
}

export interface EventCreate {
  title: string;
  description: string;
  discount: number;
  endDate: Date;
}

export interface AllEventData {
  id: number;
  title: string;
  description: string;
  discount: number;
  endDate: Date;
  createdAt: Date;
  products: Array<{
    id: number;
    eventId: number;
    productId: number;
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
      brand: string;
      feature: string[];
      images: string[];
      rating: number;
      reviewId: number | null;
      createdAt: string;
      updatedAt: string;
      review: Review[] | null;
    }>;
  }>;
}

export interface CouponCreate {
  code: string;
  discount: number;
  expirationDate: Date;
}
export interface AllCouponData {
  id: number;
  code: string;
  discount: number;
  isActive: boolean;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BannerData {
  id: string;
  image: string;
  url: string;
  fileId: string;
}

export interface BlogsData {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  content: string;
  category: string;
  image: string;
  fileId: string;
  createdAt: Date;
}

type ImageItem = {
  preview: string;
  url: string;
  fileId: string;
  loading: boolean;
  error?: boolean;
};

type VariantType = {
  sku: string;
  modelNumber: string;
  capacity: string;
  power: string;
  color: string;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  images: ImageItem[]; // ✅ yaha use hua
  length: number;
  breadth: number;
  height: number;
  weight: number;
};

export type FormType = {
  title: string;
  description: string;
  collection: string;
  brand: string;
  feature: string[];
  variants: VariantType[];
};
