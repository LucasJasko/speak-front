import { motion } from "motion/react";
import { useSettingsContext } from "~/context/SettingsContext";

const Agenda = () => {
  const { lastActive, handleActiveLayout } = useSettingsContext();

  return (
    <motion.div className="agenda" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="agenda__window"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="agenda__header">
          <button className="add__container">
            <i className="fa-solid fa-plus"></i>
          </button>
          <div className="agenda__header__container">
            <button>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <div className="times__container">
              <button className="hour">HH</button>
              <button className="day">JJ</button>
              <button className="month">MM</button>
              <button className="year">AAAA</button>
            </div>
            <button>
              <i className="fa-solid fa-angle-right"></i>
            </button>
            <button>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <button className="agenda__manage-button manage__button-close" onClick={() => handleActiveLayout(lastActive)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="agenda__content"></div>
      </motion.div>
    </motion.div>
  );
};

export default Agenda;
