import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';

import { withTranslation } from 'react-i18next';
import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';

import PageListIcon from './Icons/PageListIcon';
import TimeLineIcon from './Icons/TimeLineIcon';
import RecentChangesIcon from './Icons/RecentChangesIcon';
import AttachmentIcon from './Icons/AttachmentIcon';

import { withUnstatedContainers } from './UnstatedUtils';
import PageAccessoriesContainer from '../services/PageAccessoriesContainer';
import PageAttachment from './PageAttachment';
import Page from './PageList/Page';

const PageAccessoriesModal = (props) => {
  const {
    t, pageAccessoriesContainer, pageContainer, appContainer,
  } = props;
  const { path } = pageContainer;
  const { switchActiveTab } = pageAccessoriesContainer;
  const { activeTab } = pageAccessoriesContainer.state;
  const [pages, setPages] = useState([]);

  function closeModalHandler() {
    if (props.onClose == null) {
      return;
    }
    props.onClose();
  }

  async function getPagesList() {
    const res = await appContainer.apiv3Get('/pages/list', { path });
    setPages(res);
    // return pages.map(pages => (
    //   <li key={pages._id}>
    //     <Page page={pages} />
    //   </li>
    // ));
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={props.isOpen}
        toggle={closeModalHandler}
        className="grw-page-accessories-modal"
      >
        <ModalBody>
          <Nav className="nav-title border-bottom">
            <NavItem type="button" className={`nav-link ${activeTab === 'pagelist' && 'active active-border'}`}>
              <NavLink
                onClick={() => { switchActiveTab('pagelist') }}
              >
                <PageListIcon />
                { t('page_list') }
              </NavLink>
            </NavItem>
            <NavItem type="button" className={`nav-link ${activeTab === 'timeline' && 'active active-border'}`}>
              <NavLink
                onClick={() => { switchActiveTab('timeline') }}
              >
                <TimeLineIcon />
                { t('Timeline View') }
              </NavLink>
            </NavItem>
            <NavItem type="button" className={`nav-link ${activeTab === 'recent-changes' && 'active active-border'}`}>
              <NavLink
                onClick={() => { switchActiveTab('recent-changes') }}
              >
                <RecentChangesIcon />
                { t('History') }
              </NavLink>
            </NavItem>
            <NavItem type="button" className={`nav-link ${activeTab === 'attachment' && 'active active-border'}`}>
              <NavLink
                onClick={() => { switchActiveTab('attachment') }}
              >
                <AttachmentIcon />
                { t('attachment_data') }
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="pagelist">
              {pageAccessoriesContainer.state.activeComponents.has('pagelist') && getPagesList() }
            </TabPane>
            <TabPane tabId="timeline"></TabPane>
            <TabPane tabId="recent-changes"></TabPane>
            <TabPane tabId="attachment" className="p-4">
              {pageAccessoriesContainer.state.activeComponents.has('attachment') && <PageAttachment /> }
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};


/**
 * Wrapper component for using unstated
 */
const PageAccessoriesModalWrapper = withUnstatedContainers(PageAccessoriesModal, [PageAccessoriesContainer], [AppContainer], [PageContainer]);


PageAccessoriesModal.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  // pageContainer: PropTypes.instanceOf(PageContainer).isRequired,
  pageAccessoriesContainer: PropTypes.instanceOf(PageAccessoriesContainer).isRequired,
  appContainer: PropTypes.instanceOf(AppContainer),
  pageContainer: PropTypes.instanceOf(PageContainer),
  path: PropTypes,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default withTranslation()(PageAccessoriesModalWrapper);
