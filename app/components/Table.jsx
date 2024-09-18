// components/Table.js

import React from "react";

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
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
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error ml-2"
                  onClick={() => onDelete(row._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
