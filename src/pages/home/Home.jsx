import { Box } from "@mui/system";
import "./Home.css";
import React from "react";
import { Typography, IconButton, Stack, CircularProgress,   } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";



import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useGetproductsByNameQuery } from '../../Redux/productsApi';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../Redux/cartSlice";
import { Badge, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {

  },
}));

const Home = () => {

  const theme = useTheme();
  // data => All products
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { selectedProducts, selectedProductsID } = useSelector((state) => state.carttt);

  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
        return itemUser.id === itemAPI.id;
    }
    )
    return myProduct.quantity;
  }
  

  if(isLoading) {
    return(
      <Box sx={{ display: 'flex' }}>
         <CircularProgress />
      </Box>
    )
  }

  if(error) {
    return(
      <Box sx={{ display: 'flex' }}>
         <Typography variant="h1" color="error"> ERROR </Typography>
      </Box>
    )
  }
 
  if(data){

    return (
      <Stack direction={"row"} sx={{flexWrap: "wrap",justifyContent: "center"}}>
  
        {data.map((item, index) => {
          return(
                
  
            <Card className="card" key={item.id} sx={{ maxWidth: 277, mb: 6, mx: 2 }} >
            
            <CardMedia
              component="img"
              height="277"
              image={item.imageLink[0]}
              alt="Paella dish"
              onClick={() => {
                navigate(`product-details/${item.id}`)
              }
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>






              { selectedProductsID.includes(item.id) ? (
                <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                color="primary"
                sx={{ ml: "10px"}} 
                onClick={() => {
                   dispatch(increaseQuantity(item))
                }
                }>

                  
                  <Add fontSize="small" />
                  
                </IconButton>
                

                <StyledBadge badgeContent={productQuantity(item)} color="primary" />

                <IconButton
                color="primary"
                sx={{ mr: "10px"}} 
                onClick={() => {
                  dispatch(decreaseQuantity(item))
               }}
               >

                      
                  <Remove fontSize="small" /> 
                </IconButton>

            </div>
              ) : 
              
              (
                <Button sx={{textTransform: "capitalize", p: 1, lineHeight:1.1}} variant="contained" 
              color="primary"
              onClick={() => {
                dispatch(addToCart(item))
              }
              }
              >
                 <ShoppingCart sx={{ fontSize : "18px", mr: 1 }}/>  Add to cart
              </Button>
              ) 
            }
              



              






            
  
              <Typography mr={1} variant="body1" color={theme.palette.error.light}>${item.price}</Typography>
                
            </CardActions>
            
          </Card>
  
  
          )
        }
        )}
         
         
  
      </Stack>
    );

  }
};

export default Home;
