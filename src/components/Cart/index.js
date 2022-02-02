import React, { useContext, useState } from "react";
import Menu from "./Menu";

// import InventoryProvider from "../Inventory/InventoryProvider";
import CartProvider, { CartContext } from "./CartProvider";
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  useTheme,
} from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import ItemDetails from "./ItemDetails";
import CartDetails from "./CartDetails";

const MiniCart = ({setIsViewingCart}) => {
  const { order } = useContext(CartContext);
  const theme = useTheme();
  const action = (
    <IconButton
      color="primary"
      aria-label="Close"
      style={{ color: "#FFF" }}
      component="span"
      onClick={() => {
        setIsViewingCart(true)
      }}
    >
      <ShoppingCartOutlined />
    </IconButton>
  );

  // console.log(order)
  let itemCount = Object.keys(order.lineItems).length;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={true}
      onClick={() => {
        setIsViewingCart(true);
      }}
    >
      <SnackbarContent
        style={{ backgroundColor: theme.palette.success.main }}
        message={
          itemCount === 1 ? `Cart has 1 item` : `Cart has ${itemCount} items`
        }
        action={action}
      />
    </Snackbar>
  );
};

const Cart = () => {
  const { dispatch, selectedItem } = useContext(CartContext);
  const [isViewingCart, setIsViewingCart] = useState(false)

  function handleClose() {
    dispatch({
      type: 'set-selected-item',
      item: null,
    })
  }

  function addQuantity() {
    // dispatch({
    //   type: 'set-selected-item',
    //   item: {
    //     ...selectedItem.item,
    //     quantity: (selectedItem.item.quantity || 0) + 1,
    //   },
    // })
  }

  function reduceQuantiy() {
    // dispatch({
    //   type: 'set-selected-item',
    //   item: {
    //     ...selectedItem.item,
    //     quantity: (selectedItem.item.quantity || 0) - 1,
    //   },
    // })
  }

  function setVariantSelected(variantGroupId, variantId) {
    // const newVariantGroups = selectedItem.item.variantGroups.map((vg) => {
    //   if (vg.group_id === variantGroupId) {
    //     let newVariations = vg.variations.map((v) => {
    //       if (v.id === variantId) {
    //         return {
    //           ...v,
    //           isSelected: true,
    //         };
    //       }
    //       return {
    //         ...v,
    //         isSelected: false,
    //       };
    //     });
    //     return {
    //       ...vg,
    //       variations: newVariations,
    //     };
    //   }
    //   return vg;
    // });

    // setSelectedItem({
    //   ...selectedItem,
    //   item: {
    //     ...selectedItem.item,
    //     variantGroups: newVariantGroups,
    //   },
    // });
  }

  function saveItemToOrder() {
    // const variants = selectedItem.item.variantGroups.reduce((acc, vg) => {
    //   vg.variations.forEach((v) => {
    //     if (v.isSelected) {
    //       acc.push({
    //         variation_id: v.id,
    //         group_id: vg.group_id,
    //         price: v.price,
    //         name: v.name,
    //       });
    //     }
    //   });
    //   return acc;
    // }, []);

    // const newItem = {
    //   addons: [],
    //   variants,
    //   menu_item_id: selectedItem.item.id,
    //   quantity: selectedItem.item.quantity,
    //   name: selectedItem.item.name,
    //   price: selectedItem.item.price,
    // };

    // dispatch({ type: "save_item", item: newItem });
    // setSelectedItem(null);
  }

  // function goBack() {
  //   router.back();
  // }

  // console.log(selectedItem, '<<<selectedItem')

  return (
    <div>
      <Menu />
      {selectedItem ? (
        <ItemDetails
          {...{
            item: selectedItem.item,
            handleClose,
            addQuantity,
            reduceQuantiy,
            saveItemToOrder,
            setVariantSelected,
          }}
        />
      ) : null}

      {!isViewingCart && !selectedItem ? (
        <MiniCart setIsViewingCart={setIsViewingCart} />
      ) : null}
      {isViewingCart ? (
        <CartDetails handleClose={() => {
          setIsViewingCart(false)
        }}/>
      ) : null}
      
    </div>
  );
};

export default function CartComponent() {
  return (
      <CartProvider>
        <Cart />
      </CartProvider>
  );
}
