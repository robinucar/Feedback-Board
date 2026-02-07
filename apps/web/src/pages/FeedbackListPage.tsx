import { useState } from 'react';
import { trpc } from '../lib/trpc';
import { useSearchParams } from 'react-router-dom';
import { Modal } from '../components/Modal/Modal';
import { FeedbackForm } from '../components/FeedbackForm/FeedbackForm';
import { ConfirmDialog } from '../components/ConfirmDialog/ConfirmDialog';

export const FeedbackListPage = () => {
  const { data, isLoading, error } = trpc.feedback.list.useQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get('edit');

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const utils = trpc.useUtils();

  const updateFeedbackMutation = trpc.feedback.update.useMutation({
    onSuccess: () => {
      utils.feedback.list.invalidate();
      setSearchParams({});
    },
  });

  const deleteFeedbackMutation = trpc.feedback.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.feedback.list.cancel();

      const previous = utils.feedback.list.getData();

      utils.feedback.list.setData(undefined, (current) => {
        const items = current ?? [];
        return items.filter((item) => item.id !== id);
      });

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        utils.feedback.list.setData(undefined, ctx.previous);
      }
    },
    onSettled: () => {
      utils.feedback.list.invalidate();
    },
  });

  if (isLoading) {
    return <p className='text-white/70'>Loading...</p>;
  }

  if (error) {
    return <p className='text-red-400'>{error.message}</p>;
  }

  const items = data ?? [];
  const editingItem = items.find((item) => item.id === editingId);

  if (items.length === 0) {
    return <p className='text-white/70'>No feedback yet.</p>;
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>Feedback</h1>

      {deleteFeedbackMutation.error && (
        <p className='text-sm text-red-400'>
          {deleteFeedbackMutation.error.message}
        </p>
      )}

      <ul className='space-y-3'>
        {items.map((item) => (
          <li
            key={item.id}
            className='rounded-md border border-white/10 bg-white/5 p-4'
          >
            <div className='flex items-center justify-between gap-2'>
              <h2 className='font-semibold'>{item.title}</h2>

              <span className='rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70'>
                {item.label ?? 'other'}
              </span>
            </div>

            <p className='mt-1 text-sm text-white/80'>{item.message}</p>
            <p className='mt-2 text-xs text-white/50'>
              {new Date(item.createdAt).toLocaleString()}
            </p>

            <div className='mt-3 flex gap-2'>
              <button
                type='button'
                onClick={() => setSearchParams({ edit: item.id })}
                className='rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10'
              >
                Edit
              </button>

              <button
                type='button'
                onClick={() => setDeleteId(item.id)}
                className='rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingItem && (
        <Modal
          title={`Edit: ${editingItem.title}`}
          onClose={() => setSearchParams({})}
        >
          {updateFeedbackMutation.error && (
            <p className='mb-3 text-sm text-red-400'>
              {updateFeedbackMutation.error.message}
            </p>
          )}

          <FeedbackForm
            key={editingItem.id}
            initialValues={{
              title: editingItem.title,
              message: editingItem.message,
              label: editingItem.label,
            }}
            submitLabel='Update'
            isSubmitting={updateFeedbackMutation.isPending}
            onSubmit={(values) => {
              updateFeedbackMutation.mutate({
                id: editingItem.id,
                title: values.title,
                message: values.message,
                label: values.label,
              });
            }}
          />
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title='Delete feedback'
          description='Are you sure you want to delete this feedback? This action cannot be undone.'
          confirmLabel='Delete'
          cancelLabel='Cancel'
          isConfirming={deleteFeedbackMutation.isPending}
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deleteFeedbackMutation.mutate(
              { id: deleteId },
              {
                onSuccess: () => {
                  setDeleteId(null);
                },
              },
            );
          }}
        />
      )}
    </div>
  );
};
