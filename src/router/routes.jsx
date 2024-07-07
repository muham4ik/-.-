import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BadgeIcon from '@mui/icons-material/Badge';

const routes = [
    { path: "/main", content: "CATEGORY", icon: <CategoryIcon/> },
    { path: "/main/products", content: "PRODUCTS",icon:<ShoppingCartIcon/> },
    { path: "/main/workers", content: "WORKERS",icon:<BadgeIcon/>},
  ];
  
  export default routes;