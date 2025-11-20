import React from 'react'
import Header from '../components/Header'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import Swal from 'sweetalert2'
import { addToCart } from '../redux/slices/cartSlice'

function Wishlist() {
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

  const handleCart = (product)=>{
      const existingProduct = userCart?.find(item=>item.id==product.id)
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      Swal.fire({
          title: 'Completed!',
          text: existingProduct?`Quantity of ${product.title}, is updated successfully`:'Product added to your cart...',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
  }

  return (
    <>
    <Header/>
    <div className='container py-5'>
      {/* wishlist with contnet */}
     {   
     userWishlist?.length>0 ?
      <div className="row my-5">
          {
            userWishlist?.map(product=>(
              <div className="col-md-3 mb-2">
              {/* card - react bootstrap */}
                  <Card >
                    <Card.Img height={'250px'} variant="top" src={product?.thumbnail} />
                    <Card.Body className='text-center'>
                      <Card.Title>{product?.title}</Card.Title>
                      <div className="d-flex justify-content-evenly my-1">
                        <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className="btn text-danger fs-4"> <FontAwesomeIcon icon={faHeartCircleXmark}/> </button>
                        <button onClick={()=>handleCart(product)} className="btn text-success fs-4"> <FontAwesomeIcon icon={faCartPlus}/> </button>
                      </div>
                    </Card.Body>
                  </Card>
              </div>
            ))
          }
      </div>
      :
      <div style={{height:'80vh'}} className='d-flex justify-content-center align-items-center flex-column'>
        <img className=' w-25' src="https://wrogn.com/cdn/shop/t/139/assets/empty-cart-animation.gif?v=151928765131702147801740727907" alt="empty cart" />
        <h3>Wishlist is Empty</h3>
        <Link to={'/'} className='btn btn-primary'>Add More</Link>
      </div>
    }
    </div>
    </>
  )
}

export default Wishlist