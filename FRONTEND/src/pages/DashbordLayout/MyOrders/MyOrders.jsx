import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/AuthContext'
import axios from 'axios'

const MyOrders = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([])
  const [remain, setRemain] = useState([])
  const [a, setA] = useState('')
  const [carId, setCarId] = useState('')
  const {user} = useContext(UserContext)


  useEffect(() => {
    fetch(`https://next-car-md-farhadhossain.vercel.app/my-order?userEmail=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setOrderDetails(data)
    })
  
    
  }, [user?.email])



  useEffect(() => {
    fetch(`https://next-car-md-farhadhossain.vercel.app/payments`)
    .then(res => res.json())
    .then( data => {
      console.log(data)
      setRemain(data)
    })
   
  },[])

 
  console.log(carId)

  // console.log(orderDetails)
  // console.log(remain)

  // const remainingCar = orderDetails.filter(car => car._id ===  remain.carID)
  // console.log(remainingCar)

  // const handleSubmit = (id) => {
  //   console.log(id)
  //   fetch(`https://next-car-md-farhadhossain.vercel.app/payments?carID=${id}`)
  //   .then(res => res.json())
  //   .then( data => {
  //     console.log(data)
  //     setRemain(data)
  //   })
  // }

  const remainingCar = orderDetails.filter(order => order?._id === fetch(`https://next-car-md-farhadhossain.vercel.app/payments?carID=${order?._id}`).then(res => res.json()).then(data => {
    console.log(data)
    if(data[0].carID === order?._id ){
      console.log(true)
      setA(data[0].carID)
    }
  }))
  console.log(remainingCar)
  console.log(a)

  console.log(orderDetails)

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  async function checkoutHandler(total_amount) {
    console.log(total_amount);
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:5000/custom_pay",{
      amount: total_amount
    });

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_zpcvSUNJXUqrLv", // Enter the Key ID generated from the Dashboard
        currency: currency,
        name: "Test Corp.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
            navigate('/');
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  return (

    <div>
      
      <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th>
         NO.
        </th>
        <th>Car Name</th>
        <th>Your Email</th>
        <th>Pay Info</th>
      </tr>
    </thead>
    <tbody>
      {/* <!-- row 1 --> */}
      {
        orderDetails.map((order, i) => {
         
          return <tr>
          <th>
            {i + 1}
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={order.image} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{order.carName}</div>
                
              </div>
            </div>
          </td>
          <td>
            {order.userEmail}
            <br/>
           
          </td>
         
          <th>
            <button className="btn btn-xs btn-success" onClick={e => checkoutHandler(order.resalePrice)}>
              Pay now
            </button>
          </th>
        </tr>
        })
      }

    </tbody>

    
  </table>
</div>
    </div>
  )
}

export default MyOrders