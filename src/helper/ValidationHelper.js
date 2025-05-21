import toast from "react-hot-toast";

class ValidationHelper { 
    SuccessToast(msg){
        toast.success(msg);
    }

    ErrorToast(msg){
        toast.error(msg);
    }
}

export const { SuccessToast, ErrorToast } = new ValidationHelper();