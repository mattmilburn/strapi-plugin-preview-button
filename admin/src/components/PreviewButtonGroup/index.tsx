import { memo } from 'react';

import { type PreviewButtonStateConfig } from '../../../../server/src/config';
import CopyLinkButton from '../CopyLinkButton';
import PreviewButton from '../PreviewButton';

export interface PreviewButtonGroupProps {
  data: PreviewButtonStateConfig;
  isDraft: boolean;
}

const PreviewButtonGroup = ({ data, isDraft }: PreviewButtonGroupProps) => {
  const { url, copy, openTarget } = data;

  // In order to disable the copy feature, `copy` must be explicitly defined as `false`.
  const copyAllowed = copy !== false;

  return (
    <>
      <PreviewButton isDraft={isDraft} url={url} openTarget={openTarget} />
      {copyAllowed && <CopyLinkButton isDraft={isDraft} url={url} />}
    </>
  );
};

export default memo(PreviewButtonGroup);
