import { Button } from "@/components/ui/button"

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
            <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
            >
                Close
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Modal