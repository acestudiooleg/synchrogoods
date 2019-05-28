import React from 'react';
import cx from 'classnames';

import styles from './story.css';

export const wrapper = getChildren => () => <div className={cx(styles.story)}>{getChildren()}</div>;
