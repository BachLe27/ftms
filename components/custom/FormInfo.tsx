import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormInfo = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-yellow-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-yellow-600 w-7/12 mt-3">
      <InfoCircledIcon className="h-4 w-4" />
      <p>
        {message}
      </p>

    </div>
  )
}


