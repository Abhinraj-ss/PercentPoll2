import React from "react";

const userContext = React.createContext({isLoggedIn:false,email:"",password:""})

export{userContext}