import React from 'react';

import { Nav } from '../../components/nav';
import { ShowSideBarType } from '../app';

import { ProfileSection } from './profile-section/profile-section';
import { useProfile } from './hooks';

import classes from './profile.module.scss';

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
};

export const Profile: React.FC<PropsType> = ({ showSideBar, setShowSideBar }) => {
  useProfile();

  return (
    <main>
      <div className={classes.container}>
        <Nav showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <ProfileSection />
      </div>
    </main>
  );
};
