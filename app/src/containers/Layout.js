import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import Toolbar from '../components/Toolbar';
import ModalWindows from './ModalWindows';

const mapStateToProps = () => ({
  selectedCategory: {
    title: 'ATB',
  },
});
const mapDispatchToProps = () => ({});

const Layout = props => {
  const [isSideBarOpen, setSidebarState] = useState(false);
  const switchSideBar = () => setSidebarState(!isSideBarOpen);
  const openSideBar = () => setSidebarState(true);
  const closeSideBar = () => setSidebarState(false);

  return (
    <div>
      <Toolbar
        category={props.selectedCategory}
        onOpenButtonClick={switchSideBar}
      />
      {props.children}
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        onOpen={openSideBar}
        onClose={closeSideBar}
        onClick={closeSideBar}
      />
      <ModalWindows />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  selectedCategory: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  selectedCategory: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
