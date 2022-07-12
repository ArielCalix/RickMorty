import { Fragment } from "react";
import { Pagination } from "react-bootstrap";

export default function CustomPagination({ pages, active, setActive }) {
    let items = [];
    const disabledPrev = active === 1;
    const disabledNext = active === pages;
    let numb = (active > 2) ? active - 2 : (active > 1) ? active - 1 : active;
    const length = (active < pages - 2) ? active + 2 : pages;
    numb = (length < pages - 2) ? numb : (length < pages) ? numb : numb;
    for (let number = numb; number <= length; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return <Fragment>
        <Pagination>
            <Pagination.Prev className="mx-1" disabled={disabledPrev} onClick={() => setActive(active - 1)} />
            <Pagination>{items}</Pagination>
            <Pagination.Next className="mx-1" disabled={disabledNext} onClick={() => setActive(active + 1)} />
        </Pagination>
    </Fragment>
}