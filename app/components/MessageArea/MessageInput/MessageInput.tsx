const MessageInput = () => {
  return (
    <form className="message-container__input-container">
      <input className="message-container__input" type="text" name="message" placeholder="Entrez votre message..." />
      <div className="message-container__link-container">
        <i className="fa-solid fa-file-arrow-up"></i>
        <i className="fa-solid fa-code"></i>
        <i className="fa-solid fa-calendar-plus"></i>
      </div>
    </form>
  );
};

export default MessageInput;
