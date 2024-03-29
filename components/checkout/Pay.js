import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App({ user, cart }) {
  console.log(user ? user : 'yes', cart);

  const config = {
    public_key: 'FLWPUBK-606c1643dba29efce95f0fcf4735e236-X',
    tx_ref: Date.now(),
    amount: cart ? cart.totalProductsPrice : '',
    currency: 'GHS',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user ? user.email : '',
      phonenumber: user ? user.number : '',
      name: user ? user.name : '',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo:
        'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        className="success"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Proceed To Payment
      </button>
    </div>
  );
}
