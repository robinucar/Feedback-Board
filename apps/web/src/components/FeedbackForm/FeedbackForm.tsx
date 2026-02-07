import { useState } from 'react';

type feedbackLabel = 'bug' | 'improvement' | 'feature' | 'other';
type FeedbackFormValues = {
  title: string;
  message: string;
  label: feedbackLabel;
};

type FeedbackFormProps = {
  initialValues: FeedbackFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: FeedbackFormValues) => void;
};

const LABEL_OPTIONS: Array<{ value: feedbackLabel; label: string }> = [
  { value: 'bug', label: 'Bug' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'feature', label: 'Feature' },
  { value: 'other', label: 'Other' },
];

export const FeedbackForm = ({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: FeedbackFormProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [message, setMessage] = useState(initialValues.message);
  const [label, setLabel] = useState<feedbackLabel>(initialValues.label);

  const isValid = title.trim().length > 0 && message.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit({ title: title.trim(), message: message.trim(), label });
      }}
      className='space-y-3'
    >
      <div>
        <label className='block text-sm mb-1'>Title</label>
        <input
          className='w-full rounded-md bg-white/5 border border-white/10 px-3 py-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className='block text-sm mb-1'>Label</label>
        <select
          className='w-full rounded-md bg-white/5 border border-white/10 px-3 py-2'
          value={label}
          onChange={(e) => setLabel(e.target.value as feedbackLabel)}
        >
          {LABEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block text-sm mb-1'>Message</label>
        <textarea
          className='w-full rounded-md bg-white/5 border border-white/10 px-3 py-2'
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        type='submit'
        disabled={isSubmitting || !isValid}
        className='rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50'
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};
