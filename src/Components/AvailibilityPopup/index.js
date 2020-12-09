import React, { useEffect, useState } from "react";
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
import moment from 'moment'
import CircularProgress from "@material-ui/core/CircularProgress";
import { withNewTimeValidator } from "../../Utils";
import { withAvailableTimeValidator } from "../../Utils";

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
  const [id, setId] = useState("");
  const [availabilityHours, setAvailabilityHours] = useState([]);
  const [errorMessage,setErrorMessage]=useState(true)
  const [errorMessage_s, setErrorMessage_s] = useState(true);
  
  useEffect(() => {
    let newArr=[]
    let arr = props.availabilityHours && props.availabilityHours
    for (let i = 0; i < arr.length; i++){
      let data = {
        agent: arr[i].agent,
        availableFrom: arr[i].availableFrom.substring(0,19),
        availableTo: arr[i].availableTo.substring(0,19),
        disabled: arr[i].disabled,
        id: arr[i].id
      }
      newArr.push(data)
    }
    setAvailabilityHours(newArr)

  }, [props.availabilityHours]);

  const handleTimeChange = (name, value) => {
    if (name === "fromTime") setNewFromTime(value);
    if (name === "toTime") setNewToTime(value);
  };

  const handleAddButton = () => {
    const addedTime = {
      from: moment(newFromTime).format("HH:mm"),
      to: moment(newToTime).format("HH:mm"),
    };
    setErrorMessage(
      withAvailableTimeValidator(
        addedTime,
        availabilityHours,
        moment(props.calendarInfo).format("YYYY-MM-DD")
      ))
        
        setErrorMessage_s(
          withNewTimeValidator(
            addedTime,
            moment(props.calendarInfo).format("YYYY-MM-DD")
          )
        );
    props.handleAddButton(addedTime);
  };

  const handleDeleteButton = (id) => {
    props.handleDeleteButton(id);
  }

  const handleSelectedTimeChange = (index, item, name, value) => {
    item[name] = value;
    let arr = [...availabilityHours]
    arr[index]=item
    setAvailabilityHours(arr)
  };

  const handleEditClick = (id) => {
    setId(id);
  };
  const handleSaveClick = (id) => {
    setId("");
    let data=availabilityHours.find((item) => {
      return item.id===id
    })
    let updatedData = {
      date: moment(props.calendarInfo).format("YYYY-MM-DD"),
      availability_time: {
        from: moment(data.availableFrom).format("HH:mm"),
        to: moment(data.availableTo).format("HH:mm"),
      },
    };
    props.handleSaveClick(id,updatedData)
  };

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        maxWidth={false}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title">
          Hours For {moment(props.calendarInfo).format("LL")}
        </DialogTitle>
        <DialogContent dividers>
          <>
            <FormLabel>Selected Hours</FormLabel>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {props.isLoading ?
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  ><CircularProgress />
                  </Grid> : availabilityHours.length > 0 ? (
                  availabilityHours.map((item, index) => {
                    return (
                      <Grid
                        key={item.id}
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
                            name="availableFrom"
                            value={item.availableFrom}
                            disabled={item.id !== id ? true : false}
                            onChange={(name, value) => {
                              handleSelectedTimeChange(
                                index,
                                item,
                                name,
                                value
                              );
                            }}
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
                            name="availableTo"
                            value={item.availableTo}
                            disabled={item.id !== id ? true : false}
                            onChange={(name, value) => {
                              handleSelectedTimeChange(
                                index,
                                item,
                                name,
                                value
                              );
                            }}
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
                              {item.id !== id ? (
                                <div>
                                  <IconButton
                                    onClick={() => handleEditClick(item.id)}
                                  >
                                    <EditOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  Edit{" "}
                                </div>
                              ) : (
                                <div>
                                  <IconButton
                                    onClick={() => handleSaveClick(id)}
                                  >
                                    <SaveOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  Save
                                </div>
                              )}
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  handleDeleteButton(
                                    item.id,
                                    props.calendarInfo
                                  )
                                }
                              >
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
            {errorMessage && errorMessage_s ? null : (
              <Typography variant="body2" color="secondary" align="left">
                *Please select valid time intervals
              </Typography>
            )}
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
