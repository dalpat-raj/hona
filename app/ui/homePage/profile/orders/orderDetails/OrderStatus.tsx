import { formatDate } from "@/lib/helpers";

type StatusHistory = {
  id: number;
  orderId: number;
  status: string;
  changedAt: Date;
};

const OrderStatus: React.FC<StatusHistory[] | any> = ({statusHistory}) => {
  const steps = [
    { name: "Order Confirmed", date: "Thu, 18th Jul" },
    { name: "pickup", date: "Sun, 21st Jul" },
    { name: "shipped", date: "Fri, 19th Jul" },
    { name: "delivered", date: "Sun, 21st Jul" },
  ];

  const completedStatuses = statusHistory.map(history => history.status);

  return (
    <div className="flex justify-between items-center max-sm:flex-col">
      {steps.map((step, index) => {
        const isCompleted = completedStatuses.includes(step.name);
        const stepHistory = statusHistory.find(
          (history: any) => history.status === step.name
        );

        return (
         <>
          <div key={index} className="flex-1 max-sm:hidden">
            <p
              className={`text-sm text-center mb-1 ${
                isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              {step.name}
            </p>
            <div className="relative flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                } flex items-center justify-center z-10`}
              >
                {isCompleted && (
                  <span className="text-white text-xs">&#10003;</span> // checkmark
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`absolute left-[100%] top-3 w-full h-[2px] ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  } transform -translate-x-1/2`}
                ></div>
              )}
            </div>

            <div className="text-center mt-2">
              <div
                className={`text-xs ${
                  isCompleted ? "text-green-600" : "text-gray-400"
                }`}
              >
                {isCompleted && stepHistory
                  ? formatDate(stepHistory.changedAt) 
                  : (
                    <p className="invisible">0</p>
                  )}
              </div>
            </div>
          </div>
          
          <div className="items-start justify-center  mb-1 w-full hidden max-sm:flex">
          <div className="flex flex-col items-center w-1/4">
            <p
              className={`text-sm text-center mb-1 ${
                isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              {step.name}
            </p>
          </div>

          <div className="flex flex-col items-center w-1/4">
            <div
              className={`w-8 h-8 rounded-full ${
                isCompleted ? "bg-green-500" : "bg-gray-300"
              } flex items-center justify-center z-10`}
            >
              {isCompleted && (
                <span className="text-white text-xs">&#10003;</span> // checkmark
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`w-[2px] h-16 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>

          <div className="flex flex-col items-center w-1/4">
            <div
              className={`text-xs ${
                isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              {isCompleted && stepHistory
                ? formatDate(stepHistory.changedAt)
                : <span className="invisible">0</span>}
            </div>
          </div>
          </div>
         </>
        );
      })}
    </div>
  );
};

export default OrderStatus;

  
