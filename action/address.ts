"use server";
import { db } from "@/lib/db";
import { Address } from "@/lib/definations";
import { UpdateAddressSchema } from "@/schema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function AddAddress(id: string, data: Address) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { address, landmark, city, state, pinCode, isDefault, addressType } =
    UpdateAddressSchema.parse(data);
  try {
    await db.user.update({
      where: { id: id },
      data: {
        address: {
          create: {
            address,
            landmark,
            city,
            state,
            pinCode,
            isDefault,
            addressType,
          },
        },
      },
    });

    revalidatePath("/profile/address");
    return { success: "Address Added ✅" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Validation Error" };
    }
    return { error: "Database Error Failed To Add Address ❌" };
  }
}

export async function updateAddress(id: string, data: Address) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const {  address, landmark, city, state, pinCode, isDefault, addressType } =
    UpdateAddressSchema.parse(data);

  try {
    await db.address.update({
      where: { id: id },
      data: {
        address,
        landmark,
        city,
        state,
        pinCode,
        isDefault,
        addressType,
      },
    });

    revalidatePath("/profile/address");
    return { success: "Address Updated ✅" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Validation Error" };
    }
    return { error: "Database Error Failed To Update Address ❌" };
  }
}




export async function deleteAddress(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await db.address.delete({
      where: { id: id },
    });

    revalidatePath("/profile/address");
    return { success: "Address Deleted ✅" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Validation Error" };
    }
    return { error: "Database Error Failed To Delete Address ❌" };
  }
}