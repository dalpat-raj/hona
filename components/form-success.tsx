import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
};

export const FormSuccess = ({message}: FormErrorProps) => {
    if(!message) return null;

    return (
        <div className="bg-green-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500 my-2">
            <CheckCircledIcon className="h-4 w-4"/>
            <p>{message}</p>            
        </div>
    )
}