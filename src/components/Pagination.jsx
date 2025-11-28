import React from 'react'

function Pagination({ pageHandler, page, dynamicPage }) {

    const getPages = (current, total) => {
        const pages = [];
        if (total <= 5) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 3) {
                pages.push(1, 2, 3, '...', total);

            } else if (current >= total - 2) {
                pages.push(1, '...', total - 2, total - 1, total);
            } else {
                pages.push(1, '...', current - 1, current, current + 1, '...', total);
            }
        }
        return pages;
    };

    return (
        <div className='mt-10 space-x-4'>
            <button
                onClick={() => pageHandler(page - 1)}
                disabled={page === 1}
                className={page === 1 ? "opacity-50 cursor-not-allowed  bg-red-500 text-white px-2 py-1 rounded-md" : "cursor-pointer  bg-red-500 text-white px-2 py-1 rounded-md"}
            >
                Prev
            </button>

            {
                getPages(page, dynamicPage)?.map((pg, index) => {
                    
                    return (
                        <span key={index}
                        onClick={() => typeof pg === 'number' && pageHandler(pg)}
                        className={`cursor-pointer ${pg === page ? "font-bold text-red-500" : ""}`}>
                            {pg}
                        </span>
                    )
                })
            }


            <button
                onClick={() => pageHandler(page + 1)}
                className={page === dynamicPage ? "opacity-50 cursor-not-allowed  bg-red-500 text-white px-2 py-1 rounded-md" : "cursor-pointer  bg-red-500 text-white px-2 py-1 rounded-md"}
            >
                Next
            </button>

        </div>
    )
}

export default Pagination;
