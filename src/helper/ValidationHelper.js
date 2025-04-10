import { toast } from "sonner";

class ValidationHelper {
    LoadingToast(msg){
        return toast.loading(msg);
    }
   
    //params[0] = msg params[2] = toastId
    SuccessToast(...params ){
        toast.success(params[0], { id:params[1], duration:2000 });
    }

    ErrorToast(...params){
        toast.error(params[0], { id:params[1], duration:2000 });
    }
}

export const {LoadingToast, SuccessToast, ErrorToast } = new ValidationHelper();