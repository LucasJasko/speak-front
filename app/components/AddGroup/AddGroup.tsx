import { useMobileContext } from "~/context/MobileContext";
import { motion } from "motion/react";
import { useSettingsContext } from "~/context/SettingsContext";

const AddGroup = () => {
  const { lastActive, handleActiveLayout } = useSettingsContext();
  const { isMobile } = useMobileContext();

  return (
    <motion.div className="add-group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="add-group__window"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="add-group__header">
          <h3 className="add-group__title">Ajouter un groupe</h3>
          <button className="add-group__manage-button manage__button-close" onClick={() => handleActiveLayout(lastActive)}>
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
      </motion.div>
    </motion.div>
  );
};

export default AddGroup;
