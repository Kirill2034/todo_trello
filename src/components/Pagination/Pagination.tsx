import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  todosPerPage: number;
  totalTodos: number;
  paginate: (number: number) => void;
};

const Pagination: React.FC<Props> = ({
  todosPerPage,
  totalTodos,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, index) => (
          <li key={index} className="page-item">
            <Button
              onClick={() => paginate(number - 1)}
              className="page-link"
              variant="outlined"
              color="secondary"
              size="small"
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
