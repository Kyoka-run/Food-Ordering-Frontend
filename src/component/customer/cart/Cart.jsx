import { 
  Button, 
  Card,
  Divider,
  Snackbar,
  Box,
  Modal,
  Grid,
  TextField,
  Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RemoveShoppingCart, AddLocationAlt } from "@mui/icons-material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../../../redux/actions/orderActions";
import { findCart } from "../../../redux/actions/cartActions";
import { isValid } from "../../../util/ValidToOrder";
import { cartTotal } from "../../../util/TotalPay";
import AddressCard from "../address/AddressCard";
import CartItemCard from "./CartItemCard";

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  city: Yup.string().required("City is required"),
});

const initialValues = {
  streetAddress: "",
  state: "",
  postalCode: "",
  city: "",
};

const Cart = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cart, auth } = useSelector((store) => store);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(findCart(jwt));
  }, [dispatch]);

  // Handle form submission for new address
  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt,
      order: {
        restaurantId: cart.cartItems[0]?.food?.restaurant.id,
        deliveryAddress: {
          username: auth.user?.username,
          ...values,
          country: "Ireland"
        },
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnackbar(true);
    }
  };

  // Handle order creation with selected address
  const createOrderUsingSelectedAddress = (deliveryAddress) => {
    const data = {
      token: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0]?.food?.restaurant.id,
        deliveryAddress
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnackbar(true);
    }
  };

  // Empty cart view
  if (cart.cartItems.length === 0) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <div className="text-center space-y-5">
          <RemoveShoppingCart className="w-40 h-40" />
          <p className="font-bold text-3xl">Your Cart Is Empty</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[40%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItemCard key={item.cartItemId} item={item} />
          ))}

          <Divider />
          
          {/* Bill Details */}
          <div className="px-10 text-sm">
            <p className="font-extralight py-3">Bill Details</p>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>€{cartTotal(cart.cartItems)}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>€2</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform Fee</p>
                <p>€1</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Restaurant Charges</p>
                <p>€2</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>€{cartTotal(cart.cartItems) + 5}</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Address Selection Section */}
        <section className="lg:w-[60%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {auth.user?.addresses.map((item) => (
                <AddressCard
                  key={item.addressId}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton
                />
              ))}

              {/* Add New Address Card */}
              <Card className="flex flex-col justify-center items-center p-5 w-64">
                <div className="flex space-x-5">
                  <AddLocationAlt />
                  <div className="space-y-5">
                    <p>Add New Address</p>
                    <Button
                      onClick={() => setOpenAddressModal(true)}
                      className="py-3"
                      fullWidth
                      variant="contained"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* New Address Modal */}
      <Modal 
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        className="flex items-center justify-center"
      >
        <Box className="bg-white p-8 rounded-lg w-96 max-w-[90vw]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("streetAddress")}
                    helperText={
                      <ErrorMessage name="streetAddress">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("state")}
                    helperText={
                      <ErrorMessage name="state">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="postal code"
                    as={TextField}
                    label="postal code"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("postal code")}
                    helperText={
                      <ErrorMessage name="postal code">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("city")}
                    helperText={
                      <ErrorMessage name="city">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full py-3"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          Please add items only from one restaurant at a time
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;