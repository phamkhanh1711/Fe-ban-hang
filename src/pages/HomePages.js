import React, { useContext } from "react";
import { UserContext } from "../UserContext";
function HomePages()
{
   const user = useContext(UserContext)
    console.log(user)
    return null;
}
export default HomePages;
