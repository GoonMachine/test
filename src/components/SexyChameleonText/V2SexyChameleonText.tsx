import { ReactNode } from 'react';
import classNames from 'classnames';

const V2SexyChameleonText = ({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  return (
    <span
      className={classNames(
        'text-transparent bg-clip-text from-[rgba(252,26,11,1)] to-[rgba(239,233,13,1)] bg-v3-text-gradient',
        className,
        {
          'animate-hue': animate,
        },
      )}
    >
      {children}
    </span>
  );
};

export default V2SexyChameleonText;
