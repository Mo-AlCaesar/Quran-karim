export default function Modal({ id, label, size, children }) {
  return (
    <>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby={label}
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className={`modal-dialog modal-dialog-scrollable modal-${size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
