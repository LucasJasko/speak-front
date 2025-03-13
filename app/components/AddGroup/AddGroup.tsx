interface AddGroupProps {
  onClick: (selected: string) => void;
  active: string;
}

const AddGroup: React.FC<AddGroupProps> = ({ onClick, active }) => {
  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return (
    <div className={`add-group ${active == "add-group" ? "active__add-group" : ""}`}>
      <div className="add-group__window">
        <div className="add-group__header">
          <button className="add-group__manage-button manage__button-close" onClick={() => handleClick("")}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button className="add-group__join">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="add-group__content">
          <input className="add-group__input" type="text" name="" id="" />
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
