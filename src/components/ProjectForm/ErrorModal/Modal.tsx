import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface ModalHandle {
  open: () => void;
}

interface ModalProps {
  children: React.ReactNode;
}

const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
    },
  }));

  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/60 p-6 rounded-lg shadow-xl w-full max-w-md border m-auto border-stone-300 bg-white text-stone-800"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <button className="px-4 py-2 bg-stone-800 text-white rounded-md">
          Close
        </button>
      </form>
    </dialog>,
    modalRoot!
  );
});

export default Modal;
