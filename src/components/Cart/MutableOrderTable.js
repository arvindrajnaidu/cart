import React, { useContext } from "react";
import _ from "underscore";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// import 'moment-timezone';
import { makeStyles } from "@material-ui/core/styles";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";

import { CartContext } from "./CartProvider";

const useStyles = makeStyles((theme) => ({
  longCell: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addRemoveButtons: {
    fontSize: theme.typography.pxToRem(20),
  },
}));

export const MutableOrderTable = ({ currency = "usd" }) => {
  const { order, dispatch } = useContext(CartContext);
  // const itemsTotal = order.subTotal;
  const classes = useStyles();

  function addQuantity(lineItem) {
    const { id, name, price, qty } = lineItem;
    dispatch({
      type: "update-lineitem",
      id,
      name,
      price,
      qty: qty + 1,
    });
  }

  function removeQuantity(lineItem) {
    const { id, name, price, qty } = lineItem;
    dispatch({
      type: "update-lineitem",
      id,
      name,
      price,
      qty: qty - 1,
    });
  }

  // let tipAmount;
  // if (typeof order.tipAmount === "undefined") {
  //   tipAmount = 0;
  // } else {
  //   tipAmount = order.tipAmount;
  // }

  // const [tipIndex, setTipIndex] = React.useState(() => {
  //   let tips = [0.0, 0.15, 0.17, 2.0];
  //   let ti = tips.findIndex((tip) => {
  //     let tempTip = Math.round(itemsTotal * tip * 100) / 100;
  //     return tempTip === tipAmount;
  //   });
  //   if (ti < 0) {
  //     return 0;
  //   }
  //   return ti;
  // });

  // const tipSet = (tipIndex, tipAmount) => {
  //   let roundedTipAmount = Math.round(tipAmount * 100) / 100;
  //   handleSetTip(roundedTipAmount);
  //   setTipIndex(tipIndex);
  // };

  const lineItemsArr = _.values(order.lineItems);

  console.log(lineItemsArr);

  // console.log(lineItemsArr)
  return (
    <TableContainer>
      <Table aria-label="order table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} align="left">
              Name
            </TableCell>
            {/* {order.status !== 'CONFIRMED' ? (
              <TableCell align="center">Actions</TableCell>
            ) : null} */}
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItemsArr.map((item) => {
            console.log(item, "<<<<");
            // We dont have the breakdown of the prices in the context
            // let variantsPrice;
            // let price;
            // if (item.variants) {
            //   variantsPrice = item.variants.reduce((total, i) => {
            //     return total + i.price;
            //   }, 0);
            // } else {
            //   variantsPrice = 0;
            // }

            // console.log(item.price, variantsPrice)
            // price = item.price + variantsPrice;
            return (
              <TableRow key={item.name}>
                <TableCell scope="row" colSpan={4}>
                  {item.name}
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      id="add-quantity-button"
                      className={classes.addRemoveButtons}
                      // disabled={order.key}
                      aria-label="delete"
                      size="small"
                      disableFocusRipple
                      disableRipple
                      onClick={() => {
                        removeQuantity(item);
                      }}
                    >
                      <RemoveCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                    {item.qty}
                    <IconButton
                      id="add-quantity-button"
                      className={classes.addRemoveButtons}
                      // disabled={order.key}
                      aria-label="delete"
                      size="small"
                      disableFocusRipple
                      disableRipple
                      onClick={() => {
                        addQuantity(item);
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            );
          })}

          {/* <TableRow key={"delivery"}>
            <TableCell colSpan={7} component="td" scope="row">
              <div className={classes.longCell}>
                <div>{"Delivery Fee"}</div>
                <div>{order.deliveryFee}</div>
              </div>
            </TableCell>
          </TableRow> */}
          {/* <TableRow key={"promotion"}>
            <TableCell colSpan={7} component="td" scope="row">
              <div className={classes.longCell}>
                <div>{"Promotion Code"}</div>
                <div>
                  <Input label="Enter Code" variant="outlined" style={{textAlign: 'right'}} />
                </div>
                <div>
                  {order.promoCode ? (
                    "FOODIE"
                  ) : (
                    <Button
                      onClick={() => {
                        dispatch({ type: "set_promo", promoCode: "FOODIE" });
                      }}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </TableCell>
          </TableRow> */}
          {/* <TableRow key={"taxes"}>
            <TableCell colSpan={7} component="td" scope="row">
              <div className={classes.longCell}>
                <div>{"Taxes"}</div>
                <div>{order.tax}</div>
              </div>
            </TableCell>
          </TableRow> */}

          {/* <TableRow key={'discount'}>
            <TableCell colSpan={7} component="td" scope="row">
              <div className={classes.longCell}>
                <div>{'New User Discount'}</div>
                <div>{order.discount, order}</div>
              </div>
            </TableCell>
          </TableRow> */}
          {/* <TableRow key={'tipAmount'}>
            <TableCell colSpan={7} scope="row">
              <div className={classes.longCell}>
                <div>{'Tip'}</div>
                <ButtonGroup
                  color="primary"
                  disabled={order.status === 'CONFIRMED'}
                  aria-label="outlined primary button group"
                >
                  <Button
                    variant={tipIndex === 0 ? 'contained' : ''}
                    disableFocusRipple
                    disableRipple
                    onClick={() => tipSet(0, 0)}
                  >
                    {'None'}
                  </Button>
                  <Button
                    variant={tipIndex === 1 ? 'contained' : ''}
                    disableFocusRipple
                    disableRipple
                    onClick={() => tipSet(1, itemsTotal * 0.15)}
                  >
                    {'15%'}
                  </Button>
                  <Button
                    variant={tipIndex === 2 ? 'contained' : ''}
                    disableFocusRipple
                    disableRipple
                    onClick={() => tipSet(2, itemsTotal * 0.17)}
                  >
                    {'17%'}
                  </Button>
                  <Button
                    variant={tipIndex === 3 ? 'contained' : ''}
                    disableFocusRipple
                    disableRipple
                    onClick={() => tipSet(3, itemsTotal * 0.2)}
                  >
                    {'20%'}
                  </Button>
                </ButtonGroup>
              </div>
            </TableCell>
          </TableRow> */}
          <TableRow key={"totalAmount"}>
            <TableCell
              colSpan={7}
              component="td"
              scope="row"
              style={{ fontWeight: 500, fontSize: 18 }}
            >
              <div className={classes.longCell}>
                <div>{"Total"}</div>
                {order.total}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MutableOrderTable;
