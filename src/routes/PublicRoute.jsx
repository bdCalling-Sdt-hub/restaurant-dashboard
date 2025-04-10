import {Navigate} from "react-router-dom";
import { getToken } from '../helper/SessionHelper';

const PublicRoute = ({children}) => {

    if(getToken() ){
        return (<Navigate to="/" />);
    }else{
        return children;
    }

};

export default PublicRoute;