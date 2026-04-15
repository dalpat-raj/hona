import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { CiCalendar, CiImageOn } from "react-icons/ci";
import { RiCouponLine  } from "react-icons/ri";
import { IoIosStarHalf   } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoGift } from 'react-icons/go'
import { IoLocationOutline } from 'react-icons/io5'
import { FaRegStar } from "react-icons/fa";


export const userProfileOption = [
  {
    title: "Profile",
    icon: TbUsers,
    url: "/profile"
  },
  // {
  //     title: "My Orders",
  //     icon: GoGift,
  //     url: "/profile/orders"
  // },
  
  {
      title: "My Addresss",
      icon: IoLocationOutline,
      url: "/profile/address"
  },
  // {
  //     title: "My Rating & Review",
  //     icon: FaRegStar,
  //     url: "/profile/reviews"
  // },
  // {
  //     title: "My Coupon",
  //     icon: IoLocationOutline,
  //     url: "/profile/coupon"
  // },
]

export const sideNavData = [
    {
        title: "Dashboard",
        icon: IoHomeOutline,
        url: "/dashboard"
    },
    {
        title: "Products",
        icon: RxDashboard,
        url: "/dashboard/products"
    },
    // {
    //     title: "Orders",
    //     icon: MdOutlineShoppingCart,
    //     url: "/dashboard/orders"
    // },
    // {
    //     title: "Events",
    //     icon: CiCalendar,
    //     url: "/dashboard/events"
    // },
    // {
    //   title: "Coupon",
    //   icon: RiCouponLine,
    //   url: "/dashboard/coupon"
    // },
    {
      title: "Banner",
      icon: CiImageOn,
      url: "/dashboard/banner"
    },
    {
      title: "Collection",
      icon: HiOutlineDuplicate,
      url: "/dashboard/collection"
    },
    {
      title: "Brand",
      icon: HiOutlineDuplicate,
      url: "/dashboard/brand"
    },
    // {
    //   title: "Reviews",
    //   icon: IoIosStarHalf,
    //   url: "/dashboard/reviews"
    // },
    // {
    //   title: "Customers",
    //   icon: TbUsers,
    //   url: "/dashboard/customers"
    // },
    // {
    //   title: "Admin",
    //   icon: MdOutlineAdminPanelSettings,
    //   url: "/dashboard/admin"
    // },

]

