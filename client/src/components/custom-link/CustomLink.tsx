import React from 'react';
import './CustomLink.scss';
import {Link, LinkProps} from 'react-router-dom';

interface ICustomLink extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

function CustomLink({children = ``, className = ``, ...linkProps}: ICustomLink) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link className={`custom-link ${className}`.trim()} {...linkProps}>
      {children}
    </Link>
  );
}

CustomLink.defaultProps = {
  className: ``,
  children: ``,
};

export default React.memo(CustomLink);
