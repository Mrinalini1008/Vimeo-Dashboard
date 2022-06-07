import React, {useEffect} from "react";
 
const Managevid = ({uri}) =>{
    useEffect(()=>{
        async function getdeets(){
          const url = "https://api.vimeo.com/teams/175479107/analytics";
          const Token = "dd837f43dd0c134c14bcc10aa4a49610";
          const response = await fetch(url,{
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          });
          const data = await response.json();
          console.log(data);
        }
       getdeets()
      }, [])

    return(
        <div>
            This is returned.
        </div>
    )
}
export default Managevid;;