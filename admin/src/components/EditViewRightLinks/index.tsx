import { useParams, useSearchParams } from 'react-router-dom';
import { unstable_useDocument as useDocument } from '@strapi/content-manager/strapi-admin';

import { usePreviewButton } from '../../hooks';
import PreviewButtonGroup from '../PreviewButtonGroup';

const EditViewRightLinks = () => {
  const { collectionType = '', id: documentId, slug: model = '' } = useParams();

  if (!documentId || documentId === 'create') {
    return null;
  }

  const [searchParams] = useSearchParams();
  const params: Record<string, string> = {};
  const locale = searchParams.get('plugins[i18n][locale]');

  if (locale) {
    params.locale = locale;
  }

  const { document, schema } = useDocument({ collectionType, documentId, model, params });
  const uid = schema?.uid;
  const { isLoading, isSupported, draft, published } = usePreviewButton(uid, document);

  if (!document?.id || !uid || !isSupported || isLoading) {
    return null;
  }

  const hasDraftAndPublish = schema?.options?.draftAndPublish === true;
  const isDraft = hasDraftAndPublish && searchParams.get('status') !== 'published';
  const showPublished = !!published && !isDraft;
  const showDraft = hasDraftAndPublish && !!draft && (isDraft || draft?.alwaysVisible);

  return (
    <>
      {showPublished && <PreviewButtonGroup data={published} isDraft={false} />}
      {showDraft && <PreviewButtonGroup data={draft} isDraft />}
    </>
  );
};

export default EditViewRightLinks;
