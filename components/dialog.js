import { useState } from "react";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";

function ConfirmDialog({ data }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <button className="mr-2" onClick={open}>
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
          <p>You are sure you want to discard your changes?</p>
        )}
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;
