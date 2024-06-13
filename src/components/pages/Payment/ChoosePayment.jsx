import styles from "./ChoosePayment.module.css";
export default function ChoosePayment({ handleBookingSubmit }) {
  return (
    <div>
      <div className={styles.choosebox}>
        <h5>Choose Payment Options</h5>
        <div className={styles.options}>
          <div className={styles["khalti-btn"]}>
            <button onClick={handleBookingSubmit}>Pay with Khalti</button>
          </div>
          <div className={styles["stripe-btn"]}>
            <button>pay with Stripe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// // import React, { useState } from "react";
// import { Modal, Button, Form, Input, Select } from "antd";

// const ChoosePayment = ({ bookData, handleBookingSubmit }) => {
//   const [form] = Form.useForm();
//   const { Option } = Select;

//   return (
//     <div>
//       <h2>Choose Payment Method</h2>
//       <Form form={form} layout="vertical" onFinish={handleBookingSubmit}>
//         <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: "Please enter your card number" }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Expiry Date" name="expiryDate" rules={[{ required: true, message: "Please enter expiry date" }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: "Please enter CVV" }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Pay Now
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default ChoosePayment;
