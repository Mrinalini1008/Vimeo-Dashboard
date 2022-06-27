import React from 'react';

//Pagination logic
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
 
  return (
      <nav>
        <ul className='Pages'>
            {pageNumbers.map(number => (
            <li key={number} className="btn btn-primary" style={{textdecoration: "none"}}>
                <a onClick={() => paginate(number)} href='#!' className="text-decoration-none" style={{ textdecoration: "none",color : "white"}}>
                {number}
                </a>
            </li>
            ))}
        </ul>
      </nav>
  );
};

export default Pagination;