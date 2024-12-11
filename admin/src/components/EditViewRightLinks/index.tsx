import { useParams, useSearchParams } from 'react-router-dom';
import { unstable_useDocument as useDocument } from '@strapi/content-manager/strapi-admin';

import { usePreviewButton } from '../../hooks';
import PreviewButtonGroup from '../PreviewButtonGroup';

const EditViewRightLinks = () => {
  // @NOTE - `documentId` is undefined when the document is first being created.
  const { collectionType = '', id: documentId, slug: model = '' } = useParams();
  const [searchParams] = useSearchParams();
  const params: Record<string, string> = {};
  const locale = searchParams.get('plugins[i18n][locale]');

  if (locale) {
    params.locale = locale;
  }

  const { document, schema } = useDocument({ collectionType, documentId, model, params });
  const uid = schema?.uid;
  const { isLoading, isSupported, draft, published } = usePreviewButton(uid, document);

  if (!document || !uid || !isSupported || isLoading) {
    return null;
  }

  const isDraft = searchParams.get('status') !== 'published';
  const showPublished = !!published && !isDraft;
  const showDraft = !!draft && (isDraft || draft?.alwaysVisible);

  return (
    <>
      {showPublished && <PreviewButtonGroup data={published} isDraft={false} />}
      {showDraft && <PreviewButtonGroup data={draft} isDraft />}
    </>
  );
};

export default EditViewRightLinks;