export const productData = [
        {
            "title": "Lovely Flower",
            "description": "Urban Queen - 5 & 7 KGS",
            "brand": "Keo",
            "collection": "Refrigerator",
            "feature": ["digital design MDF GLOSSY DOOR", 
              "auto clean system", "child safety lock system", 
              "voltege and ampere", "door LED light", 
              "6 blade ms cutter", 
              "highest product warranty", 
              "also available in talky"
            ],
            "variants": [
              {
                "stock": 3,
                "modelNumber": "L-F-5KG",
                "sku": "L-F-5KG",
                "color": "black",
                "originalPrice": 19990,
                "sellingPrice": 17990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(2).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(5).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(6).jpg?updatedAt=1775893891590",
                ],
              },
            {
                "stock": 5,
                "modelNumber": "L-F-7KG",
                "sku": "L-F-7KG",
                "color": "black",
                "originalPrice": 21990,
                "sellingPrice": 19990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 56,
                "breadth": 12,
                "height": 45,
                "weight": 42,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(2).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(5).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/1%20(6).jpg?updatedAt=1775893891590",
                ],
              }],
          },
          {
            "title": "Golden Blue Leafs",
             "description": "Office Queen - 5 & 7 KGS",
            "collection": "Refrigerator",
            "brand": "2 Stone",
             "feature": ["digital design MDF GLOSSY DOOR", 
              "auto clean system", "child safety lock system", 
              "voltege and ampere", "door LED light", 
              "6 blade ms cutter", 
              "highest product warranty", 
              "also available in talky"
            ],
             "variants": [
              {
                "stock": 4,
                "sku": "G-B-L-5KG",
                "modelNumber": "G-B-L-5KG",
                "color": "Carbon Black",
                "originalPrice": 25990,
                "sellingPrice": 23990,
                "power": "1 HP",
                "capacity": "5 KGS",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(4).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(3).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2(2).jpg",
                ],
              },
              {
                "stock": 4,
                "sku": "G-B-L-7KG",
                "modelNumber": "G-B-L-7KG",
                "color": "Carbon Black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "power": "2 HP",
                "capacity": "7 KGS",
                "length": 56,
                "breadth": 25,
                "height": 53,
                "weight": 15,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(4).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2%20(3).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/2(2).jpg",
                ],
              }],
          },
          {
            "title": "gray marble lady",
            "description": "Simple queen - 5 kgs.",
            "collection": "Refrigerator",
            "brand": "Dich",
            "feature": ["Voltage Meter", "Auto clean system", "Door LED Light", "4 blade ms cutter", "child safety lock system", "highest product warrenty", "highest motor warranty on same category", ],
            "variants": [
              {
                "stock": 5,
                "sku": "G-M-L-5",
                "modelNumber": "G-M-L-5",
                "color": "black",
                "originalPrice": 17990,
                "sellingPrice": 15990,
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/3%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/3%20(2).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/3%20(6).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/3%20(5).jpg",
                ],
              }
            ],
           },
          {
            "title": "wooden Lady",
            "description": "Simple queen - 5 kgs.",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["Voltage Meter", "Auto clean system", "Door LED Light", "4 blade ms cutter", "child safety lock system", "highest product warrenty", "highest motor warranty on same category", ],
            "variants": [
              {
                "stock": 3,
                "sku": "G-M-L-5.",
                "modelNumber": "G-M-L-5",
                "color": "black",
                "originalPrice": 17990,
                "sellingPrice": 15990,
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/4%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/4%20(2).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/4%20(4).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/4%20(5).jpg", 
                ],
          }]
          },
          {
            "title": "4 color shadow",
            "description": "Urban queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["digital design MDF GLOSSY DOOR", 
              "auto clean system", "child safety lock system", 
              "voltege and ampere", "door LED light", 
              "6 blade ms cutter", 
              "highest product warranty", 
              "also available in talky"
            ],
            "variants": [
              {
                "stock": 3,
                "sku": "4-C-S-5",
                "modelNumber": "4-C-S-5",
                "color": "black",
                "originalPrice": 19990,
                "sellingPrice": 17990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(2).jpg?updatedAt=1775893890239",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(5).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(6).jpg?updatedAt=1775893889837"
                ]
              },
            {
                "stock": 5,
                "sku": "4-C-S-7",
                "modelNumber": "4-C-S-7",
                "color": "black",
                "originalPrice": 21990,
                "sellingPrice": 19990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 56,
                "breadth": 12,
                "height": 45,
                "weight": 42,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(1).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(2).jpg?updatedAt=1775893890239",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(5).jpg",
                  "https://ik.imagekit.io/lvq8nr9ey/products/5%20(6).jpg?updatedAt=1775893889837"
                ]
              }],
           },
          {
            "title": "Black Leaf",
            "description": "Smart Queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["Smart Connectivity", 
              "Hydraulic Top Door", 
              "Vacuum For Easy Cleaning", 
              "Talky", 
              "Stainless Steel Jali", 
              "Auto Lock Drum",
              "Acrylic Door Full MDF Body"
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "B-L-5",
                "modelNumber": "B-L-5",
                "color": "black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(1).jpg?updatedAt=1775893895975",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(2).jpg?updatedAt=1775893892341",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(5).jpg?updatedAt=1775893893582",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(6).jpg?updatedAt=1775893892505",
                ],
              },
            {
                "stock": 6,
                "sku": "B-L-7",
                "modelNumber": "B-L-7",
                "color": "black",
                "originalPrice": 29990,
                "sellingPrice": 27990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 56,
                "breadth": 12,
                "height": 45,
                "weight": 42,
                 "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(1).jpg?updatedAt=1775893895975",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(2).jpg?updatedAt=1775893892341",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(5).jpg?updatedAt=1775893893582",
                  "https://ik.imagekit.io/lvq8nr9ey/products/6%20(6).jpg?updatedAt=1775893892505",
                ],
              }],
          },
          {
            "title": "River's Stone",
            "description": "Smart Queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["Smart Connectivity", 
              "Hydraulic Top Door", 
              "Vacuum For Easy Cleaning", 
              "Talky", 
              "Stainless Steel Jali", 
              "Auto Lock Drum",
              "Acrylic Door Full MDF Body"
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "R-S-5",
                "modelNumber": "R-S-5",
                "color": "black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(1).jpg?updatedAt=1775893896856",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(2).jpg?updatedAt=1775893893025",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(5).jpg?updatedAt=1775893893519",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(6).jpg?updatedAt=1775893894100",
                ],
              },
            {
                "stock": 6,
                "sku": "R-S-7",
                "modelNumber": "R-S-7",
                "color": "black",
                "originalPrice": 29990,
                "sellingPrice": 27990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 56,
                "breadth": 12,
                "height": 45,
                "weight": 42,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(1).jpg?updatedAt=1775893896856",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(2).jpg?updatedAt=1775893893025",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(5).jpg?updatedAt=1775893893519",
                  "https://ik.imagekit.io/lvq8nr9ey/products/7%20(6).jpg?updatedAt=1775893894100",
                ],
              }],
          },
          {
            "title": "Flower's Pair",
            "description": "Smart Queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["Smart Connectivity", 
              "Hydraulic Top Door", 
              "Vacuum For Easy Cleaning", 
              "Talky", 
              "Stainless Steel Jali", 
              "Auto Lock Drum",
              "Acrylic Door Full MDF Body"
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "F-P-5",
                "modelNumber": "F-P-5",
                "color": "black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(1).jpg?updatedAt=1775893896460",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(2).jpg?updatedAt=1775893892615",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(5).jpg?updatedAt=1775907616675",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(6).jpg?updatedAt=1775893892977",
                ],
              },
            {
                "stock": 6,
                "sku": "F-P-7",
                "modelNumber": "F-P-7",
                "color": "black",
                "originalPrice": 2990,
                "sellingPrice": 27990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 49,
                "breadth": 12,
                "height": 42,
                "weight": 45,
                "images": [
                 "https://ik.imagekit.io/lvq8nr9ey/products/8%20(1).jpg?updatedAt=1775893896460",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(2).jpg?updatedAt=1775893892615",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(5).jpg?updatedAt=1775907616675",
                  "https://ik.imagekit.io/lvq8nr9ey/products/8%20(6).jpg?updatedAt=1775893892977",
                ],
              }],
          },
          {
            "title": "Moon Eclipes",
            "description": "Office Queen - 5 & 7 KGS",
            "collection": "Grinder",
            "brand": "2 Stone",
            "feature": [
              "Vaccume for easy cleaning",
              "MDF full body",
              "High glossy UV printer Door",
              "BLDC 100% Copper Motor",
              "Lifetime warranty",
              "stainless Steel jali",
              "Voltage And Ampere Meter",
              "Talky",
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "M-E-5KG",
                "modelNumber": "M-E-5KG",
                "color": "Carbon Black",
                "originalPrice": 25990,
                "sellingPrice": 23990,
                "power": "1 HP",
                "capacity": "5 KGS",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(1).jpg?updatedAt=1775893896947",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(2).jpg?updatedAt=1775893893852",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(5).jpg?updatedAt=1775893894126",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(6).jpg?updatedAt=1775893894840",
                ],
              },
              {
                "stock": 4,
                "sku": "M-E-7KG",
                "modelNumber": "W-F-7KG",
                "color": "Carbon Black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "power": "2 HP",
                "capacity": "7 KGS",
                "length": 56,
                "breadth": 25,
                "height": 53,
                "weight": 15,
                 "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(1).jpg?updatedAt=1775893896947",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(2).jpg?updatedAt=1775893893852",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(5).jpg?updatedAt=1775893894126",
                  "https://ik.imagekit.io/lvq8nr9ey/products/9%20(6).jpg?updatedAt=1775893894840",
                ],
              }],
           
           
            
          },
          {
            "title": "Colourful Leaf",
            "description": "Smart Queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "2 Stone",
            "feature": ["Smart Connectivity", 
              "Hydraulic Top Door", 
              "Vacuum For Easy Cleaning", 
              "Talky", 
              "Stainless Steel Jali", 
              "Auto Lock Drum",
              "Acrylic Door Full MDF Body"
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "B-L-5KG",
                "modelNumber": "B-L-5",
                "color": "black",
                "originalPrice": 27990,
                "sellingPrice": 25990,
                "capacity": "5 KGS",
                'power': "1 HP",
                "length": 52,
                "breadth": 15,
                "height": 48,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(1).jpg?updatedAt=1775893896968",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(2).jpg?updatedAt=1775893894621",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(5).jpg?updatedAt=1775893894147",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(6).jpg?updatedAt=1775893894938",
                ],
              },
            {
                "stock": 6,
                "sku": "B-L-7KG",
                "modelNumber": "B-L-7",
                "color": "black",
                "originalPrice": 29990,
                "sellingPrice": 27990,
                "capacity": "7 KGS",
                'power': "2 HP",
                "length": 56,
                "breadth": 12,
                "height": 45,
                "weight": 42,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(1).jpg?updatedAt=1775893896968",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(2).jpg?updatedAt=1775893894621",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(5).jpg?updatedAt=1775893894147",
                  "https://ik.imagekit.io/lvq8nr9ey/products/10%20(6).jpg?updatedAt=1775893894938",
                ],
              }],
          },
          {
            "title": "Golden Leaf",
            "description": "Urban queen - 5 & 7 kgs",
            "collection": "Refrigerator",
            "brand": "Ora",
            "feature": ["digital design MDF GLOSSY DOOR", 
              "auto clean system", "child safety lock system", 
              "voltege and ampere", "door LED light", 
              "6 blade ms cutter", 
              "highest product warranty", 
              "also available in talky"
            ],
            "variants": [
              {
                "stock": 4,
                "sku": "G-L-5KG",
                "modelNumber": "G-L-5KG",
                "color": "Carbon Black",
                "originalPrice": 17990,
                "sellingPrice": 15990,
                "power": "1 HP",
                "capacity": "5 KGS",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(1).jpg?updatedAt=1775893896894",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(2).jpg?updatedAt=1775893894756",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(5).jpg?updatedAt=1775893894086",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(6).jpg?updatedAt=1775893894727",
                ],
              },
              {
                "stock": 4,
                "sku": "G-L-7KG",
                "modelNumber": "G-L-5KG",
                "color": "Carbon Black",
                "originalPrice": 19990,
                "sellingPrice": 21990,
                "power": "2 HP",
                "capacity": "7 KGS",
                "length": 56,
                "breadth": 25,
                "height": 53,
                "weight": 15,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(1).jpg?updatedAt=1775893896894",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(2).jpg?updatedAt=1775893894756",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(5).jpg?updatedAt=1775893894086",
                  "https://ik.imagekit.io/lvq8nr9ey/products/11%20(6).jpg?updatedAt=1775893894727",
                ],
              }],
          },
          {
            "title": "White Flowers",
            "description": "Office Queen - 5 & 7 KGS",
            "collection": "Refrigerator",
            "brand": "Ora",
            "feature": ["digital design MDF GLOSSY DOOR", 
              "auto clean system", "child safety lock system", 
              "voltege and ampere", "door LED light", 
              "6 blade ms cutter", 
              "highest product warranty", 
              "also available in talky"
            ],
             "variants": [
              {
                "stock": 4,
                "sku": "W-F-5KG",
                "modelNumber": "W-F-5KG",
                "color": "Carbon Black",
                "originalPrice": 19990,
                "sellingPrice": 17990,
                "power": "1 HP",
                "capacity": "5 KGS",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 35,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(1).jpg?updatedAt=1775893896682",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(2).jpg?updatedAt=1775893894165",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(5).jpg?updatedAt=1775893893290",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(6).jpg?updatedAt=1775893894615",
                ],
              },
              {
                "stock": 4,
                "sku": "W-F-7KG",
                "modelNumber": "W-F-7KG",
                "color": "Carbon Black",
                "originalPrice": 21990,
                "sellingPrice": 19990,
                "power": "2 HP",
                "capacity": "7 KGS",
                "length": 56,
                "breadth": 25,
                "height": 53,
                "weight": 15,
                "images": [
                 "https://ik.imagekit.io/lvq8nr9ey/products/12%20(1).jpg?updatedAt=1775893896682",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(2).jpg?updatedAt=1775893894165",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(5).jpg?updatedAt=1775893893290",
                  "https://ik.imagekit.io/lvq8nr9ey/products/12%20(6).jpg?updatedAt=1775893894615",
                ],
              }],
          },
          {
             "title": "Warrior Queen",
            "description": "Warrior Queen - 2 HP & 3 HP",
            "collection": "Grinder",
            "brand": "2 Stone",
            "feature": [
              "Special Hopper for grind spices",
              "cloth beg in Ring Container",
              "100% copper motor",
              "2 year product warranty",
              "special heavy sieve",
              "heavy duty 304 steel body",
              "6 blade roller cutter in stainless steel",
            ],
             "variants": [
              {
                "stock": 4,
                "sku": "W-K-2HP",
                "modelNumber": "W-K-2HP",
                "color": "Carbon Black",
                "originalPrice": 30990,
                "sellingPrice": 27990,
                "power": "2 HP",
                "length": 56,
                "breadth": 15,
                "height": 50,
                "weight": 16,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(1).jpg?updatedAt=1775548420742",
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(3).jpg?updatedAt=1775548369671",
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(4).jpg?updatedAt=1775548377176",
                ],
              },
              {
                "stock": 4,
                "sku": "W-K-3HP",
                "modelNumber": "W-K-3HP",
                "color": "Carbon Black",
                "originalPrice": 33990,
                "sellingPrice": 30990,
                "power": "3 HP",
                "length": 56,
                "breadth": 25,
                "height": 53,
                "weight": 18,
                "images": [
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(1).jpg?updatedAt=1775548420742",
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(3).jpg?updatedAt=1775548369671",
                  "https://ik.imagekit.io/lvq8nr9ey/products/15%20(4).jpg?updatedAt=1775548377176",
                ],
              }],
            
          },     
]

export const OrderTopNavData = [
  {
      title: "Order Confirmed",
  },
  {
      title: "pickup",
  },
  {
      title: "shipped",
  },
  {
      title: "delivered",
  },
  {
      title: "cancled",
  },
  {
      title: "refunded",
  },
]