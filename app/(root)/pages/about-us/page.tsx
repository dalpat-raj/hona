import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="privacy-policy w-full px-12 py-12 pr-0 max-md:px-4 max-sm:px-2">
      <h2 className="text-center text-[28px] text-blue font-bold">About Contrive</h2>
      <h3 className="text-[20px] font-semibold text-blue mt-6 mb-2">Welcome to Contrive.com</h3>
      <p>
        Hello! <strong>Contrive.com</strong> is a professional platform where we
        provide interesting and valuable content focused on{" "}
        <strong>Kitchen</strong>. We are committed to delivering high-quality,
        reliable, and insightful information. Our goal is to turn our passion
        for Kitchen into a thriving online resource.
      </p>

      <p>
        We will continue to post such valuable and knowledgeable information on
        our website for all of you. Your love and support mean a lot to us.
      </p>

      <p>
        We are dedicated to providing you with the very best insights and
        knowledge related to Kitchen.</p>

      <p>
        We hope you find all of the information on <strong>Contrive.com</strong>{" "}
        helpful, as we love sharing it with you.
      </p>

      <p className="mt-2">
        <strong >Visit us at:</strong>{" "}
        <Link href="https://thecontrive.com" target="_blank" className="text-sky-700">
          https://thecontrive.com
        </Link>
      </p>
      <p>
        <strong>
          For any inquiries or further information, please feel free to contact
          us via email at:
        </strong>{" "}
        <Link href="mailto:frndtechnologyenovationpvtltd@gmail.com">
          frndtechnologyenovationpvtltd@gmail.com
        </Link>
      </p>

      <p>
        <strong>Thank you for visiting Contrive.com!</strong>
      </p>
    </div>
  );
};

export default page;
