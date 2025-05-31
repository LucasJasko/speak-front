const Inscription = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  return (
    <div
      onClick={() => {
        toggleSlide("signin");
      }}
    >
      HELLO
    </div>
  );
};

export default Inscription;
