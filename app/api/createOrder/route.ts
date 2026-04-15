import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Define a type for the request body for better type safety
interface OrderRequestBody {
  items: any[]; // Replace 'any' with the specific type for your items
  subTotal: number;
  shippingCharge: number;
  totalAmount: number;
  discountPrice: number;
  address: {
    email: string;
    name: string;
    completeAddress: string;
    nearbyLandmark: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  userId?: string; 
  saveAddress?: boolean; 
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const body: OrderRequestBody = await request.json();
    const {
      items,
      subTotal,
      shippingCharge,
      totalAmount,
      discountPrice,
      address,
      userId,
      saveAddress, 
    } = body;
    
    let isId = userId && userId;
    
    if (saveAddress) {
      const user = await saveAddressForUser(address, userId);
        if(user){
            isId = user.id;            
        }
    }else{
      const existingUser = await db.user.findUnique({ where: { email: address.email } });
      

      if (!existingUser) {
       const user = await db.user.create({
          data: {
            name: address.name,
            email: address.email,
            address: {
              create: {
                completeAddress: address.completeAddress,
                nearbyLandmark: address.nearbyLandmark,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
                phone: address.phone,
              },
            },
          },
        });
        isId = user.id;
      }
    }
    
    const order = await db.order.create({
      data: {
        subTotal: Math.round(subTotal * 100) / 100,
        shippingCharge: Math.round(shippingCharge * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
        discountPrice: Math.round(discountPrice * 100) / 100,
        items: {
          create: items,
        },
        userId: isId ,
      },
    });

    await db.statusHistory.create({
      data: {
          orderId: Number(order.id),
          status: order.status,
          changedAt: new Date(), 
      },
    });
    
    return NextResponse.json({success: "Order Success ✅"}, { status: 201 }); 
  } catch (error) {
    return NextResponse.json({ message: 'Failed to placed order', error: error }, { status: 500 }); 
  }
}

// Function to save the address for a user
async function saveAddressForUser(address: {
  email: string;
  name: string;
  completeAddress: string;
  nearbyLandmark: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
}, userId?: string) {
  if (userId) {
    await db.user.update({
      where: { id: userId },
      data: {
        address: {
          upsert: { 
            create: {
              completeAddress: address.completeAddress,
              nearbyLandmark: address.nearbyLandmark,
              city: address.city,
              state: address.state,
              pinCode: address.pinCode,
              phone: address.phone,
            },
            update: {
              completeAddress: address.completeAddress,
              nearbyLandmark: address.nearbyLandmark,
              city: address.city,
              state: address.state,
              pinCode: address.pinCode,
              phone: address.phone,
            },
          },
        },
      },
    });
  } else {
    const existingUser = await db.user.findUnique({ where: { email: address.email } });

    if (!existingUser) {
     const user = await db.user.create({
        data: {
          name: address.name,
          email: address.email,
          address: {
            create: {
              completeAddress: address.completeAddress,
              nearbyLandmark: address.nearbyLandmark,
              city: address.city,
              state: address.state,
              pinCode: address.pinCode,
              phone: address.phone,
            },
          },
        },
      });
      return user;
    } else {
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          address: {
            upsert: {
              create: {
                completeAddress: address.completeAddress,
                nearbyLandmark: address.nearbyLandmark,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
                phone: address.phone,
              },
              update: {
                completeAddress: address.completeAddress,
                nearbyLandmark: address.nearbyLandmark,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
                phone: address.phone,
              },
            },
          },
        },
      });
    }
  }
}



export async function GET(request: Request) {
  try {
    const url = new URL(request.url); 
    const status = url.searchParams.get('status') || 'Order Confirmed';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '6');

    const where: any = {};

    if (status) {
      where.status = status; 
    }
 

    const [orders, totalOrders] = await db.$transaction([
      db.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: Object.keys(where).length ? where : undefined,
        include:{
          user: {
            select: {
              name: true,
            }
          },
          paymentInfo: true,
        },
        skip: (page - 1) * limit,
        take: limit, 
      }),
      
      db.order.count({where: {status: status}})
    ]);

    return NextResponse.json({ orders, totalOrders });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders'}, { status: 500 }); 
  }
}