import { toast } from "react-toastify";

interface ToastMessages {
    pending: string;
    success: string;
    error: string;
}

interface UseActionProps {
    action: (data: any) => Promise<any>;
    data: any;
    callback: () => void | null;
    toastMessages: ToastMessages;
}

const useAction = async ({
    action,
    data,
    callback,
    toastMessages,
}: UseActionProps): Promise<void> => {
    const send = async () => {
        const result = await action(data);
        if (result && typeof result === 'object' && 'error' in result) {
            toast.warning(result.error);
            throw new Error(result.error);
        }
        if (callback) setTimeout(() => callback(), 500);
    };

    await toast.promise(send(), toastMessages);
};

export default useAction;
