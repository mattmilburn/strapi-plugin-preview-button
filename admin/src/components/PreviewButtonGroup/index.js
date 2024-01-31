import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CopyLinkButton from '../CopyLinkButton';
import PreviewButton from '../PreviewButton';

const PreviewButtonGroup = ({ data, isDraft }) => {
  const { url, copy, openTarget } = data;

  // In order to disable the copy feature, `copy` must be explicitly defined as `false`.
  const copyAllowed = copy !== false;

  return (
    <>
      <PreviewButton isDraft={isDraft} url={url} target={openTarget} />
      {copyAllowed && <CopyLinkButton isDraft={isDraft} url={url} />}
    </>
  );
};

PreviewButtonGroup.propTypes = {
  data: PropTypes.shape({
    copy: PropTypes.bool,
    openTarget: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isDraft: PropTypes.bool.isRequired,
};

export default memo(PreviewButtonGroup);
