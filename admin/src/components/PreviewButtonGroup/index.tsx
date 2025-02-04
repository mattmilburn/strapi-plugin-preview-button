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

  // @NOTE - In order to disable the copy feature, `copy` must be explicitly defined as `false`.

  return (
    <>
      <PreviewButton isDraft={isDraft} url={url} openTarget={openTarget} />
      {copy !== false && <CopyLinkButton isDraft={isDraft} url={url} />}
    </>
  );
};

export default memo(PreviewButtonGroup);
