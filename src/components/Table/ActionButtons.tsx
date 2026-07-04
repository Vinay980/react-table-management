interface Props {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ActionButtons({
  editing,
  onEdit,
  onSave,
  onCancel,
}: Props) {
  if (editing) {
    return (
      <>
        <button
          onClick={onSave}
          className="mr-2 rounded bg-green-600 px-3 py-1 text-white"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="rounded bg-gray-500 px-3 py-1 text-white"
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <button
      onClick={onEdit}
      className="rounded bg-blue-600 px-3 py-1 text-white"
    >
      Edit
    </button>
  );
}