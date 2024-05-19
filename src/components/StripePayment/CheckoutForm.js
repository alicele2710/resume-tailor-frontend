import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


const CheckoutForm = () => {
  //get the payload
  const params = useParams();

  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get('amount');
//stripe configuration
const stripe = useStripe();
const elements = useElements();
const [errorMessage, setErrorMessage] = useState(null);
  console.log(amount);

  //handle submit
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(elements === null){
      return;
    }
    const {error: submitError} = await elements.submit();
    if(submitError){
      return
    }
   try {
     //prepare data for payment
     const data = {
      amount, plan
    }
    //make http request
    const {error} = await stripe.confirmPayment({
      elements, 
      clientSecret: 'pi_3PHQHU08SNxSuAUJ0BBvNuDv_secret_mFUJ6hVPsT4hwWI36OqKuBgts',
      confirmParams:{
        return_url: 'http://localhost:3000/success'
      }});
      if(error){
        setErrorMessage(error?.message)
      }
    
    
   } catch (error) {
    setErrorMessage(error?.message)
    
   }
    }
  
  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form onSubmit = {handleSubmit} className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <PaymentElement/>

        </div>
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay
        </button>
        {errorMessage && <div className="text-red-500 mt-4">
          {errorMessage}
          </div>}

      </form>
    </div>
  )
};

export default CheckoutForm;
