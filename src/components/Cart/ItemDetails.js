import React, { useState, useEffect, useContext } from "react";
// import numeral from "numeral";
// import _ from "underscore";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// import { displayAmount } from "./DisplayAmount";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { CartContext } from "./CartProvider";

import { makeStyles } from "@material-ui/core/styles";

import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  subHeading: {
    width: "100%",
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  label: {
    width: "100%",
  },
  addRemoveButtons: {
    fontSize: theme.typography.pxToRem(30),
  },
  instructions: {
    width: "100%",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    // margin: 10,
    // minWidth: 350,
    // maxWidth: 350,
  },
}));

const Variations = ({ variations, setVariation }) => {
  const classes = useStyles();
  const { selectedItem } = useContext(CartContext);

  const handleChange = (event) => {
    let selectedVariantId = event.target.value;
    setVariation(variations.find((v) => v.id === selectedVariantId));
  };

  function getPriceForVariation(variation) {
    if (variation.price > 0) {
      return variation.price;
    }
    return "$0.00";
  }

  useEffect(() => {
    const isSomethingSelected = selectedItem.variations.find(
      (variation) => variation.isSelected
    );
    if (isSomethingSelected) {
      return;
    }

    const defaultVariation = selectedItem.variations.find(
      (variation) => variation.default
    );
    if (defaultVariation) {
      //   setVariation(defaultVariation.id);
      // dispatch({ type: 'set_variant', variantGroupId: variantGroup.group_id, variantId: defaultVariation.id });
    }
  }, [selectedItem.variations]);

  // console.log('variantGroup?', variantGroup)
  // let currentModifier = modifierCategory.modifiers.find(modifer => chosenModifiers.includes(modifer.id))
  return (
    <FormControl
      style={{ marginTop: 10, width: "100%" }}
      key={selectedItem.id}
      component="fieldset"
    >
      <FormLabel
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        component="legend"
      >
        <div>
          <Typography className={classes.heading}>
            {selectedItem.name}
          </Typography>
        </div>
        {/* <div>
          <Typography className={classes.subHeading}>{'Required'}</Typography>
        </div> */}
      </FormLabel>
      <Divider style={{ marginTop: 5, marginBottom: 5 }} />
      <RadioGroup
        aria-label="variations"
        // name="gender1"
        // value={currentModifier}
        // row={false}
        onChange={handleChange}
      >
        {variations.map((variation) => {
          // console.log(variation)
          return (
            <FormControlLabel
              key={variation.id}
              value={variation.id}
              control={<Radio />}
              classes={{
                label: classes.label,
              }}
              checked={variation.isSelected}
              label={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{variation.name}</div>
                  <div>{getPriceForVariation(variation)}</div>
                </div>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default function ItemDetails({
  addQuantity,
  reduceQuantiy,
  setVariantSelected,
  saveItemToOrder,
  handleClose,
}) {
  const { dispatch, selectedItem } = useContext(CartContext);
  const [lineItem, setLineItem] = useState({ ...selectedItem });

  //   console.log(selectedItem, item, '<<<< Selected Item')

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleAddItem = () => {
    if (lineItem.variation) {
      setLineItem({ ...lineItem, qty: (lineItem.qty || 0) + 1 });
    }
  };

  const handleRemoveItem = () => {
    setLineItem({ ...lineItem, qty: (lineItem.qty || 0) - 1 });
  };

  const handleAddToOrder = () => {
    const { qty, name: itemName } = lineItem;
    const { id, name, price } = lineItem.variation;
    dispatch({
      type: "update-lineitem",
      id,
      price,
      qty,
      name: `${itemName} - ${name}`,
    });
  };

  const setVariation = (variation) => {
    setLineItem({ ...lineItem, variation });
    // setVariantSelected(variantGroupId, variantId);
    // dispatch({ type: 'set_variant', variantGroupId, variantId });
  };

  //   const handleInstructionsChanged = (event) => {
  //     let newVal = event.target.value;
  //     setInstructions(newVal);
  //   };

  const qty = lineItem && lineItem.qty ? lineItem.qty : 0;

  // console.log(item, 'Item in dets')
  // console.log(qty)
  return (
    <Dialog
      maxWidth="md"
      open={true}
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="item-dialog-title"
    >
      <DialogTitle id="item-dialog-title">{lineItem.name}</DialogTitle>

      <DialogContent
        style={{
          padding: theme.spacing(2),
          minWidth: !fullScreen ? 400 : 100,
          minHeight: !fullScreen ? 500 : 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContentText>{lineItem.description}</DialogContentText>

        <div style={{ flex: 5 }}>
          <Variations
            {...{
              variations: lineItem.variations,
              setVariation,
              key: lineItem.id,
            }}
          />
        </div>
        {/* <FormLabel component="legend" style={{ marginTop: 5, marginBottom: 5 }}>
          <Typography className={classes.heading}>
            {'Special Instructions'}
          </Typography>
        </FormLabel>
        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
        <TextField
          // id="filled-multiline-flexible"
          // label="Multiline"
          multiline
          rowsMax="6"
          rows="6"
          defaultValue={item && item.instructions}
          // value={values.multiline}
          onChange={handleInstructionsChanged}
          className={classes.instructions}
          margin="normal"
          // helperText="hello"
          variant="filled"
        />
        <Divider style={{ marginTop: 5, marginBottom: 5 }} /> */}

        <div
          style={{
            flex: 1,
            marginTop: theme.spacing(3),
            // backgroundColor: 'red'
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              id="remove-qty-button"
              className={classes.addRemoveButtons}
              disabled={!qty}
              aria-label="add"
              size="medium"
              disableFocusRipple
              disableRipple
              onClick={handleRemoveItem}
            >
              <RemoveCircleOutlineIcon fontSize="inherit" />
            </IconButton>
            <Typography
              variant="h4"
              style={{
                margin: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {lineItem.qty || 0}
            </Typography>
            <IconButton
              id="add-qty-button"
              className={classes.addRemoveButtons}
              // disabled={order.key}
              aria-label="delete"
              size="medium"
              disableFocusRipple
              disableRipple
              onClick={handleAddItem}
            >
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          style={{ marginBottom: 20 }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          id="update-item-button"
          fullWidth
          variant="contained"
          size="medium"
          style={{ marginBottom: 20 }}
          autoFocus
          disableFocusRipple
          disableRipple
          onClick={handleAddToOrder}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
