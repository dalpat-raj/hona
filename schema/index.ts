import * as z from "zod";

export const LoginSchema = z.object({
    phone: z.string().email({
        message: "Phone is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimun 6 characters required"
    }),
    name: z.string().min(3,{
        message: "name is required"
    })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimun 6 characters required"
    }),
})

// client

export const UpdateAddressSchema = z.object({
    completeAddress: z.string()
        .min(1, { message: "Complete address is required" })
        .max(100, { message: "Complete address must be less than 100 characters" }),

    nearbyLandmark: z.string()
        .max(50, { message: "Nearby landmark must be less than 50 characters" })
        .optional(),

    phone: z.string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d+$/, "Phone number must be numeric"),
    
    city: z.string()
        .min(1, { message: "City is required" })
        .max(50, { message: "City must be less than 50 characters" }),

    state: z.string()
        .min(1, { message: "State is required" })
        .max(50, { message: "State must be less than 50 characters" }),

    pinCode: z.string()
        .length(6, { message: "Pin code must be exactly 6 digits" })
        .regex(/^\d{6}$/, { message: "Pin code must be a valid 6-digit number" }),
})


export const addressSchema = z.object({
    email: z.string().email("Invalid email format"),
    country: z.string().min(1, "Country/Region is required"),
    name: z.string().min(1, "Full Name is required"),
    completeAddress: z.string().min(1, "Complete Address is required"),
    nearbyLandmark: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string()
      .length(6, "PIN Code must be exactly 6 digits")
      .regex(/^\d+$/, "Pin code must be a valid 6-digit number"),
    phone: z.string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d+$/, "Phone number must be numeric"),
    saveAddress: z.boolean().optional(),
    paymentMethod: z.enum(["pay", "cash"], {
      errorMap: () => ({ message: "Payment method is required" }),
    }),
  });

  export const NameSchema = z.object({
    firstName: z.string().min(1, "first Name is required"),
    lastName: z.string().optional(),
  });
  
  export const EmailSchema = z.object({
    email: z.string().email("Invalid email format"),
  });

  export const PhoneSchema = z.object({
    phone: z.string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),
  });


export const reviewSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    message: z.string().min(10, { message: "Message is required" }),
  });


// dashboard
export const ProductSchema = z.object({
    title: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description is required"),
    modelNumber: z.string().min(1, "Model number is required"),
    sku: z.string().min(5, {message: "Stock keeping unit are required!"}),
    barcode: z.string().optional(),
    brand: z.string().min(5,{message: "minium 5 word"}).max(150),
    stock: z.number().int().nonnegative("Stock cannot be negative"),
    originalPrice: z.number().positive("Original price must be positive"),
    sellingPrice: z.number().positive("Selling price must be positive"),
    collection: z.string().min(1, "Collection is required"),
    // color: z.string().min(1, "Color is required"),
    model: z.array(z.string()).nonempty("Model cannot be empty"),
    feature: z.array(z.string()).nonempty("Feature array cannot be empty"),
    images: z.array(z.string()).nonempty("Images array cannot be empty"),
    dimension: z.object({
        width: z.coerce.number().min(0).max(9999).multipleOf(0.001).optional(),
        height: z.coerce.number().min(0).max(9999).multipleOf(0.001).optional(),
        depth: z.coerce.number().min(0).max(9999).multipleOf(0.001).optional(),
        dimensionUnit: z.enum(["cm"]).default("cm"),
        weightValue: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1" }).max(20).multipleOf(0.001),
    }).refine(data => data.weightValue > 0, {
        message: "Weight value must be positive",
        path: ["weightValue"]
    }),
  });


  export const CouponCreateSchema = z.object({
    code: z.string({required_error: "title is required"})
        .min(4,{message: "minimum 10 word"
    }),
    discount: z.string({ required_error: "Discount is required" })
        .refine(value => !isNaN(Number(value)) && Number(value) >= 20 && Number(value) <= 80, {
        message: "Discount must be a number between 20 and 80",
    }),
    expirationDate: z.string()
        .refine(dateString => {
            const date = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to the start of the day
            return date >= today;
        }, {
            message: "End date must be today or in the future.",
        })
        .refine(dateString => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }, {
            message: "Invalid date format. Please use YYYY-MM-DD.",
    }),
});


export const EventCreateSchema = z.object({
    title: z.string({required_error: "title is required"})
        .min(10,{message: "minimum 10 word"
    }),
    description: z.string(
        {required_error: "description is required"})
        .min(10, {message:"minimum 10 word"
    }),
    discount: z.string({ required_error: "Discount is required" })
        .refine(value => !isNaN(Number(value)) && Number(value) >= 20 && Number(value) <= 80, {
        message: "Discount must be a number between 20 and 80",
    }),
    endDate: z.string()
        .refine(dateString => {
            const date = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to the start of the day
            return date >= today;
        }, {
            message: "End date must be today or in the future.",
        })
        .refine(dateString => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }, {
            message: "Invalid date format. Please use YYYY-MM-DD.",
    }),
});
  