import Image from "next/image";

interface ImgProps {
    productImage: string;
}

const ProdReviewImage = ({productImage}: ImgProps) => {  
    if(!productImage){
        return
    }  
    return (
        <div className="w-full relative flex flex-col">
            <div className="overflow-hidden ">
                <div >
                    <Image
                    src={productImage}
                    alt={productImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProdReviewImage;