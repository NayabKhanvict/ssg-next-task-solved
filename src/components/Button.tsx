import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonProps = {
  onClick: () => void;
  active?: boolean;
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <button
      type="button"
      className={classNames("px-2 py-1 border border-black")}
      onClick={onClick}
      style={{ backgroundColor: active ? "lightblue" : "white" }}
    >
      {children}
    </button>
  );
};
