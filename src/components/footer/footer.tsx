import facebookImg from '../../assets/img/footer/facebook.png';
import instImg from '../../assets/img/footer/insta.png';
import linkedinImg from '../../assets/img/footer/linkedin.png';
import vkImg from '../../assets/img/footer/vk.png';

import classes from './footer.module.scss';

export const Footer = () => {
  const imgArr = [facebookImg, instImg, vkImg, linkedinImg];

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.container_block}>
          <div className={classes.container_block__date}>
            <span>© 2020-2023 Cleverland.</span> <span>Все права защищены.</span>{' '}
          </div>
          <ul className={classes.container_block__list}>
            {imgArr.map((item) => (
              <li key={item}>
                <img src={item} alt='socialIcon' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
