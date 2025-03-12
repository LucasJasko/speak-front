const AddGroup: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return <div className="addGroup"></div>;
};

export default AddGroup;
