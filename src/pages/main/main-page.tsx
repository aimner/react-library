import { Nav } from '../../components/nav';
import { ShowSideBarType } from '../app';

import { useMain } from './hooks';
import { MainSection } from './main-section';

import classes from './main-page.module.scss';

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
};

export const MainPage: React.FC<PropsType> = ({ showSideBar, setShowSideBar }) => {
  useMain(setShowSideBar);

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <Nav showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <MainSection />
      </div>
    </main>
  );
};
