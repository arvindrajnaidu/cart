// import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import CommentIcon from "@material-ui/icons/Comment";
// import AddIcon from "@material-ui/icons/AddCircle";
// import RemoveIcon from "@material-ui/icons/RemoveCircle";
// import { AppContext } from './AppProvider';
// import { Tooltip } from "@material-ui/core";
// import currency from "currency.js";

import React, { useContext, } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
// import html2canvas from 'html2canvas';
import { CartContext } from "./CartProvider";
// import { AppContext } from "../AppProvider";
// import { AppContext } from '../providers/AppProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  accordionDetails: {
    padding: 0,
  },
  backdrop: {
    zIndex: 100000,
  },
}));

// const printOrder = async () => {
//   // const canvas = await html2canvas(document.querySelector('#orderlist'));
//   // return canvas.toDataURL('image/png');
// };

export default function CenteredGrid() {
  const classes = useStyles();
  const { menu, dispatch } = useContext(CartContext);

  // const [cursor, setCursor] = useState(menu);
  // const cursorStack = useRef([]);

  const theme = useTheme();

  // useEffect(() => {
  //   if (!menu) return;
  //   setCursor(menu);
  // }, [menu]);

  // console.log(menu, '<<< menu');
  if (!menu) {
    return null
  }

  return (
    <div className={classes.root}>
      {menu.categories.map((category) => {
        // const isInCat = !!category.items.find(
        //   (item) => order.lineItems[item.id]
        // );

        const catColor = theme.palette.primary.main;

        return (
          <Accordion key={category.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                <span style={{ color: catColor }}>{category.name}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <List style={{ width: "100%" }}>
                {category.items.map((item) => {
                  return (
                    <ListItem
                      button
                      key={item.id}
                      // disabled={!item.isAvailable}
                      onClick={() => {
                        dispatch({
                          type: 'set-selected-item',
                          item
                        })
                      }}
                    >
                      <ListItemText
                        primary={
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>{item.name}</span>
                          </div>
                        }
                        secondary={
                          <span>
                            {item.description}
                            <br />
                            <br />
                            {item.price}
                          </span>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
