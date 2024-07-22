// @ts-nocheck
import { useLoaderData, useNavigate } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
// import Loader from "./Loader";

function Menu() {
  
  const menu = useLoaderData();
  console.log(menu)
  const navigate = useNavigate();
  // const navigate = useNavigation();
  // // console.log(navigate)
  // const isLoading = navigate.state === 'loading'
  


  return (
    <>
    {/* {isLoading && <Loader/>  } */}
    {/* <button onClick={()=>navigate('/')}>go back </button> */}
  <ul className="divide-y divide-stone-200 px-4 ">{ menu.map((pizza)=> <MenuItem pizza = {pizza}  key={pizza.id}/> )}</ul>
    </>
)
}

export async function Loader(){
 const menu = await getMenu();
 return menu;
}

export default Menu;
