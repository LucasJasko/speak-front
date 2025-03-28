import { useMobileContext } from "~/context/MobileContext";

interface AddGroupProps {
  onClose: (selected: string) => void;
  lastActive: string;
}

const AddGroup: React.FC<AddGroupProps> = ({ onClose, lastActive }) => {
  const { isMobile } = useMobileContext();
  const handleClick = (selected: string) => {
    onClose(selected);
  };
  return (
    <div className="add-group">
      <div className="add-group__window">
        <div className="add-group__header">
          <h3 className="add-group__title">Ajouter un groupe</h3>
          <button className="add-group__manage-button manage__button-close" onClick={() => handleClick(lastActive)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="add-group__content">
          <input className="add-group__input" type="text" name="" id="" placeholder="Insérez l'url du groupe" />
          {!isMobile ? (
            <button className="add-group__join">
              <i className="fa-solid fa-plus"></i>
            </button>
          ) : (
            <button className="add-group__join-mobile">Ajouter</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
