import React from 'react';

//Pagination logic
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
 
  return (
      <nav style={{backgroundColor:'#6d3088'}}>
        <ul className='Pages'>
            {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} href='#!' className='page-link'>
                {number}
                </a>
            </li>
            ))}
        </ul>
      </nav>
  );
};

export default Pagination;