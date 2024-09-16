import { unstable_useDocument } from '@strapi/content-manager/strapi-admin';
import { useParams } from 'react-router-dom';
import { usePreviewButton } from '../../hooks';
import PreviewButtonGroup from '../PreviewButtonGroup';

const EditViewRightLinks = () => {
  // We need to get the document id, model, and collectionType in order to
  // use the useDocument hook.
  // Note: `documentId` is undefined when the document is being created and has
  // not been saved yet.
  const { id: documentId, slug: model = '', collectionType = '' } = useParams();

  // Get the document data (as `document`, which is undefined at first)
  // and the uid so the preview button has the data it needs.
  const { document, schema } = unstable_useDocument({ documentId, model, collectionType });
  const uid = schema?.uid;

  const draftExists = document?.status === 'draft' || document?.status === 'modified';
  const publishedExists = document?.status === 'published' || document?.status === 'modified';

  const { isLoading, isSupported, draft, published } = usePreviewButton(uid, document);

  if (!document || !uid || !isSupported || isLoading) {
    return null;
  }

  const showPublished = !!published && publishedExists;
  const showDraft = !!draft && (draftExists || draft?.alwaysVisible);

  return (
    <>
      {showPublished && <PreviewButtonGroup data={published} isDraft={false} />}
      {showDraft && <PreviewButtonGroup data={draft} isDraft />}
    </>
  );
};

export default EditViewRightLinks;
