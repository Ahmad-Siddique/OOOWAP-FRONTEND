const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <p className="text-center text-gray-600 py-4">No data available</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(row)}
                    aria-label={`Edit ${row._id}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error ml-2"
                    onClick={() => onDelete(row._id)}
                    aria-label={`Delete ${row._id}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
