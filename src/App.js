import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function App() {
  const [form, setForm] = useState([]);
  const [open, setOpen] = React.useState(false);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.Designation === "" || item.Name === ""
    );

    if (someEmpty) {
      // eslint-disable-next-line
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].Name === "") {
          allPrev[index].errors.Name = "Name is required";
        }

        if (form[index].Designation === "") {
          allPrev[index].errors.Designation = "Designation is required";
        }
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const viewData = (e) => {
    setOpen(true);
    e.preventDefault();
    }

    const handleClose = () => {
      setOpen(false);
    };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      Name: "",
      Designation: "",

      errors: {
        Name: null,
        Designation: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };
  const printWindow =() =>{
    window.print();
  }


  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };

    return(
    <div className="container mt-2 py-3">
      <h1 className= "center">Employee Details</h1>

      <form>
        {form.map((item, index) => (
          <div className="row mt-3" key={`item-${index}`}>
            <div className="row">
              <input
                type="text"
                className={
                  item.errors.Name
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Name"
                placeholder="Name"
                value={item.Name}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Name && (
                <div className="invalid-feedback">{item.errors.Name}</div>
              )}
            </div>

            <div className="row">
              <input
                type="text"
                className={
                  item.errors.Designation
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Designation"
                placeholder="Designation"
                value={item.Designation}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Designation && (
                <div className="invalid-feedback">{item.errors.Designation}</div>
              )}
            </div>


            <div className="row form-group col-sm-4">
              <input
                type="text"
                className={
                  item.errors.Details
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Contact Details"
                placeholder="Details"
                value={item.Details}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Details && (
                <div className="invalid-feedback">{item.errors.Details}</div>
              )}
              
            </div>

            <div className="row form-group col-sm-4">
              <input
                type="tel"
                className={
                  item.errors.Phone
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Phone Number"
                placeholder="Phone"
                value={item.Phone}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Phone && (
                <div className="invalid-feedback">{item.errors.Phone}</div>
              )}
              
            </div>


            <div className="row">
              <input
                type="date"
                className={
                  item.errors.DOB
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Date of Birth"
                placeholder="DOB"
                value={item.DOB}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.DOB && (
                <div className="invalid-feedback">{item.errors.DOB}</div>
              )}
            </div>


            <div className="row">
              <input
                type="text"
                className={
                  item.errors.Skills
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Skills"
                placeholder="Skills"
                value={item.Skills}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Skills && (
                <div className="invalid-feedback">{item.errors.Skills}</div>
              )}
            </div>
            </div>
                       

        ))}

        <div className = "center">
        <button className="btn btn-primary mt-2" onClick={handleAddLink}>
          Add Employee
        </button>
        </div>

        <div className = "center">
        <button className="btn btn-primary mt-2" onClick={viewData}>
          View Data
        </button>
        </div>
        <div className= "center">
        </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Employee Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <pre>
          {JSON.stringify(form,null,2)}
          </pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick = {printWindow}  color="primary">
            Download
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
    );
              }
  

export default App;