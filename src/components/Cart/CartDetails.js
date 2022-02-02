import React, { useEffect, useContext } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MutableOrderTable from "./MutableOrderTable";

import { CartContext } from "./CartProvider";
import { Typography } from "@material-ui/core";
import { AppContext } from "../AppProvider";

const BottomPanel = ({ isBusy, handleClose }) => {
  const {dispatch} = useContext(CartContext)
  return (
    <div style={{ display: "flex", marginTop: 15 }}>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        color="secondary"
        disabled={isBusy}
        style={{ marginRight: 5 }}
        onClick={() => {
          if (
            !window.confirm(
              "This will reset your order entirely. Are you sure?"
            )
          )
            return;
          dispatch({ type: "reset-cart" });
          handleClose();
        }}
      >
        Reset Cart
      </Button>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        disabled={isBusy}
        style={{ marginLeft: 5 }}
        onClick={() => handleClose()}
      >
        Back
      </Button>
    </div>
  );
};

const CheckoutPanel = ({ total, handleClose }) => {
  // const [isBusy, setIsBusy] = useState(false);
  const { settings } = useContext(AppContext);
  return (
    <div style={{ marginTop: 20, marginBottom: 10 }}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        href={encodeURI(`upi://pay?pa=${settings.upi}&pn=${settings.name}&cu=INR&amt=${total}`)}
      >
        {"Make UPI Payment"}
      </Button>
      <BottomPanel handleClose={handleClose} isBusy={false} />
    </div>
  );
};

export default function CartDetails({ handleClose }) {
  const { order } = useContext(CartContext);

  //   const { config } = useContext(AppContext);
  // const [isBusy, setIsBusy] = useState(false);
  //   const theme = useTheme();
  const fullScreen = true; // useMediaQuery(theme.breakpoints.down("sm"));

  //   const stripe = loadStripe(config.stripePublishableKey);
  //   const paypalClientId = config.paypalClientId;

  useEffect(() => {
    // logEvent("view_cart_details");
  }, []);

  // function handleSetTip(tipAmount) {
  //   dispatch({ type: "set_tip", tipAmount });
  // }

  // function handleSetDeliveryType(deliveryType) {
  //   dispatch({ type: "set_delivery_type", deliveryType });
  // }

  // function handleEditItem(itemId) {
  //   handleClose(itemId);
  // }

  if (Object.keys(order.lineItems).length < 1) {
    // No Line Items - Cart is empty
    return (
      <Dialog size={"md"} open={true} fullScreen={fullScreen}>
        <DialogTitle>{"Empty Cart!"}</DialogTitle>
        <DialogContent
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DialogContentText>
            {"Your cart is empty. Let us add some items!"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            onClick={() => handleClose()}
            disableFocusRipple
            disableRipple
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // const recipientName = "Guest";
  return (
    <Dialog maxWidth={"md"} open={true} fullScreen={fullScreen}>
      <Typography className="pageHeader" variant="h5" style={{ margin: 20 }}>
        {`Your Cart`}
      </Typography>
      <DialogContent style={{ padding: 10, minWidth: !fullScreen ? 400 : 100 }}>
        <MutableOrderTable currency={"usd"} />
      </DialogContent>
      <DialogActions>
        <div style={{ width: "100%" }}>
          <CheckoutPanel handleClose={handleClose} total={order.total} />
        </div>
      </DialogActions>
    </Dialog>
  );
}
