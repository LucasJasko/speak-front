const NavButton = ({ buttonClass, path, children }: any) => {
  return <button className={`nav__link ${buttonClass}`}>{children}</button>;
};

export default NavButton;
