import classNames from "classnames";
import { useState } from "react";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";

function ConfirmDialog({ data }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const buttonStyleClass = getButtonClass(data.type);
  return (
    <div>
      <button className={buttonStyleClass} onClick={open}>
        {data.type == "apply" ? "Apply" : "Cancel"}
      </button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>x</span>
        </button>
        {data.type == "apply" ? (
          <p>You are sure that you want to apply your changes?</p>
        ) : (
          <p>You are sure you want to cancel your changes?</p>
        )}
      </Dialog>
    </div>
  );
}

const getButtonClass = (type) => {
  return classNames(
    "mr-2 text-white px-8 font-bold tracking-widest text-lg rounded-full",
    {
      ["bg-primary"]: type == "apply",
      ["bg-warning"]: type == "cancel",
    }
  );
};

export default ConfirmDialog;
