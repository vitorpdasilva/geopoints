import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import Face from "@material-ui/icons/Face";
import Context from '../../context';
import format from 'date-fns/format';

const PinContent = ({ classes }) => {
  const { state } = useContext(Context);
  const { currentPin: { title, content, author, createdAt, comments } } = state;
  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom>
        { title }
      </Typography>
      <Typography className={classes.text} component="h3" variant="h5" color="inherit" gutterBottom >
        <Face className={classes.icon}  /> {author.name}
      </Typography>
      <Typography className={classes.text} component="h3" variant="subtitle2" gutterBottom color="inherit">
        <AccessTime className={classes.icon} />
        {format(Number(createdAt), "Do MMM, YYYY")}
      </Typography>
      <Typography className={classes.text} variant="subtitle1" gutterBottom color="inherit">
        {content}
      </Typography>
    </div>
  )

};

const styles = theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(styles)(PinContent);
