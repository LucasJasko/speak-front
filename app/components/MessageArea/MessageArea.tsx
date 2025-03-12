const MessageArea = () => {
  return (
    <div className="message">
      <span className="message__drag-bar"></span>
      <div className="message__feed"></div>
      <div className="message__input-area">
        <div className="message__input">
          <input type="text" name="message" placeholder="Entrez votre message..." />
          <div className="message__link-container">
            <i className="fa-solid fa-file-arrow-up"></i>
            <i className="fa-solid fa-code"></i>
            <i className="fa-solid fa-calendar-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
