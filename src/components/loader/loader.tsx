import Lottie from 'react-lottie';

import * as loaderAnimation from '../../assets/animations/loader.json';

import classes from './loader.module.scss';

export const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
  };

  return (
    <div className={classes.load}>
      <div className={classes.load_block}>
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </div>
    </div>
  );
};
