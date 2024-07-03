import { CommonActions,createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef()


export const goToTopNavigation = (routeName,params) => {
  console.log('params', params)
  if (navigationRef.isReady()) {
    const gotoLogin = CommonActions.reset({
      index: 0,
      routes: [
        { 
          name: routeName,
          params: params,
        },
        
      
      ],
     
    });
    navigationRef.dispatch(gotoLogin);
  }else{
    console.log("Navigation not ready")
  }
  
};
export const goToRoute = (routeName,params) => {
  if (navigationRef.isReady()) {
   
    navigationRef.navigate(routeName,params);
  }else{
    console.log("Navigation not ready")
  }
  
};