import React,{useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import QueryBuilderRoundedIcon from "@material-ui/icons/QueryBuilderRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import TimePicker from "../BasicTimePicker";
import Grid from "@material-ui/core/Grid";
// import moment from 'moment' 
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {

  const [newFromTime, setNewFromTime] = useState(new Date());
  const [newToTime, setNewToTime] = useState(new Date());
  const [selectedFromTime, setSelectedNewFromTime] = useState(new Date());
  const [selectedToTime, setSelectedNewToTime] = useState(new Date());
  const [newTime, setNewTime] = useState([])
  const [id,setId]=useState("")

  const handleTimeChange = (name, value) => {
    if (name === "fromTime")setNewFromTime(value)
    if(name==="toTime")setNewToTime(value)
  }

  const handleAddButton = () => {
    const addedTime = {
      // fromTime: moment(newFromTime).format("HH:mm"),
      // toTime: moment(newToTime).format("HH:mm"),
      fromTime:newFromTime,
      toTime: newToTime,
    };
    setNewTime([...newTime, addedTime]);
  };

    const handleSelectedTimeChange = (name, value) => {
      if (name === "fromTime") setSelectedNewFromTime(value);
      if (name === "toTime") setSelectedNewToTime(value);
    };
  
  const handleEditClick = (id) => {
    console.log({ id })
    setId(id)
  }
  const handleSaveClick = (id) => {
    setId("");
  };

console.log({ newTime });
  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        maxWidth={false}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title">
          Hours For {props.calendarInfo}
        </DialogTitle>
        <DialogContent dividers>
          <>
            <FormLabel>Selected Hours</FormLabel>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {newTime.length > 0 ? (
                  newTime.map((item, index) => {
                    return (
                      <Grid
                        key={index}
                        container
                        justify="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Icon>
                            <QueryBuilderRoundedIcon fontSize="small" />
                          </Icon>
                        </Grid>
                        <Grid item>From Time :</Grid>
                        <Grid item>
                          <TimePicker
                            name="start Date"
                            format="MM/dd/yyyy"
                            value={item.fromTime}
                            disabled={id !== index ? true : false}
                            onChange={handleSelectedTimeChange}
                          />
                        </Grid>
                        <Grid item>
                          <Icon>
                            <QueryBuilderRoundedIcon fontSize="small" />
                          </Icon>
                        </Grid>
                        <Grid item>To Time :</Grid>
                        <Grid item>
                          <TimePicker
                            name="start Date"
                            format="MM/dd/yyyy"
                            value={item.toTime}
                            disabled={id !== index ? true : false}
                            onHandleDateChange={handleSelectedTimeChange}
                          />
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                            spacing={0}
                          >
                            <Grid item>
                              {id !== index ? (
                                <div>
                                  <IconButton
                                    onClick={() => handleEditClick(index)}
                                  >
                                    <EditOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  Edit{" "}
                                </div>
                              ) : (
                                <div>
                                  <IconButton
                                    onClick={() => handleSaveClick(index)}
                                  >
                                    <SaveOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  Save
                                </div>
                              )}
                            </Grid>
                            <Grid item>
                              <IconButton>
                                <DeleteOutlineRoundedIcon fontSize="small" />
                              </IconButton>
                              Delete
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                ) : (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                      >
                        No Availibility Hours,yet.
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        gutterBottom
                      >
                        Add some availibility hours and it will show up here.
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* Add more hours */}
            <FormLabel>Add New Hours</FormLabel>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {[0].map((item, index) => {
                  return (
                    <Grid
                      key={item}
                      container
                      justify="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Icon>
                          <QueryBuilderRoundedIcon fontSize="small" />
                        </Icon>
                      </Grid>
                      <Grid item>From Time :</Grid>
                      <Grid item>
                        <TimePicker
                          //label="Start Date & Time*"
                          name="fromTime"
                          value={newFromTime}
                          onChange={handleTimeChange}
                        />
                      </Grid>
                      <Grid item>
                        <Icon>
                          <QueryBuilderRoundedIcon fontSize="small" />
                        </Icon>
                      </Grid>
                      <Grid item>To Time :</Grid>
                      <Grid item>
                        <TimePicker
                          //label="Start Date & Time*"
                          name="toTime"
                          value={newToTime}
                          onChange={handleTimeChange}
                        />
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          justify="flex-start"
                          alignItems="center"
                          spacing={0}
                        >
                          <Grid item>
                            <IconButton onClick={handleAddButton}>
                              <AddCircleOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                            Add More
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
