interface ModalProps {
    modalOpen: boolean
    setModalOpen: (open: boolean) => void
    children: React.ReactNode
  }
  
  const Modal = ({
    modalOpen,
    setModalOpen,
    children
  }: ModalProps) => {
    return (
      <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
  
          {children}
  
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Modal